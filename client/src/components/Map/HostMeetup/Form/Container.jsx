// main libraries
import React, { useState, useReducer } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// components
import Header from '../../../Utils/Header';
import Body from './Body';

const INITIAL_STATE = {
  title: '',
  startDateAndTime: null,
  isStartDatePickerVisible: false,
  endDateAndTime: null,
  isEndDatePickerVisible: false,
  meetupGenres: [''],
  isMeetupGenreMenuVisible: false,
  isMeetupFree: true,
  currency: '',
  meetupFee: 0,
  isMeetupPublic: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload };
    case 'SET_START_DATE_AND_TIME':
      return { ...state, startDateAndTime: action.payload };
    case 'SET_IS_START_DATE_PICKER_VISIBLE':
      return { ...state, isStartDatePickerVisible: action.payload };
    case 'SET_END_DATE_AND_TIME':
      return { ...state, endDateAndTime: action.payload };
    case 'SET_IS_END_DATE_PICKER_VISIBLE':
      return { ...state, isEndDatePickerVisible: action.payload };
    case 'SET_MEETUP_GENRES':
      const newArr = [...state.meetupGenres];
      newArr[action.payload.meetupGenresIndex] = action.payload.optionObject;
      return { ...state, meetupGenres: newArr };
    case 'ADD_MORE_MEETUP_GENRE':
      return { ...state, meetupGenres: [...state.meetupGenres, ''] };
    case 'SET_IS_MEETUP_GENRE_MENU_VISIBLE':
      return { ...state, isMeetupGenreMenuVisible: action.payload };
    case 'SET_IS_MEETUP_FREE':
      return { ...state, isMeetupFree: action.payload };
    case 'SET_CURRENCY':
      return { ...state, currency: action.payload };
    case 'SET_MEETUP_FEE':
      return { ...state, meetupFee: action.payload };
    case 'SET_IS_MEETUP_PUBLIC':
      return { ...state, isMeetupPublic: action.payload };
    default:
      return { ...state };
  }
};

const Container = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [isStartDatePickerVisible, setIsStartDatePickerVisible] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);
  const [detail, setDetail] = useState('');
  const [meetupType, setMeetupType] = useState('');
  const [attendeesLimit, setAttendeesLimit] = useState('');
  const [isMeetupTypeMenuVisible, setIsMeetupTypeMenuVisible] = useState(false);
  const [isAttendeesMenuVisible, setIsAttendeesMenuVisible] = useState(false);
  const [selectedMeetupType, setSelectedMeetupType] = useState('');
  const [selectedAttendeesLimit, setSelectedAttendeesLimit] = useState('');

  const [isMeetupFree, setIsMeetupFree] = useState(true);
  const [meetupFee, setMeetupFee] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [isMeetupPublic, setIsMeetupPublic] = useState(true);

  const [isSwitchOn, setIsSwitchOn] = useState(true);

  const onSubmit = () => {
    //
    // const formData = {
    //   place: {
    //     type: 'Point',
    //     coordinates: [props.hostMeetup.setLocation.longitude, props.hostMeetup.setLocation.latitude],
    //   },
    //   title,
    //   meetupGenres,
    //   startDateAndTime,
    //   endDateAndTime,
    //   fee,
    //   currency,
    //   isPublic,
    //   host: '74814',
    // };
    console.log(state);
  };

  const enableSubmitButton = () => {
    // formのvalidationをここに書いていくことになる。
    return true;
  };

  return (
    <View>
      <Header title='Host Meetup' onSubmit={onSubmit} />
      <Body
        // startDate={startDate}
        // setStartDate={setStartDate}
        // endDate={endDate}
        // setEndDate={setEndDate}
        // isStartDatePickerVisible={isStartDatePickerVisible}
        // setIsStartDatePickerVisible={setIsStartDatePickerVisible}
        // isEndDatePickerVisible={isEndDatePickerVisible}
        // setIsEndDatePickerVisible={setIsEndDatePickerVisible}
        // title={title}
        // setTitle={setTitle}
        // detail={detail}
        // setDetail={setDetail}
        // attendeesLimit={attendeesLimit}
        // setAttendeesLimit={setAttendeesLimit}
        // isMeetupTypeMenuVisible={isMeetupTypeMenuVisible}
        // setIsMeetupTypeMenuVisible={setIsMeetupTypeMenuVisible}
        // isAttendeesMenuVisible={isAttendeesMenuVisible}
        // setIsAttendeesMenuVisible={setIsAttendeesMenuVisible}
        // selectedMeetupType={selectedMeetupType}
        // setSelectedMeetupType={setSelectedMeetupType}
        // selectedAttendeesLimit={selectedAttendeesLimit}
        // setSelectedAttendeesLimit={setSelectedAttendeesLimit}
        // isSwitchOn={isSwitchOn}
        // setIsSwitchOn={setIsSwitchOn}
        state={state}
        dispatch={dispatch}
      />
    </View>
  );
};

export default Container;
