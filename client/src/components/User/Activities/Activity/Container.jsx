import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import ActivityContext from './ActivityContext';
import lampostAPI from '../../../../apis/lampost';
import { iconColorsTable, baseBackgroundColor } from '../../../../utils/colorsTable';

import ClapPeopleBottomSheet from './ClapPeopleBottomSheet';
import Attendees from './Attendees';

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

  return (
    <ActivityContext.Provider value={{ clapPeopleBottomSheetRef, selectedUser, setSelectedUser, meetupAttendees }}>
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 20 }}>
        <Text>Activity</Text>
        <Text>{props.route.params.meetupId}</Text>
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
    </ActivityContext.Provider>
  );
};

export default ActivityContainer;
