// main libraries
import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';

// components
// import CreateMeetupBadge from './CreateMeetupBadge';
import CreateMeetupBadges from './CreateMeetupBadges/Container';
import CreateMeetupDateAndTime from './CreateMeetupDateAndTime/Container';
import CreateMeetupDetail from './CreateMeetupDetail/Container';
import CreateMeetupDescription from './CreateMeetupDescription/Container';
// import CreateMeetupDescription from './CreateMeetupDescription';

// ac
import { createMeetup } from '../../../../redux/actionCreators/meetups';
import { setIsHostMeetupOpen } from '../../../../redux/actionCreators/hostMeetup';
import { setMeetupLocation } from '../../../../redux/actionCreators/hostMeetup';
import { setIsCancelLaunchMeetupModalOpen } from '../../../../redux/actionCreators/modal';
import { addSnackBar } from '../../../../redux/actionCreators/snackBar';

const INITIAL_STATE = {
  component: 'MeetupBadge',
  title: '',
  startDateAndTime: null,
  duration: null,
  applicationDeadline: null,
  isStartDatePickerVisible: false,
  isDurationPickerVisible: false,
  isApplicationDeadlinePickerVisible: false,
  // endDateAndTime: null,
  // isEndDatePickerVisible: false,
  isMeetupAttendeesLimitFree: true,
  meetupAttendeesLimit: 10,
  isMeetupFeeFree: true,
  isCurrencyMenuVisible: false,
  isMediaAllowed: true,
  currency: '',
  meetupFee: 0,
  description: '',
  link: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GO_TO_MEETUP_DATE_AND_TIME':
      return { ...state, component: 'MeetupDateAndTime' };
    case 'BACK_TO_MEETUP_BADGE':
      return { ...state, component: 'MeetupBadge' };
    case 'GO_TO_MEETUP_DETAIL':
      return { ...state, component: 'MeetupDetail' };
    case 'BACK_TO_MEETUP_DATE_AND_TIME':
      return { ...state, component: 'MeetupDateAndTime' };
    case 'BACK_TO_MEETUP_DETAIL':
      return { ...state, component: 'MeetupDetail' };
    case 'GO_TO_MEETUP_DESCRIPTION':
      return { ...state, component: 'MeetupDescription' };
    case 'SET_MEETUP_TITLE':
      return { ...state, title: action.payload };
    case 'SET_START_DATE_AND_TIME':
      return { ...state, startDateAndTime: action.payload };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'SET_APPLICATION_DEADLINE':
      return { ...state, applicationDeadline: action.payload };
    case 'SET_IS_START_DATE_PICKER_VISIBLE':
      return { ...state, isStartDatePickerVisible: action.payload };
    case 'SET_IS_DURATION_PICKER_VISIBLE':
      return { ...state, isDurationPickerVisible: action.payload };
    case 'SET_IS_APPLICATION_DEADLINE_PICKER_VISIBLE':
      return { ...state, isApplicationDeadlinePickerVisible: action.payload };
    case 'SET_END_DATE_AND_TIME':
      return { ...state, endDateAndTime: action.payload };
    case 'SET_IS_END_DATE_PICKER_VISIBLE':
      return { ...state, isEndDatePickerVisible: action.payload };
    case 'SET_IS_MEETUP_ATTENDEES_LIMIT_FREE':
      return { ...state, isMeetupAttendeesLimitFree: !state.isMeetupAttendeesLimitFree };
    case 'SET_MEETUP_ATTENDEES_LIMIT':
      return { ...state, meetupAttendeesLimit: action.payload };
    case 'SET_IS_MEETUP_FEE_FREE':
      return { ...state, isMeetupFeeFree: !state.isMeetupFeeFree };
    case 'SET_IS_CURRENCY_MENU_VISIBLE':
      return { ...state, isCurrencyMenuVisible: action.payload };
    case 'SET_IS_MEDIA_ALLOWED':
      return { ...state, isMediaAllowed: !state.isMediaAllowed };
    case 'SET_CURRENCY':
      return { ...state, currency: action.payload };
    case 'SET_MEETUP_FEE':
      return { ...state, meetupFee: action.payload };
    case 'SET_DESCRIPTION':
      return { ...state, description: action.payload };
    case 'SET_LINK':
      return { ...state, link: action.payload };
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

  const onSubmit = () => {
    const badgeIds = props.selectedBadges.map((badge) => {
      return badge._id;
    });

    const formData = {
      title: state.title,
      place: {
        type: 'Point',
        coordinates: [props.hostMeetup.setLocation.longitude, props.hostMeetup.setLocation.latitude],
      },
      badges: badgeIds,
      startDateAndTime: state.startDateAndTime,
      duration: state.duration,
      applicationDeadline: state.applicationDeadline,
      endDateAndTime: state.endDateAndTime,
      isMeetupAttendeesLimitFree: state.isMeetupAttendeesLimitFree,
      meetupAttendeesLimit: state.meetupAttendeesLimit,
      isMeetupFeeFree: state.isMeetupFeeFree,
      currency: state.currency,
      fee: state.meetupFee,
      isMediaAllowed: state.isMediaAllowed,
      description: state.description,
      link: state.link,
      launcher: props.auth.data._id,
    };
    console.log(formData);
    props.setIsHostMeetupOpen(false);
    props.setMeetupLocation('');
    // props.addSnackBar('Meetup was created successfully! Please check your schedule.', 'success', 7000);
    props.createMeetup(formData);
  };

  const onCancelPressd = () => {
    props.setIsHostMeetupOpen(false);
    props.setMeetupLocation('');
  };

  const switchComponent = () => {
    switch (state.component) {
      case 'MeetupBadge':
        return <CreateMeetupBadges state={state} dispatch={dispatch} navigation={props.navigation} />;
      case 'MeetupDateAndTime':
        return <CreateMeetupDateAndTime state={state} dispatch={dispatch} />;
      case 'MeetupDetail':
        return <CreateMeetupDetail state={state} dispatch={dispatch} />;
      case 'MeetupDescription':
        return <CreateMeetupDescription state={state} dispatch={dispatch} onSubmit={onSubmit} />;
      default:
        return null;
    }
  };

  return (
    <View style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
      <View style={{ alignSelf: 'flex-end', marginBottom: 5 }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => props.setIsCancelLaunchMeetupModalOpen(true)}
        >
          <AntDesign name='close' size={20} color={'black'} style={{ marginRight: 5 }} />
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
      {switchComponent()}
    </View>
  );
};

const mapStateToProps = (state) => {
  return { hostMeetup: state.hostMeetup, selectedBadges: Object.values(state.selectedItem.badges), auth: state.auth };
};

export default connect(mapStateToProps, {
  createMeetup,
  setIsHostMeetupOpen,
  setMeetupLocation,
  setIsCancelLaunchMeetupModalOpen,
  addSnackBar,
})(Container);
