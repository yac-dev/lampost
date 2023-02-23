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
} from '../../../utils/colorsTable';
import { Ionicons } from '@expo/vector-icons';
// import Badges from './BadgesLabels';

const Header = (props) => {
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
      <View
        style={{
          width: 80,
          height: 50,
          borderRadius: 10,
          borderWidth: 0.3,
          marginRight: 15,
          borderColor: baseTextColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 13, textAlign: 'center', color: baseTextColor }}>{dateElements[0]}</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: baseTextColor }}>
          {dateElements[1]}&nbsp;{dateElements[2]}
        </Text>
      </View>
    );
  };

  function toHoursAndMinutes(duration) {
    const minutes = duration % 60;
    const hours = Math.floor(duration / 60);

    return `${hours} hours ${minutes} minutes`;
  }

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
      <View style={{ flexDirection: 'row' }}>
        {renderDate(selectedMeetup.startDateAndTime)}
        <View style={{ flexDirection: 'column', flexShrink: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', marginBottom: 10 }}>
            {selectedMeetup.title}
          </Text>
          <View>{renderTime(selectedMeetup.startDateAndTime, selectedMeetup.duration)}</View>
        </View>
      </View>
    </View>
  );
};

export default Header;
