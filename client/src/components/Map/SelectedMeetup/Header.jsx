// main libraries
import React, { useState } from 'react';
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
import Badges from './Badges';

// ac
import { joinMeetup } from '../../../redux/actionCreators/meetups';
import { leaveMeetup } from '../../../redux/actionCreators/meetups';

const Header = (props) => {
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
          padding: 10,
          borderRadius: 10,
          borderWidth: 0.3,
          marginRight: 15,
          borderColor: baseTextColor,
        }}
      >
        <Text style={{ fontSize: 13, textAlign: 'center', color: baseTextColor }}>{dateElements[0]}</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: baseTextColor }}>
          {dateElements[1]}&nbsp;{dateElements[2]}
        </Text>
      </View>
    );
  };

  const renderTime = (date, duration) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      hourCycle: 'h23',
      hour: '2-digit',
      minute: '2-digit',
    });
    const dateElements = d.split(', ');
    console.log(duration); // ここは置いておこうか。
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
        <Ionicons name='time-outline' size={15} color={baseTextColor} style={{ marginRight: 5 }} />
        <Text style={{ color: baseTextColor }}>{dateElements[1]}&nbsp;~</Text>
      </View>
    );
  };

  return (
    <View style={{ marginBottom: 25 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        {renderDate(props.selectedMeetup.startDateAndTime)}
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>{props.selectedMeetup.title}</Text>
      </View>
      <View style={{ marginBottom: 10 }}>
        {renderTime(props.selectedMeetup.startDateAndTime, props.selectedMeetup.duration)}
      </View>
      <View style={{ marginBottom: 10 }}>
        <Badges />
      </View>
      <Text style={{ flexShrink: 1, color: baseTextColor }}>{props.selectedMeetup.description}</Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup, auth: state.auth };
};

export default connect(mapStateToProps, { joinMeetup, leaveMeetup })(Header);
