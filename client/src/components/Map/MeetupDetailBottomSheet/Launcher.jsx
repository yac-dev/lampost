import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import MeetupContext from '../MeetupContext';
import DiscoverNavigatorContext from '../../Navigator/Discover/DiscoverNavigatorContext';
import {
  baseTextColor,
  backgroundColorsTable,
  iconColorsTable,
  screenSectionBackgroundColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
const { MaterialIcons, MaterialCommunityIcons } = iconsTable;

const Launcher = () => {
  const { auth } = useContext(GlobalContext);
  const { selectedMeetup, navigation } = useContext(MeetupContext);
  const { topLevelNavigation } = useContext(DiscoverNavigatorContext);

  if (!selectedMeetup.launcher) {
    return (
      <View style={{ padding: 5, borderRadius: 5, marginBottom: 5 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: backgroundColorsTable['red1'],
                padding: 5,
                borderRadius: 7,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <MaterialCommunityIcons name='rocket-launch' size={25} color={iconColorsTable['red1']} />
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>Launcher</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: baseTextColor, fontSize: 15 }}>This account was deleted...</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() => {
          if (!auth.isAuthenticated || auth.data._id !== selectedMeetup.launcher._id) {
            topLevelNavigation.navigate('Meetup member', { userId: selectedMeetup.launcher._id });
          }
        }}
        style={{ padding: 5, borderRadius: 5, marginBottom: 5 }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: backgroundColorsTable['red1'],
                padding: 5,
                borderRadius: 7,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <MaterialCommunityIcons name='rocket-launch' size={25} color={iconColorsTable['red1']} />
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>Launcher</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text numberOfLines={1} style={{ color: baseTextColor, fontSize: 15 }}>
              {selectedMeetup.launcher.name}
            </Text>
            <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};

export default Launcher;
