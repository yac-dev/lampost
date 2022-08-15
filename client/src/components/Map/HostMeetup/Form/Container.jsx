// main libraries
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// components
import Header from '../../../Utils/Header';
import Body from './Body';

const Container = () => {
  const [startDate, setStartDate] = useState(null);
  const [isStartDatePickerVisible, setIsStartDatePickerVisible] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [meetupType, setMeetupType] = useState('');
  const [attendeesLimit, setAttendeesLimit] = useState('');
  const [isAttendeesMenuVisible, setIsAttendeesMenuVisible] = useState(false);

  return (
    <View>
      <Header title='Host Meetup' />
      <Body
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        isStartDatePickerVisible={isStartDatePickerVisible}
        setIsStartDatePickerVisible={setIsStartDatePickerVisible}
        isEndDatePickerVisible={isEndDatePickerVisible}
        setIsEndDatePickerVisible={setIsEndDatePickerVisible}
        title={title}
        setTitle={setTitle}
        detail={detail}
        setDetail={setDetail}
        attendeesLimit={attendeesLimit}
        setAttendeesLimit={setAttendeesLimit}
        isAttendeesMenuVisible={isAttendeesMenuVisible}
        setIsAttendeesMenuVisible={setIsAttendeesMenuVisible}
      />
    </View>
  );
};

export default Container;
