import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MeetupContext from '../MeetupContext';
import {
  screenSectionBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
import DiscoverNavigatorContext from '../../Navigator/Discover/DiscoverNavigatorContext';
const { MaterialCommunityIcons, MaterialIcons } = iconsTable;

const Members = () => {
  const { selectedMeetup } = useContext(MeetupContext);
  const { topLevelNavigation } = useContext(DiscoverNavigatorContext);

  return (
    <TouchableOpacity
      onPress={() => topLevelNavigation.navigate('Meetup members', { meetupId: selectedMeetup._id })}
      style={{ padding: 5, borderRadius: 5, marginBottom: 5 }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: backgroundColorsTable['pink1'],
              padding: 5,
              borderRadius: 7,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <MaterialIcons name='groups' size={20} color={iconColorsTable['pink1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>Members</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: baseTextColor }}>
            {selectedMeetup.totalAttendees}&nbsp;/
            {selectedMeetup.isAttendeesLimitFree ? <Text>&nbsp;free</Text> : selectedMeetup.attendeesLimit}
          </Text>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Members;

/*  */
