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
  const [isMeetupTypeMenuVisible, setIsMeetupTypeMenuVisible] = useState(false);
  const [isAttendeesMenuVisible, setIsAttendeesMenuVisible] = useState(false);
  const [selectedMeetupType, setSelectedMeetupType] = useState('');
  const [selectedAttendeesLimit, setSelectedAttendeesLimit] = useState('');

  const [isSwitchOn, setIsSwitchOn] = useState(true);

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
        isMeetupTypeMenuVisible={isMeetupTypeMenuVisible}
        setIsMeetupTypeMenuVisible={setIsMeetupTypeMenuVisible}
        isAttendeesMenuVisible={isAttendeesMenuVisible}
        setIsAttendeesMenuVisible={setIsAttendeesMenuVisible}
        selectedMeetupType={selectedMeetupType}
        setSelectedMeetupType={setSelectedMeetupType}
        selectedAttendeesLimit={selectedAttendeesLimit}
        setSelectedAttendeesLimit={setSelectedAttendeesLimit}
        isSwitchOn={isSwitchOn}
        setIsSwitchOn={setIsSwitchOn}
      />
    </View>
  );
};

export default Container;
