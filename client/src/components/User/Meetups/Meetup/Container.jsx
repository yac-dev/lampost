import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import MeetupContext from './MeetupContext';
import lampostAPI from '../../../../apis/lampost';
import {
  iconColorsTable,
  baseBackgroundColor,
  backgroundColorsTable,
  baseTextColor,
} from '../../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Header from './Header';
import Body from './Body';
// import ClapPeopleBottomSheet from './ClapPeopleBottomSheet';
import Attendees from '../Attended';

const ActivityContainer = (props) => {
  const [isFetchedUserAttendees, setIsFetchedUserAttendees] = useState(false);
  const [isFetchedMeetup, setIsFetchedMeetup] = useState(false);
  const [fetchedMeetup, setFetchedMeetup] = useState(null);
  const [meetupAttendees, setMeetupAttendees] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const clapPeopleBottomSheetRef = useRef(null);
  const giveATipBottomSheetRef = useRef(null);

  const getMeetup = async () => {
    setIsFetchedMeetup(false);
    const result = await lampostAPI.get(`/meetupanduserrelationships/meetup/${props.route.params.meetupId}`);
    const { meetup } = result.data;
    setFetchedMeetup(meetup);
    setIsFetchedMeetup(true);
  };

  const getMeetupAttendees = async () => {
    setIsFetchedUserAttendees(false);
    const result = await lampostAPI.get(`/meetupanduserrelationships/meetup/${props.route.params.meetupId}/users`);
    const { meetupAttendees } = result.data;
    setMeetupAttendees(meetupAttendees);
    setIsFetchedUserAttendees(true);
  };

  useEffect(() => {
    getMeetup();
    getMeetupAttendees();
  }, []);

  return (
    <MeetupContext.Provider
      value={{
        navigation: props.navigation,
        clapPeopleBottomSheetRef,
        selectedUser,
        setSelectedUser,
        meetupAttendees,
        fetchedMeetup,
      }}
    >
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        {isFetchedMeetup ? (
          <>
            <Header />
            <Body />
          </>
        ) : (
          <ActivityIndicator />
        )}
        <View style={{ flexDirection: 'row', paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
            {/* <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['lightBlue1'],
                borderRadius: 10,
                marginRight: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MaterialCommunityIcons name='account-group' size={20} color={iconColorsTable['lightBlue1']} />
            </View> */}
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Attended</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['lightGreen1'],
                borderRadius: 10,
                marginRight: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons name='chatbubbles' size={20} color={iconColorsTable['lightGreen1']} />
            </View> */}
            <Text style={{ color: baseTextColor, fontWeight: 'bold' }}>Impressions</Text>
          </View>
        </View>
        {isFetchedUserAttendees ? <Attendees /> : <ActivityIndicator />}
        {/* <ClapPeopleBottomSheet clapPeopleBottomSheetRef={clapPeopleBottomSheetRef} /> */}
      </View>
    </MeetupContext.Provider>
  );
};

export default ActivityContainer;
