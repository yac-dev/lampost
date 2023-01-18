import React, { useState, useEffect, useReducer, useContext } from 'react';
import GlobalContext from '../../../../GlobalContext';
import lampostAPI from '../../../../apis/lampost';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import GorhomBottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import MapContext from '../../MeetupContext';
import { connect } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { baseTextColor } from '../../../../utils/colorsTable';

// AIzaSyCS21jPWA4QzrsmT8zkRiTH623JxTVJ6ek

// components
// import CreateMeetupBadge from './CreateMeetupBadge';
import CreateMeetupTitle from './CreateMeetupTitle/Container';
import CreateMeetupPeople from './CreateMeetupPeople/Container';
import CreateMeetupDateAndTime from './CreateMeetupDateAndTime/Container';
import CreateMeetupDetail from './CreateMeetupDetail/Container';
import CreateMeetupDescription from './CreateMeetupDescription/Container';
// import CreateMeetupDescription from './CreateMeetupDescription';

// ac
import { createMeetup } from '../../../../redux/actionCreators/meetups';
import { setIsHostMeetupOpen } from '../../../../redux/actionCreators/hostMeetup';
import { setMeetupLocation } from '../../../../redux/actionCreators/hostMeetup';
import { setIsCancelLaunchMeetupModalOpen } from '../../../../redux/actionCreators/modal';
import { launchMeetup } from '../../../../redux/actionCreators/meetups';
import { addSnackBar } from '../../../../redux/actionCreators/snackBar';

const INITIAL_STATE = {
  component: 'MeetupTitle',
  title: '',
  badge: null,
  badges: {},
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
    case 'GO_TO_MEETUP_PEOPLE':
      return { ...state, component: 'MeetupPeople' };
    case 'BACK_TO_MEETUP_TITLE':
      return { ...state, component: 'MeetupTitle' };
    case 'GO_TO_MEETUP_DATE_AND_TIME':
      return { ...state, component: 'MeetupDateAndTime' };
    case 'BACK_TO_MEETUP_PEOPLE':
      return { ...state, component: 'MeetupPeople' };
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
    case 'SET_MEETUP_BADGE':
      return { ...state, badge: action.payload };
    case 'SET_MEETUP_BADGES':
      return { ...state, badges: action.payload };
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
  const { auth, setAuth, setLoading, myUpcomingMeetupAndChatsTable, setMyUpcomingMeetupAndChatsTable, setSnackBar } =
    useContext(GlobalContext);
  const {
    setIsCancelLaunchMeetupConfirmationModalOpen,
    launchLocation,
    setLaunchLocation,
    setIsLaunchMeetupConfirmed,
    launchMeetupBottomSheetRef,
    setMeetups,
  } = useContext(MapContext);

  const onSubmit = async () => {
    setLoading(true);
    const payload = {
      title: state.title,
      place: {
        type: 'Point',
        coordinates: [launchLocation.longitude, launchLocation.latitude],
      },
      badges: Object.values(state.badges),
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
      launcher: auth.data._id,
    };
    const result = await lampostAPI.post('/meetups', payload);
    const { meetup, viewedChatsLastTime, launcher } = result.data;
    console.log('this is the launcher');
    setMeetups((previous) => {
      return {
        ...previous,
        [meetup._id]: meetup,
      };
    });
    if (launcher === auth.data._id) {
      setLoading(false);
      setAuth((previous) => {
        return {
          ...previous,
          data: {
            ...previous.data,
            upcomingMeetups: [
              ...previous.data.upcomingMeetups,
              { meetup: meetup._id, viewedChatsLastTime: viewedChatsLastTime },
            ],
          },
        };
      });
      // ここでも、chat roomにjoinしなきゃいけない。
      setMyUpcomingMeetupAndChatsTable((previous) => {
        return {
          ...previous,
          [meetup._id]: {
            _id: meetup._id,
            title: meetup.title,
            chats: [],
            unreadChatsCount: 0,
            startDateAndTime: meetup.startDateAndTime,
            viewedChatsLastTime: viewedChatsLastTime,
            launcher: launcher,
            state: meetup.state,
          },
        };
      });
      auth.socket.emit('JOIN_A_LOUNGE', { meetupId: meetup._id });
      setIsLaunchMeetupConfirmed(false);
      setLaunchLocation(null);
      launchMeetupBottomSheetRef.current.close();
      setSnackBar({
        isVisible: true,
        message: 'Launched a meetup.',
        barType: 'success',
        duration: 5000,
      });
    }
    // setMeetups((previous) => [...previous, meetup]);
    // auth.socket.emit('CREATE_MEETUP', payload);
    // const { meetup, viewedChatsLastTime } = result.data;
    Keyboard.dismiss();
    // setAuth((previous) => {
    //   return {
    //     ...previous,
    //     data: {
    //       ...previous.data,
    //       upcomingMeetups: [...previous.data.upcomingMeetups, { meetup, viewedChatsLastTime }],
    //     },
    //   };
    // });
    // setMeetups((previous) => [...previous, meetup]);
    // setIsLaunchMeetupConfirmed(false);
    // setLaunchLocation(null);
    // launchMeetupBottomSheetRef.current.close();
    // setLoading(false);
    // return () => {
    //   socketRef.current.off('CREATE_MEETUP');
    // };
  };

  const switchComponent = () => {
    switch (state.component) {
      case 'MeetupTitle':
        return (
          <CreateMeetupTitle state={state} dispatch={dispatch} navigation={props.navigation} route={props.route} />
        );
      case 'MeetupPeople':
        return (
          <CreateMeetupPeople state={state} dispatch={dispatch} navigation={props.navigation} route={props.route} />
        );
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
    <BottomSheetScrollView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
      <View style={{ alignSelf: 'flex-end', marginBottom: 5 }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => setIsCancelLaunchMeetupConfirmationModalOpen(true)}
        >
          <AntDesign name='close' size={20} color={baseTextColor} style={{ marginRight: 5 }} />
          <Text style={{ color: baseTextColor }}>Cancel</Text>
        </TouchableOpacity>
      </View>
      {switchComponent()}
    </BottomSheetScrollView>
  );
};

export default connect(null, { addSnackBar })(Container);
