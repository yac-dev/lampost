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
      <View style={{ flexDirection: 'row' }}>
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
        <View style={{ width: 50, height: 60, alignItems: 'center', marginRight: 5 }}>
          <TouchableOpacity
            style={{
              backgroundColor: iconColorsTable['blue1'],
              borderRadius: 7,
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 3,
            }}
            onPress={() => {
              setStartingMeetup(meetupAndChatsTable._id);
              setIsStartMeetupConfirmationModalOpen(true);
            }}
          >
            <Ionicons size={25} name='power' color={'white'} />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 13, textAlign: 'center' }}>Start</Text>
        </View>
      );
    } else if (meetupAndChatsTable.state === 'ongoing') {
      return (
        <View style={{ width: 50, height: 60, alignItems: 'center', marginRight: 5 }}>
          <TouchableOpacity
            style={{
              backgroundColor: iconColorsTable['red1'],
              borderRadius: 7,
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 3,
            }}
            onPress={() => {
              setFinishingMeetup(meetupAndChatsTable._id);
              setIsFinishMeetupConfirmationModalOpen(true);
            }}
          >
            <Ionicons size={25} name='power' color={'white'} />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 13, textAlign: 'center' }}>Finish</Text>
        </View>
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
          flexWrap: 'wrap',
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

  const renderMyUpcomingMeetups = () => {
    const myUpcomingMeetupsArr = Object.values(myUpcomingMeetups);
    if (myUpcomingMeetupsArr.length) {
      const myUpcomingMeetupslist = myUpcomingMeetupsArr.map((meetup, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: 'column',
              // paddingLeft: 15,
              paddingTop: 10,
              paddingBottom: 5,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 5,
                paddingBottom: 5,
                // backgroundColor: screenSectionBackgroundColor,
                alignSelf: 'flex-start',
                borderRadius: 5,
                marginBottom: 5,
              }}
            >
              <MaterialCommunityIcons name='calendar-clock' color='white' size={20} style={{ marginRight: 10 }} />
              {renderMeetupDateAndTime(meetup.startDateAndTime)}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => getMeetup(meetup._id)}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', marginBottom: 10 }}>
                  {meetup.title}
                </Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row' }}>
                {meetup.launcher === auth.data._id ? (
                  <>{renderStartButton(meetup)}</> // launcherじゃなければ、これをrenderしない。
                ) : null}
                <View style={{ width: 50, height: 60, alignItems: 'center', marginRight: 5 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: iconColorsTable['blue1'],
                      borderRadius: 7,
                      width: 40,
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 3,
                    }}
                    onPress={() => {
                      navigation.navigate('Camera', { meetupId: meetup._id });
                    }}
                  >
                    <Ionicons size={25} name='camera' color={'white'} />
                  </TouchableOpacity>
                  <Text style={{ color: 'white', fontSize: 13, textAlign: 'center' }}>Camera</Text>
                </View>
                <View style={{ width: 50, height: 60, alignItems: 'center' }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: iconColorsTable['blue1'],
                      borderRadius: 7,
                      width: 40,
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 3,
                    }}
                    onPress={() => {
                      navigation.navigate('Lounge', { meetupId: meetup._id });
                    }}
                  >
                    <Ionicons size={25} name='chatbubble-sharp' color={'white'} />
                  </TouchableOpacity>
                  <Text style={{ color: 'white', fontSize: 13, textAlign: 'center' }}>Lounge</Text>
                </View>
              </View>
            </View>
            {renderChatStats(meetup)}
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
