import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import MyMeetupsContext from './MyMeetupsContext';
import HomeNavigatorContext from '../../Navigator/Home/HomeNavigatorContext';
import {
  iconColorsTable,
  inputBackgroundColorNew,
  baseTextColor,
  screenSectionBackgroundColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
import ChatStatus from './ChatStatus';
const { Ionicons, MaterialCommunityIcons } = iconsTable;

const Meetups = () => {
  const { auth, myUpcomingMeetups } = useContext(GlobalContext);
  const {
    setMenuMenu,
    moreMenuBottomSheetRef,
    setIsStartMeetupConfirmationModalOpen,
    setStartingMeetup,
    setIsFinishMeetupConfirmationModalOpen,
    setFinishingMeetup,
    setIsRSVPConfirmationModalOpen,
    setRSVPingMeetup,
  } = useContext(MyMeetupsContext);
  const { topLevelHomeNavigation } = useContext(HomeNavigatorContext);

  const renderTime = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      weekday: 'long',
    });
    const dateTable = { ...d.split(' ') };
    return (
      <Text style={{ color: 'white' }}>
        {dateTable[0]}&nbsp;Starts at&nbsp;{dateTable[1]}
        {dateTable[2]}
      </Text>
    );
  };

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
    });
    const dateElements = d.split(' ');

    return (
      <View
        style={{
          flexDirection: 'column',
          width: 50,
          height: 50,
          backgroundColor: inputBackgroundColorNew,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 15,
              color: 'white',
            }}
          >
            {dateElements[0]}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 22,
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {dateElements[1]}
          </Text>
        </View>
      </View>
    );
  };

  const renderMeetupDateAndTime = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    const dateElements = d.split(',').join('').split(' ');

    return (
      <View style={{ flexDirection: 'row', marginRight: 20 }}>
        {dateElements.map((element, index) => {
          return (
            <Text key={index} style={{ color: 'white', fontSize: 23 }}>
              {element}&nbsp;
            </Text>
          );
        })}
      </View>
    );
  };

  const renderStartButton = (meetupAndChatsTable) => {
    if (meetupAndChatsTable.state === 'upcoming') {
      return (
        <TouchableOpacity
          style={{
            backgroundColor: iconColorsTable['blue1'],
            borderRadius: 7,
            padding: 5,
            marginBottom: 10,
          }}
          onPress={() => {
            setStartingMeetup(meetupAndChatsTable._id);
            setIsStartMeetupConfirmationModalOpen(true);
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
            <Ionicons size={25} name='power' color={'white'} style={{ marginRight: 5 }} />
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Start meetup</Text>
          </View>
        </TouchableOpacity>
      );
    } else if (meetupAndChatsTable.state === 'ongoing') {
      return (
        <TouchableOpacity
          style={{
            backgroundColor: iconColorsTable['red1'],
            borderRadius: 7,
            padding: 5,
            marginBottom: 10,
          }}
          onPress={() => {
            setFinishingMeetup(meetupAndChatsTable._id);
            setIsFinishMeetupConfirmationModalOpen(true);
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
            <Ionicons size={25} name='power' color={'white'} />
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Finish meetup</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const renderChatStats = (meetup) => {
    const list = Object.keys(meetup.unreadChatsTable).map((key) => {
      return <ChatStatus key={key} chatType={key} status={meetup.unreadChatsTable[key]} />;
    });

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-end',
          // flexWrap: 'wrap',
        }}
      >
        {list}
      </View>
    );
  };

  const renderRSVP = (meetup) => {
    if (meetup.isRSVPed) {
      return null;
    } else {
      return (
        <TouchableOpacity
          style={{
            backgroundColor: iconColorsTable['blue1'],
            borderRadius: 7,
            padding: 5,
            marginBottom: 10,
          }}
          onPress={() => {
            setRSVPingMeetup({
              _id: meetup._id,
              title: meetup.title,
              launcherId: meetup.launcher ? meetup.launcher : null,
            });
            setIsRSVPConfirmationModalOpen(true);
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
            <MaterialCommunityIcons size={25} name='email-fast' color={'white'} style={{ marginRight: 5 }} />
            <Text style={{ color: 'white', marginRight: 5, fontWeight: 'bold', fontSize: 18 }}>Send RSVP</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const renderActionButtons = (meetup) => {
    if (meetup.launcher === auth.data._id) {
      return (
        <View style={{ flexDirection: 'column' }}>
          {renderStartButton(meetup)}
          <TouchableOpacity
            style={{
              backgroundColor: iconColorsTable['blue1'],
              borderRadius: 7,
              padding: 5,
              marginBottom: 10,
            }}
            onPress={() => {
              topLevelHomeNavigation.navigate('Home lounge', { meetupId: meetup._id });
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
              <Ionicons size={25} name='ios-chatbubbles' color={'white'} style={{ marginRight: 5 }} />
              <Text style={{ color: 'white', marginRight: 5, fontWeight: 'bold', fontSize: 18 }}>Go to lounge</Text>
            </View>
          </TouchableOpacity>
          {renderChatStats(meetup)}
        </View>
      );
    } else {
      return (
        <View style={{ flexDirection: 'column' }}>
          {renderRSVP(meetup)}
          <TouchableOpacity
            style={{
              backgroundColor: iconColorsTable['blue1'],
              borderRadius: 7,
              padding: 5,
              marginBottom: 10,
            }}
            onPress={() => {
              topLevelHomeNavigation.navigate('Home lounge', { meetupId: meetup._id });
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
              <Ionicons size={25} name='ios-chatbubbles' color={'white'} style={{ marginRight: 5 }} />
              <Text style={{ color: 'white', marginRight: 5, fontWeight: 'bold', fontSize: 18 }}>Go to lounge</Text>
            </View>
          </TouchableOpacity>
          {renderChatStats(meetup)}
        </View>
      );
    }
  };

  const renderMyUpcomingMeetups = () => {
    const myUpcomingMeetupsArr = Object.values(myUpcomingMeetups);
    if (myUpcomingMeetupsArr.length) {
      const myUpcomingMeetupslist = myUpcomingMeetupsArr.map((meetup, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: 'column',
              padding: 10,
              backgroundColor: screenSectionBackgroundColor,
              marginBottom: 15,
              borderRadius: 7,
            }}
          >
            <View
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                // onPress={() => getMeetup(meetup._id)}
              >
                {renderDate(meetup.startDateAndTime)}
                <View>
                  <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white', marginBottom: 5 }}>
                    {meetup.title}
                  </Text>
                  {renderTime(meetup.startDateAndTime)}
                  <Text style={{ color: 'white' }}>$&nbsp;{meetup.fee ? meetup.fee : 'Free'}</Text>
                </View>
              </TouchableOpacity>
              <View style={{ flexDirection: 'column' }}>
                {meetup.launcher === auth.data._id ? (
                  <Text style={{ color: 'white', marginBottom: 5 }}>🚀&nbsp;Launched</Text>
                ) : meetup.isRSVPed ? (
                  <Text>👍&nbsp;RSVPed</Text>
                ) : null}
                <TouchableOpacity
                  style={{
                    marginRight: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'flex-end',
                    marginBottom: 13,
                  }}
                  onPress={() => {
                    setMenuMenu({
                      _id: meetup._id,
                      launcher: meetup.launcher,
                      place: meetup.place,
                    });
                    moreMenuBottomSheetRef.current.snapToIndex(0);
                  }}
                >
                  <MaterialCommunityIcons
                    name='chevron-down'
                    size={20}
                    color={baseTextColor}
                    style={{ marginRight: 5 }}
                  />
                  <Text style={{ color: baseTextColor }}>More</Text>
                </TouchableOpacity>
              </View>
            </View>
            {renderActionButtons(meetup)}
          </View>
        );
      });

      return <View style={{}}>{myUpcomingMeetupslist}</View>;
    } else {
      return (
        <View>
          <View
            style={{
              borderRadius: 10,
              width: 80,
              height: 80,
              marginTop: 80,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: iconColorsTable['red1'],
              alignSelf: 'center',
              marginBottom: 10,
            }}
          >
            <MaterialCommunityIcons name='hiking' size={50} color={baseTextColor} />
          </View>
          <Text style={{ textAlign: 'center', color: 'white' }}>
            You'll see all the upcoming meetups you've launched or joined.
          </Text>
        </View>
      );
    }
  };
  return <ScrollView>{renderMyUpcomingMeetups()}</ScrollView>;
};

export default Meetups;
