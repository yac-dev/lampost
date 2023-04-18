import React, { useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import MapContext from '../MeetupContext';
import lampostAPI from '../../../apis/lampost';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import {
  sectionBackgroundColor,
  baseTextColor,
  iconColorsTable,
  screenSectionBackgroundColor,
  inputBackgroundColorNew,
} from '../../../utils/colorsTable';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ChatStatus from '../ChatStatus';

const Container = (props) => {
  const {
    auth,
    myUpcomingMeetupAndChatsTable,
    setMyUpcomingMeetupAndChatsTable,
    totalUnreadChatsCount,
    myUpcomingMeetups,
    setMyUpcomingMeetups,
  } = useContext(GlobalContext);
  const {
    appMenuBottomSheetRef,
    myUpcomingMeetupsBottomSheetRef,
    moreMenuBottomSheetRef,
    moreMenuof,
    setMoreMenuOf,
    selectedMeetup,
    setSelectedMeetup,
    selectedMeetupBottomSheetRef,
    navigation,
    setIsFinishMeetupConfirmationModalOpen,
    setIsStartMeetupConfirmationModalOpen,
    setIsRSVPConfirmationModalOpen,
    setStartingMeetup,
    setFinishingMeetup,
    setRSVPingMeetup,
  } = useContext(MapContext);

  // console.log(myUpcomingMeetupAndChatsTable);
  // const renderDate = (date) => {
  //   const d = new Date(date).toLocaleDateString('en-US', {
  //     weekday: 'short',
  //     month: 'short',
  //     day: 'numeric',
  //   });
  //   const dateElements = d.split(',').join('').split(' ');
  //   return (
  //     <View
  //       style={{
  //         // padding: 10,
  //         borderRadius: 7,
  //         marginRight: 15,
  //         backgroundColor: screenSectionBackgroundColor,
  //         width: 60,
  //         height: 60,
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //       }}
  //     >
  //       <Text style={{ fontSize: 15, textAlign: 'center', color: 'white' }}>{dateElements[0]}</Text>
  //       <Text style={{ fontSize: 17, fontWeight: 'bold', textAlign: 'center', color: 'white' }}>
  //         {dateElements[1]}&nbsp;{dateElements[2]}
  //       </Text>
  //     </View>
  //   );
  // };

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
            <Text style={{ color: 'white' }}>Start meetup</Text>
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
            <Text style={{ color: 'white' }}>Finish meetup</Text>
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
          // flexWrap: 'wrap',
        }}
        onPress={() => {
          appMenuBottomSheetRef.current.close();
          navigation.navigate('Lounge', { meetupId: meetup._id });
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
            setRSVPingMeetup({ _id: meetup._id, title: meetup.title });
            setIsRSVPConfirmationModalOpen(true);
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
            <MaterialCommunityIcons size={25} name='email-fast' color={'white'} style={{ marginRight: 5 }} />
            <Text style={{ color: 'white', marginRight: 5 }}>Send RSVP</Text>
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
              navigation.navigate('Lounge', { meetupId: meetup._id });
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
              <Ionicons size={25} name='ios-chatbubbles' color={'white'} style={{ marginRight: 5 }} />
              <Text style={{ color: 'white', marginRight: 5 }}>Go to lounge</Text>
              {renderChatStats(meetup)}
            </View>
          </TouchableOpacity>
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
            }}
            onPress={() => {
              navigation.navigate('Lounge', { meetupId: meetup._id });
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
              <Ionicons size={25} name='ios-chatbubbles' color={'white'} style={{ marginRight: 5 }} />
              <Text style={{ color: 'white', marginRight: 5 }}>Go to lounge</Text>
              {renderChatStats(meetup)}
            </View>
          </TouchableOpacity>
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
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => getMeetup(meetup._id)}
              >
                {renderDate(meetup.startDateAndTime)}
                <View>
                  <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>{meetup.title}</Text>
                  {renderTime(meetup.startDateAndTime)}
                </View>
              </TouchableOpacity>
              {meetup.isRSVPed ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons
                    name='checkmark-circle'
                    size={20}
                    color={iconColorsTable['green1']}
                    style={{ marginRight: 5 }}
                  />
                  <Text style={{ color: 'white' }}>RSVPed</Text>
                </View>
              ) : null}
            </View>
            <TouchableOpacity
              style={{
                marginRight: 5,
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-end',
                marginBottom: 13,
              }}
              onPress={() => {
                setMoreMenuOf(meetup);
                moreMenuBottomSheetRef.current.snapToIndex(0);
              }}
            >
              <MaterialCommunityIcons name='chevron-down' size={20} color={baseTextColor} style={{ marginRight: 5 }} />
              <Text style={{ color: baseTextColor }}>More</Text>
            </TouchableOpacity>
            {renderActionButtons(meetup)}
          </View>
        );
      });

      return <View style={{}}>{myUpcomingMeetupslist}</View>;
    } else {
      return <Text style={{ color: baseTextColor }}>You'll see all the meetups that you've launched or joined.</Text>;
    }
  };

  const getMeetup = async (meetupId) => {
    myUpcomingMeetupsBottomSheetRef.current.close();
    const result = await lampostAPI.get(`/meetups/${meetupId}/selected`);
    const { meetup } = result.data;
    setSelectedMeetup(meetup);
    selectedMeetupBottomSheetRef.current.snapToIndex(0);
  };

  return (
    <BottomSheetScrollView showsVerticalScrollIndicator={false}>{renderMyUpcomingMeetups()}</BottomSheetScrollView>
  );
};

export default Container;
