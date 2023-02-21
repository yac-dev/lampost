import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import MeetupContext from './MeetupContext';
import lampostAPI from '../../../../apis/lampost';
import { iconColorsTable, baseBackgroundColor } from '../../../../utils/colorsTable';
import Header from './Header';
import Body from './Body';
import ClapPeopleBottomSheet from './ClapPeopleBottomSheet';
import Attendees from './Attendees';

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
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ padding: 10 }}>
            <Text style={{ color: 'white', fontSize: 17 }}>Attended</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10 }}>
            <Text style={{ color: 'white', fontSize: 17 }}>Impressions</Text>
          </TouchableOpacity>
        </View>
        {isFetchedUserAttendees ? <Attendees /> : <ActivityIndicator />}
        <ClapPeopleBottomSheet clapPeopleBottomSheetRef={clapPeopleBottomSheetRef} />
      </View>
    </MeetupContext.Provider>
  );
};

export default ActivityContainer;
