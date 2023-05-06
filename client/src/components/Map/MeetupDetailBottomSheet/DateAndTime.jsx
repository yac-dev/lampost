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
const { MaterialCommunityIcons, MaterialIcons } = iconsTable;

const DateAndTime = () => {
  const { selectedMeetup } = useContext(MeetupContext);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    const dateElements = d.split(',').join('').split(' ');
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
        <Text style={{ color: baseTextColor, fontSize: 15 }}>
          {startDateElements[1]}&nbsp;-&nbsp;{endDateElements[1]}
        </Text>
      </View>
    );
  };

  // { renderDate(selectedMeetup.startDateAndTime)
  //   renderTime(selectedMeetup.startDateAndTime, selectedMeetup.duration)}

  return (
    <View style={{ padding: 5, borderRadius: 5, marginBottom: 5 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() => setIsAccordionOpen((previous) => !previous)}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <View
            style={{
              backgroundColor: backgroundColorsTable['blue1'],
              padding: 5,
              borderRadius: 7,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <MaterialCommunityIcons name='calendar-clock' size={20} color={iconColorsTable['blue1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>Date & Time</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {renderDate(selectedMeetup.startDateAndTime)}
            {renderTime(selectedMeetup.startDateAndTime, selectedMeetup.duration)}
          </View>
          <TouchableOpacity onPress={() => setIsAccordionOpen((previous) => !previous)}>
            <MaterialCommunityIcons
              name={isAccordionOpen ? 'chevron-up' : 'chevron-down'}
              color={baseTextColor}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
      {isAccordionOpen ? (
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Text style={{ color: 'white', fontSize: 15 }}>
            Starts at{' '}
            {`${new Date(selectedMeetup.startDateAndTime).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}`}
          </Text>
          <Text style={{ color: 'white', fontSize: 15 }}>Duration {selectedMeetup.duration} minutes</Text>
        </View>
      ) : null}
    </View>
  );
};

export default DateAndTime;
