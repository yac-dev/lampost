import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import lampostAPI from '../../../apis/lampost';
import { baseBackgroundColor } from '../../../utils/colorsTable';
import UserInfo from '../../Utils/UserInfo';

const AttendeesContainer = (props) => {
  const { auth, setSnackBar } = useContext(GlobalContext);
  const [isFetchedAttendees, setIsFetchedAttendees] = useState(false);
  const [fetchedAttendees, setFetchedAttendees] = useState([]);

  const getMeetupAttendees = async () => {
    const result = await lampostAPI.get(`/meetupanduserrelationships/meetup/${props.route.params.meetupId}/users`);
    const { meetupAttendees } = result.data;
    setFetchedAttendees(meetupAttendees);
    setIsFetchedAttendees(true);
  };

  const onUserNamePress = (user) => {
    if (!auth.data) {
      setSnackBar({
        isVisible: true,
        barType: 'error',
        message: 'You are required to login or signup',
        duration: 2000,
      });
    } else {
      if (auth.data._id !== user._id) {
        console.log('page opening');
      } else {
        console.log('Not gonna navigate to my page');
      }
    }
  };

  useEffect(() => {
    getMeetupAttendees();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}>
      {!isFetchedAttendees ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={fetchedAttendees}
          renderItem={({ item }) => <UserInfo user={item} onUserNamePress={onUserNamePress} />}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
};

export default AttendeesContainer;
