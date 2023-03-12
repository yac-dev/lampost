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
} from '../../../utils/colorsTable';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
    setStartingMeetup,
    setFinishingMeetup,
  } = useContext(MapContext);

  // console.log(myUpcomingMeetupAndChatsTable);
  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    const dateElements = d.split(',').join('').split(' ');
    return (
      <View
        style={{
          // padding: 10,
          borderRadius: 7,
          marginRight: 15,
          backgroundColor: screenSectionBackgroundColor,
          width: 60,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 15, textAlign: 'center', color: 'white' }}>{dateElements[0]}</Text>
        <Text style={{ fontSize: 17, fontWeight: 'bold', textAlign: 'center', color: 'white' }}>
          {dateElements[1]}&nbsp;{dateElements[2]}
        </Text>
      </View>
    );
  };

  const renderTime = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const dateTable = { ...d.split(' ') };
    return (
      <Text style={{ color: 'white' }}>
        Starts at&nbsp;{dateTable[1]}
        {dateTable[2]}
      </Text>
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
            <Text key={index} style={{ color: 'white' }}>
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
      <TouchableOpacity
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
      </TouchableOpacity>
    );
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
            }}
            onPress={() => {
              navigation.navigate('Camera', { meetupId: meetup._id });
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
              <Ionicons size={25} name='camera' color={'white'} style={{ marginRight: 5 }} />
              <Text style={{ color: 'white' }}>Capture moment</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={{
            backgroundColor: iconColorsTable['blue1'],
            borderRadius: 7,
            padding: 5,
          }}
          onPress={() => {
            navigation.navigate('Camera', { meetupId: meetup._id });
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
            <Ionicons size={25} name='camera' color={'white'} style={{ marginRight: 5 }} />
            <Text style={{ color: 'white' }}>Capture moment</Text>
          </View>
        </TouchableOpacity>
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
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <MaterialCommunityIcons name='calendar-clock' color='white' size={20} style={{ marginRight: 10 }} />
                {renderMeetupDateAndTime(meetup.startDateAndTime)}
              </View>
              {renderChatStats(meetup)}
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}
            >
              <TouchableOpacity onPress={() => getMeetup(meetup._id)}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>{meetup.title}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginRight: 5,
                }}
                onPress={() => {
                  setMoreMenuOf(meetup._id);
                  moreMenuBottomSheetRef.current.snapToIndex(0);
                }}
              >
                <MaterialCommunityIcons name='dots-vertical-circle-outline' size={25} color={baseTextColor} />
              </TouchableOpacity>
            </View>
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
