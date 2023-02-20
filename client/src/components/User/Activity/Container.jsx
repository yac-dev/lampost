import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import lampostAPI from '../../../apis/lampost';
import { iconColorsTable, baseBackgroundColor } from '../../../utils/colorsTable';
import UserInfo from '../../Utils/UserInfo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PraiseBottomSheet from './PraiseBottomSheet';

const ActivityContainer = (props) => {
  const [isFetchedUserAttendees, setIsFetchedUserAttendees] = useState(false);
  const [isFetchedMeetup, setIsFetchedMeetup] = useState(false);
  const [meetup, setMeetup] = useState(null);
  const [meetupAttendees, setMeetupAttendees] = useState([]);
  const praiseBottomSheetRef = useRef(null);

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
  console.log(meetupAttendees);

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
          <View key={index}>
            <UserInfo user={user} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                style={{
                  backgroundColor: iconColorsTable['blue1'],
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 10,
                }}
                onPress={() => praiseBottomSheetRef.current.snapToIndex(0)}
              >
                <MaterialCommunityIcons name='hand-heart' color={'white'} size={25} style={{ marginRight: 10 }} />
                <Text style={{ color: 'white' }}>Praise</Text>
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
              >
                <MaterialCommunityIcons name='hand-heart' color={'white'} size={25} style={{ marginRight: 10 }} />
                <Text style={{ color: 'white' }}>Friend request</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      });

      return <View style={{ padding: 20 }}>{list}</View>;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
      <Text>Activity</Text>
      <Text>{props.route.params.meetupId}</Text>
      {isFetchedUserAttendees ? renderMeetupAttendees() : <ActivityIndicator />}
      <PraiseBottomSheet praiseBottomSheetRef={praiseBottomSheetRef} />
    </View>
  );
};

export default ActivityContainer;
