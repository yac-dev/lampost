import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ActivityContext from './ActivityContext';
import { iconColorsTable, baseBackgroundColor } from '../../../../utils/colorsTable';
import UserInfo from '../../../Utils/UserInfo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Attendees = () => {
  const { meetupAttendees, clapPeopleBottomSheetRef } = useContext(ActivityContext);

  if (!meetupAttendees.length) {
    return (
      <View>
        <Text>You'll see all those who joined this meetup.</Text>
      </View>
    );
  } else {
    const list = meetupAttendees.map((user, index) => {
      return (
        <View key={index} style={{ marginBottom: 20 }}>
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

    return <View style={{}}>{list}</View>;
  }
};

export default Attendees;
