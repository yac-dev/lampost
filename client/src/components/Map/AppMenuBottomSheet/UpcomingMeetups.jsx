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

const Container = (props) => {
  const { auth, myUpcomingMeetupAndChatsTable, setMyUpcomingMeetupAndChatsTable, totalUnreadChatsCount } =
    useContext(GlobalContext);
  const {
    appMenuBottomSheetRef,
    selectedMeetup,
    setSelectedMeetup,
    selectedMeetupBottomSheetRef,
    navigation,
    setIsFinishMeetupConfirmationModalOpen,
    setIsStartMeetupConfirmationModalOpen,
    setStartingMeetup,
    setFinishingMeetup,
  } = useContext(MapContext);

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
          width: 80,
          height: 50,
          borderRadius: 10,
          borderWidth: 0.3,
          marginRight: 15,
          borderColor: screenSectionBackgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: screenSectionBackgroundColor,
        }}
      >
        <Text style={{ fontSize: 13, textAlign: 'center', color: baseTextColor }}>{dateElements[0]}</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: baseTextColor }}>
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

  const renderStartButton = (meetupAndChatsTable) => {
    if (meetupAndChatsTable.state === 'upcoming') {
      return (
        <TouchableOpacity
          style={{ backgroundColor: iconColorsTable['blue1'], padding: 5, borderRadius: 10, marginRight: 5 }}
          onPress={() => {
            // まず確認のmodalをだす。
            // ここで、時間の確認を必ずしないといけない。10分前っていうことを。
            // const result = await lampostAPI.patch(`/meetups/${meetupAndChatsTable._id}/start`);
            setStartingMeetup(meetupAndChatsTable._id);
            setIsStartMeetupConfirmationModalOpen(true);
            // setMyUpcomingMeetupAndChatsTable((previous) => {
            //   return {
            //     ...previous,
            //     [meetupAndChatsTable._id]: {
            //       ...previous[meetupAndChatsTable._id],
            //       state: 'ongoing',
            //     },
            //   };
            // });
          }}
        >
          <Ionicons size={25} name='power' color={'white'} />
        </TouchableOpacity>
      );
    } else if (meetupAndChatsTable.state === 'ongoing') {
      return (
        <TouchableOpacity
          style={{ backgroundColor: iconColorsTable['red1'], padding: 5, borderRadius: 10, marginRight: 5 }}
          onPress={() => {
            // ここでも、確認のmodalを出す。
            // ここのfinishはいつでもいいとしよう。
            setFinishingMeetup(meetupAndChatsTable._id);
            setIsFinishMeetupConfirmationModalOpen(true);
            // setMyUpcomingMeetupAndChatsTable((previous) => {
            //   return {
            //     ...previous,
            //     [meetupAndChatsTable._id]: {
            //       ...previous[meetupAndChatsTable._id],
            //       state: 'upcoming',
            //     },
            //   };
            // });
          }}
        >
          <Ionicons size={25} name='power' color={'white'} />
        </TouchableOpacity>
      );
    }
  };

  const renderUnreadChatsCount = (meetupAndChatsTable) => {
    if (meetupAndChatsTable.unreadChatsCount) {
      return (
        <View style={{ marginRight: 5 }}>
          <TouchableOpacity
            style={{ backgroundColor: iconColorsTable['blue1'], padding: 5, borderRadius: 10 }}
            onPress={() => {
              appMenuBottomSheetRef.current.snapToIndex(0);
              navigation.navigate('Lounge', { meetupId: meetupAndChatsTable._id });
            }}
          >
            <Ionicons size={25} name='ios-chatbubbles' color={'white'} />
            <View
              style={{
                position: 'absolute',
                top: -10,
                right: -7,
                color: 'white',
                backgroundColor: iconColorsTable['blue1'],
                width: 20,
                height: 20,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20 / 2,
              }}
            >
              <Text style={{ color: 'white' }}>{meetupAndChatsTable.unreadChatsCount}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{ marginRight: 5 }}>
          <TouchableOpacity
            style={{ backgroundColor: iconColorsTable['blue1'], padding: 5, borderRadius: 10 }}
            onPress={() => {
              appMenuBottomSheetRef.current.snapToIndex(0);
              navigation.navigate('Lounge', { meetupId: meetupAndChatsTable._id });
            }}
          >
            <Ionicons size={25} name='ios-chatbubbles' color={'white'} />
          </TouchableOpacity>
        </View>
      );
    }
  };

  const renderMyUpcomingMeetups = () => {
    const myUpcomingMeetupsArr = Object.values(myUpcomingMeetupAndChatsTable);
    if (myUpcomingMeetupsArr.length) {
      const myUpcomingMeetupslist = myUpcomingMeetupsArr.map((meetupAndChatsTable, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', flexShrink: 1 }}
              onPress={() => getMeetup(meetupAndChatsTable._id)}
            >
              {renderDate(meetupAndChatsTable.startDateAndTime)}
              <View style={{ flexDirection: 'column', marginRight: 5, flexShrink: 1 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', marginBottom: 5 }}>
                  {meetupAndChatsTable.title}
                </Text>
                {renderTime(meetupAndChatsTable.startDateAndTime)}
              </View>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {meetupAndChatsTable.launcher === auth.data._id ? (
                <>{renderStartButton(meetupAndChatsTable)}</> // launcherじゃなければ、これをrenderしない。
              ) : null}
              {renderUnreadChatsCount(meetupAndChatsTable)}
            </View>
          </View>
        );
      });

      return <View style={{ backgroundColor: sectionBackgroundColor, borderRadius: 10 }}>{myUpcomingMeetupslist}</View>;
    } else {
      return <Text style={{ color: baseTextColor }}>You'll see all the meetups that you've joined.</Text>;
    }
  };

  const getMeetup = async (meetupId) => {
    const result = await lampostAPI.get(`/meetups/${meetupId}/selected`);
    const { meetup } = result.data;
    appMenuBottomSheetRef.current.snapToIndex(0);
    setSelectedMeetup(meetup);
    selectedMeetupBottomSheetRef.current.snapToIndex(0);
  };

  return (
    <View>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>My upcoming meetups</Text>
      {renderMyUpcomingMeetups()}
    </View>
  );
};

export default Container;
