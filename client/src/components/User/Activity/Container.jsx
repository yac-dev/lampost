import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import ActivityContext from './ActivityContext';
import lampostAPI from '../../../apis/lampost';
import { iconColorsTable, baseBackgroundColor } from '../../../utils/colorsTable';
import UserInfo from '../../Utils/UserInfo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ClapPeopleBottomSheet from './ClapPeopleBottomSheet';

const ActivityContainer = (props) => {
  const [isFetchedUserAttendees, setIsFetchedUserAttendees] = useState(false);
  const [isFetchedMeetup, setIsFetchedMeetup] = useState(false);
  const [meetup, setMeetup] = useState(null);
  const [meetupAttendees, setMeetupAttendees] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const clapPeopleBottomSheetRef = useRef(null);
  const giveATipBottomSheetRef = useRef(null);

  const getMeetupAttendees = async () => {
    setIsFetchedUserAttendees(false);
    const result = await lampostAPI.get(`/meetupanduserrelationships/meetup/${props.route.params.meetupId}`);
    const { meetupAttendees } = result.data;
    setMeetupAttendees(meetupAttendees);
    setIsFetchedUserAttendees(true);
  };

  useEffect(() => {
    getMeetupAttendees();
  }, []);

  const renderMeetupAttendees = () => {
    if (!meetupAttendees.length) {
      return (
        <View>
          <Text>You'll see all those who joined this meetup.</Text>
        </View>
      );
    } else {
      const list = meetupAttendees.map((user, index) => {
        return (
          <View key={index} style={{ padding: 10 }}>
            <View style={{ padding: 10 }}>
              <UserInfo user={user} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                style={{
                  backgroundColor: iconColorsTable['blue1'],
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 10,
                  marginRight: 10,
                }}
                onPress={() => {
                  setSelectedUser(user);
                  clapPeopleBottomSheetRef.current.snapToIndex(0);
                }}
              >
                <MaterialCommunityIcons name='hand-clap' color={'white'} size={25} style={{ marginRight: 10 }} />
                <Text style={{ color: 'white' }}>Clap</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: iconColorsTable['blue1'],
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 10,
                }}
                disabled={true}
                onPress={() => clapPeopleBottomSheetRef.current.snapToIndex(0)}
              >
                <MaterialCommunityIcons name='gift-open' color={'white'} size={25} style={{ marginRight: 10 }} />
                <Text style={{ color: 'white' }}>Give a tip</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      });

      return <View style={{ padding: 20 }}>{list}</View>;
    }
  };

  return (
    <ActivityContext.Provider value={{ clapPeopleBottomSheetRef, selectedUser, setSelectedUser }}>
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        <Text>Activity</Text>
        <Text>{props.route.params.meetupId}</Text>
        {isFetchedUserAttendees ? renderMeetupAttendees() : <ActivityIndicator />}
        <ClapPeopleBottomSheet clapPeopleBottomSheetRef={clapPeopleBottomSheetRef} />
      </View>
    </ActivityContext.Provider>
  );
};

export default ActivityContainer;
