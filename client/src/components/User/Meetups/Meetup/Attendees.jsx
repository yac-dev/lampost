import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import MeetupContext from './MeetupContext';
import { iconColorsTable, baseBackgroundColor } from '../../../../utils/colorsTable';
import UserInfo from '../../../Utils/UserInfo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Attendees = () => {
  const { auth, setSnackBar } = useContext(GlobalContext);
  const { meetupAttendees, clapPeopleBottomSheetRef, navigation, setSelectedUser } = useContext(MeetupContext);

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

  if (!meetupAttendees.length) {
    return <Text>You'll see all those who joined this meetup.</Text>;
  } else {
    const list = meetupAttendees.map((user, index) => {
      return (
        <UserInfo
          key={index}
          user={user}
          onUserNamePress={onUserNamePress}
          actionButtons={
            <View>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: iconColorsTable['blue1'],
                  borderRadius: 10,
                  padding: 7,
                }}
                onPress={() => {
                  setSelectedUser(user);
                  clapPeopleBottomSheetRef.current.snapToIndex(0);
                }}
              >
                <MaterialCommunityIcons name='hand-clap' size={17} color='white' style={{ marginRight: 5 }} />
                <Text style={{ color: 'white' }}>Clap</Text>
              </TouchableOpacity>
            </View>
          }
        />
      );
    });

    return <View style={{ paddingLeft: 10, paddingRight: 10 }}>{list}</View>;
  }
};

export default Attendees;
