import React, { useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import MapContext from '../MeetupContext';
import lampostAPI from '../../../apis/lampost';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { sectionBackgroundColor, baseTextColor, iconColorsTable } from '../../../utils/colorsTable';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Container = (props) => {
  const { auth, myUpcomingMeetups } = useContext(GlobalContext);
  const { appMenuBottomSheetRef, setSelectedMeetup, selectedMeetupBottomSheetRef, navigation } = useContext(MapContext);
  // ここのconditional renderingまじ重要ね。

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
          padding: 10,
          borderRadius: 10,
          borderWidth: 0.3,
          marginRight: 15,
          borderColor: baseTextColor,
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

  const countUnreadMessages = (meetup) => {
    let unreadCount = 0;
    for (let i = 0; i < meetup.chats.length; i++) {
      if (meetup.chats[i].createdAt > meetup.viewedChatsLastTime) {
        unreadCount++;
      }
    }
    if (!unreadCount) {
      return (
        <View style={{ marginRight: 5 }}>
          <TouchableOpacity
            style={{ backgroundColor: iconColorsTable['blue1'], padding: 5, borderRadius: 10 }}
            onPress={() => navigation.navigate('Lounge', { meetupId: meetup._id })}
          >
            <Ionicons size={25} name='ios-chatbubbles' color={'white'} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{ marginRight: 5 }}>
          <TouchableOpacity
            style={{ backgroundColor: iconColorsTable['blue1'], padding: 5, borderRadius: 10 }}
            onPress={() => navigation.navigate('Lounge', { meetupId: meetup._id })}
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
              <Text style={{ color: 'white' }}>{unreadCount}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const renderMyUpcomingMeetups = () => {
    const myUpcomingMeetupslist = Object.values(myUpcomingMeetups).map((meetup, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 10,
            paddingBottom: 10,
            borderBottomWidth: 0.3,
            borderBottomColor: '#EFEFEF',
          }}
          onPress={() => getMeetup(meetup._id)}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {renderDate(meetup.startDateAndTime)}
            <View style={{}}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>{meetup.title}</Text>
              {renderTime(meetup.startDateAndTime)}
            </View>
          </View>
          {countUnreadMessages(meetup)}
        </TouchableOpacity>
      );
    });

    return (
      <View style={{ padding: 10, backgroundColor: sectionBackgroundColor, borderRadius: 10 }}>
        {myUpcomingMeetupslist}
      </View>
    );
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
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>My upcoming meetups</Text>
      {renderMyUpcomingMeetups()}
    </View>
  );
};

export default Container;
