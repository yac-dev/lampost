import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LogContext from '../../LogContext';
import MeetupContext from './MeetupContext';
import { iconColorsTable } from '../../../../../utils/colorsTable';
import { iconsTable } from '../../../../../utils/icons';

const ActionButtons = (props) => {
  const { Ionicons, MaterialCommunityIcons } = iconsTable;
  const { navigation, selectedDateBottomSheetRef } = useContext(LogContext);
  const { meetupObject } = useContext(MeetupContext);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
      <TouchableOpacity
        style={{
          // paddingBottom: 5,
          // paddingTop: 5,
          paddingRight: 3,
          flex: 0.5,
        }}
        onPress={() => {
          selectedDateBottomSheetRef.current.close();
          navigation.navigate('Attended', {
            meetupId: meetupObject.meetup._id,
            launcherId: meetupObject.meetup.launcher,
          });
        }}
      >
        <View style={{ backgroundColor: iconColorsTable['blue1'], borderRadius: 5, width: '100%', padding: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
            <MaterialCommunityIcons name='account-group' size={20} color={'white'} style={{ marginRight: 10 }} />
            <Text style={{ color: 'white' }}>Members</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingLeft: 3,
          flex: 0.5,
        }}
        onPress={() => {
          selectedDateBottomSheetRef.current.close();
          navigation.navigate('Meetup assets', { meetupId: meetupObject.meetup._id });
        }}
      >
        <View style={{ backgroundColor: iconColorsTable['blue1'], width: '100%', padding: 5, borderRadius: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
            <Ionicons name='camera' size={20} color={'white'} style={{ marginRight: 10 }} />
            <Text style={{ color: 'white' }}>Snaps</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ActionButtons;
