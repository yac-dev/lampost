import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import lampostAPI from '../../../apis/lampost';
import { baseBackgroundColor, iconColorsTable } from '../../../utils/colorsTable';
import UserInfo from '../../Utils/UserInfo';
import { iconsTable } from '../../../utils/icons';

const AttendeesContainer = (props) => {
  const { MaterialCommunityIcons } = iconsTable;
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
        props.navigation.navigate('User', { userId: user._id });
      } else {
        return null;
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
          renderItem={({ item }) => (
            <UserInfo
              user={item.user}
              onUserNamePress={() => onUserNamePress(item.user)}
              rightInfo={
                item.rsvp ? (
                  <View
                    style={{
                      backgroundColor: iconColorsTable['green1'],
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 5,
                      padding: 5,
                    }}
                  >
                    <MaterialCommunityIcons name='check' size={25} color={'white'} style={{ marginRight: 5 }} />
                    <Text style={{ color: 'white' }}>RVSP</Text>
                  </View>
                ) : null
              }
            />
          )}
          keyExtractor={(item, index) => `${item.user._id}-${index}`}
        />
      )}
    </View>
  );
};

export default AttendeesContainer;
