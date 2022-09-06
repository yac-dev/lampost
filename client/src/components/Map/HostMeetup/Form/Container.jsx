// main libraries
import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';

// components
import Header from '../../../Utils/Header';
import Body from './Body';

import MeetupBadge from './Body/CreateMeetupBadge';
import MeetupDates from './Body/MeetupDates';
import MeetupDetail from './Body/MeetupDetail';

// ac
import { createMeetup } from '../../../../redux/actionCreators/meetups';
import { getBadgeElements } from '../../../../redux/actionCreators/badgeElements';

const INITIAL_STATE = {
  component: 'MeetupBadge',
  badgeElements: [],
  title: '',
  startDateAndTime: null,
  isStartDatePickerVisible: false,
  endDateAndTime: null,
  isEndDatePickerVisible: false,
  meetupGenres: [''],
  isMeetupGenreMenuVisible: false,
  isMeetupFree: true,
  isCurrencyMenuVisible: false,
  currency: '',
  meetupFee: 0,
  isMeetupPublic: true,
  isMeetupPrivacyMenuVisible: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GO_TO_MEETUP_DATES':
      return { ...state, component: 'MeetupDates' };
    case 'BACK_TO_MEETUP_BADGE':
      return { ...state, component: 'MeetupBadge' };
    case 'GO_TO_MEETUP_DETAIL':
      return { ...state, component: 'MeetupDetail' };
    case 'BACK_TO_MEETUP_DATES':
      return { ...state, component: 'MeetupDates' };
    case 'ADD_BADGE_ELEMENTS':
      return { ...state, badgeElements: [...state.badgeElements, action.payload] };
    case 'REMOVE_BADGE_ELEMENT':
      return { ...state }; // 後でやりましょう。
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
      title: state.title,
      genres: genres,
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
      return <MeetupBadge state={state} dispatch={dispatch} />;
    case 'MeetupDates':
      return <MeetupDates state={state} dispatch={dispatch} />;
    case 'MeetupDetail':
      return <MeetupDetail state={state} dispatch={dispatch} />;
    default:
      return null;
  }
};

const mapStateToProps = (state) => {
  return { hostMeetup: state.hostMeetup };
};

export default connect(mapStateToProps, { createMeetup })(Container);
