import React, { useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import MapContext from '../MeetupContext';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {
  iconColorsTable,
  backgroundColorsTable,
  baseTextColor,
  rnDefaultBackgroundColor,
  screenSectionBackgroundColor,
} from '../../../utils/colorsTable';
import { Ionicons } from '@expo/vector-icons';
// import Badges from './BadgesLabels';
import { iconsTable } from '../../../utils/icons';

const Header = (props) => {
  const { MaterialCommunityIcons } = iconsTable;
  const { isIpad } = useContext(GlobalContext);
  const { selectedMeetup } = useContext(MapContext);
  // const renderDate = (date) => {
  //   return (
  //     <Text>{`${new Date(date).toLocaleString('en-US', {
  //       weekday: 'long',
  //       month: 'long',
  //       day: 'numeric',
  //       hour: '2-digit',
  //       minute: '2-digit',
  //     })}`}</Text>
  //   );
  // }; 何で、ここだとこれ動かないんだろ。。。。

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    const dateElements = d.split(',').join('').split(' ');
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <MaterialCommunityIcons
          name='calendar-month-outline'
          color={baseTextColor}
          size={15}
          style={{ marginRight: 5 }}
        />
        <Text style={{ fontSize: 15, color: baseTextColor, marginRight: 10 }}>
          {dateElements[0]}&nbsp;{dateElements[1]}&nbsp;{dateElements[2]}
        </Text>
      </View>
    );
  };

  const renderTime = (date, duration) => {
    const baseTime = new Date(date);
    const startTime = baseTime.toLocaleDateString('en-US', {
      hourCycle: 'h23',
      hour: '2-digit',
      minute: '2-digit',
    });
    const startDateElements = startTime.split(', ');
    var endTime = new Date(baseTime);
    endTime.setMinutes(baseTime.getMinutes() + duration);
    endTime = endTime.toLocaleDateString('en-US', {
      hourCycle: 'h23',
      hour: '2-digit',
      minute: '2-digit',
    });
    const endDateElements = endTime.split(', ');

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name='time-outline' size={15} color={baseTextColor} style={{ marginRight: 5 }} />
        <Text style={{ color: baseTextColor, fontSize: 15 }}>
          {startDateElements[1]}&nbsp;~&nbsp;{endDateElements[1]}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', marginBottom: 5 }}>{selectedMeetup.title}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: screenSectionBackgroundColor,
          padding: 5,
          borderRadius: 5,
          alignSelf: 'flex-start',
        }}
      >
        {renderDate(selectedMeetup.startDateAndTime)}
        {renderTime(selectedMeetup.startDateAndTime, selectedMeetup.duration)}
      </View>
    </View>
  );
};

export default Header;
