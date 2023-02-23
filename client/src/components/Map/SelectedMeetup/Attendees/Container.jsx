import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import lampostAPI from '../../../../apis/lampost';
import { baseBackgroundColor } from '../../../../utils/colorsTable';
import UserInfo from '../../../Utils/UserInfo';

const AttendeesContainer = (props) => {
  const [isFetchedAttendees, setIsFetchedAttendees] = useState(false);
  const [fetchedAttendees, setFetchedAttendees] = useState([]);

  const getMeetupAttendees = async () => {
    const result = await lampostAPI.get(`/meetupanduserrelationships/meetup/${props.route.params.meetupId}/users`);
    const { meetupAttendees } = result.data;
    setFetchedAttendees(meetupAttendees);
    setIsFetchedAttendees(true);
  };

  useEffect(() => {
    getMeetupAttendees();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, paddingLeft: 10, paddingRight: 10 }}>
      {!isFetchedAttendees ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={fetchedAttendees}
          renderItem={({ item }) => <UserInfo user={item} />}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
};

export default AttendeesContainer;
