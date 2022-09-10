// main libraries
import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';

// components
import Header from '../../../Utils/Header';
import Body from './Body';

import CreateMeetupBadge from './CreateMeetupBadge';
import CreateMeetupDetail from './CreateMeetupDetail/Container';
import CreateMeetupDescription from './CreateMeetupDescription';
// import CreateMeetupDates from './CreateMeetupDescription';
// import CreateMeetupDetail from './CreateMeetupDetail';

// ac
import { createMeetup } from '../../../../redux/actionCreators/meetups';
import { getBadgeElements } from '../../../../redux/actionCreators/badgeElements';

const INITIAL_STATE = {
  component: 'MeetupBadge',
  startDateAndTime: null,
  isStartDatePickerVisible: false,
  endDateAndTime: null,
  isEndDatePickerVisible: false,
  isMeetupGenreMenuVisible: false,
  isMeetupAttendeesLimitFree: true,
  attendeesLimit: 10,
  isMeetupFree: true,
  isCurrencyMenuVisible: false,
  currency: '',
  meetupFee: 0,
  isMeetupPublic: true,
  isMeetupPrivacyMenuVisible: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GO_TO_MEETUP_DETAIL':
      return { ...state, component: 'MeetupDetail' };
    case 'BACK_TO_MEETUP_BADGE':
      return { ...state, component: 'MeetupBadge' };
    case 'GO_TO_MEETUP_DESCRIPTION':
      return { ...state, component: 'MeetupDescription' };
    case 'BACK_TO_MEETUP_DETAIL':
      return { ...state, component: 'MeetupDetail' };
    case 'ADD_BADGE_ELEMENTS':
      return { ...state, badgeElements: [...state.badgeElements, action.payload] };
    case 'REMOVE_BADGE_ELEMENT':
      return { ...state }; // 後でやりましょう。
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
    case 'SET_IS_MEETUP_ATTENDEES_LIMIT_FREE':
      return { ...state, isMeetupAttendeesLimitFree: !state.isMeetupAttendeesLimitFree };
    case 'SET_IS_MEETUP_FREE':
      return { ...state, isMeetupFree: !state.isMeetupFree };
    case 'SET_IS_CURRENCY_MENU_VISIBLE':
      return { ...state, isCurrencyMenuVisible: action.payload };
    case 'SET_CURRENCY':
      return { ...state, currency: action.payload };
    case 'SET_MEETUP_FEE':
      return { ...state, meetupFee: action.payload };
    case 'SET_IS_MEETUP_PRIVACY_MENU_VISIBLE':
      return { ...state, isMeetupPrivacyMenuVisible: action.payload };
    case 'SET_IS_MEETUP_PUBLIC':
      return { ...state, isMeetupPublic: action.payload };
    default:
      return { ...state };
  }
};

const Container = (props) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const enableSubmitButton = () => {
    // formのvalidationをここに書いていくことになる。
    return true;
  };

  useEffect(() => {
    getBadgeElements();
  }, []);

  const onSubmit = () => {
    const genres = state.meetupGenres.map((el) => el.id);
    const formData = {
      place: {
        type: 'Point',
        coordinates: [props.hostMeetup.setLocation.longitude, props.hostMeetup.setLocation.latitude],
      },
      badges: props.selectedBadges,
      startDateAndTime: state.startDateAndTime,
      endDateAndTime: state.endDateAndTime,
      isFree: state.isMeetupFree,
      fee: state.meetupFee,
      currency: state.currency,
      isPublic: state.isMeetupPublic,
      host: '62edfa7578dc6a45c95f3ef6',
    };
    props.createMeetup(formData);
  };

  // return (
  //   <View>
  //     <Header title='Host Meetup!' onSubmit={onSubmit} />
  //     <Body state={state} dispatch={dispatch} />
  //   </View>
  // );
  switch (state.component) {
    case 'MeetupBadge':
      return <CreateMeetupBadge state={state} dispatch={dispatch} />;
    case 'MeetupDetail':
      return <CreateMeetupDetail state={state} dispatch={dispatch} />;
    case 'MeetupDescription':
      return <CreateMeetupDescription state={state} dispatch={dispatch} />;
    default:
      return null;
  }
};

const mapStateToProps = (state) => {
  return { hostMeetup: state.hostMeetup, selectedBadges: state.selectedItem.badges };
};

export default connect(mapStateToProps, { createMeetup })(Container);
