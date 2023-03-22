import React, { useState, useEffect, useReducer, useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity, Keyboard, KeyboardAvoidingView } from 'react-native';
import MapContext from '../MeetupContext';
import LaunchMeetupContext from './LaunchMeetupContrext';
import GorhomBottomSheet, { BottomSheetView, BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { AntDesign } from '@expo/vector-icons';
import { baseTextColor, appBottomSheetBackgroundColor } from '../../../utils/colorsTable';

// AIzaSyCS21jPWA4QzrsmT8zkRiTH623JxTVJ6ek

// components
// import CreateMeetupBadge from './CreateMeetupBadge';
import CreateMeetupTitle from './CreateMeetupTitle/Container';
// import CreateMeetupBadges from './CreateMeetupBadges/Container';
import CreateMeetupPeople from './CreateMeetupPeople/Container';
import CreateMeetupDateAndTime from './CreateMeetupDateAndTime/Container';
import CreateMeetupFee from './CreateMeetupFee/Container';
// import CreateMeetupDetail from './CreateMeetupDetail/Container';
import CreateMeetupDescription from './CreateMeetupDescription/Container';
// import CreateMeetupDescription from './CreateMeetupDescription';

const INITIAL_STATE = {
  title: '',
  badges: {},
  startDateAndTime: null,
  duration: null,
  agenda: '', // 500字以内
  isStartDatePickerVisible: false,
  isDurationPickerVisible: false,
  isAttendeesLimitFree: true,
  attendeesLimit: '',
  isFeeFree: true,
  fee: '',
  feeDatail: '',
  meetupPointDetail: '',
  description: '',
  link: '',
};

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'GO_TO_MEETUP_BADGES':
//       return { ...state, component: 'MeetupBadges' };
//     case 'BACK_TO_MEETUP_TITLE':
//       return { ...state, component: 'MeetupTitle' };
//     case 'GO_TO_MEETUP_PEOPLE':
//       return { ...state, component: 'MeetupPeople' };
//     case 'BACK_TO_MEETUP_BADGES':
//       return { ...state, component: 'MeetupBadges' };
//     case 'GO_TO_MEETUP_DATE_AND_TIME':
//       return { ...state, component: 'MeetupDateAndTime' };
//     case 'BACK_TO_MEETUP_PEOPLE':
//       return { ...state, component: 'MeetupPeople' };
//     case 'GO_TO_MEETUP_DETAIL':
//       return { ...state, component: 'MeetupDetail' };
//     case 'BACK_TO_MEETUP_DATE_AND_TIME':
//       return { ...state, component: 'MeetupDateAndTime' };
//     case 'BACK_TO_MEETUP_DETAIL':
//       return { ...state, component: 'MeetupDetail' };
//     case 'GO_TO_MEETUP_DESCRIPTION':
//       return { ...state, component: 'MeetupDescription' };
//     case 'SET_MEETUP_TITLE':
//       return { ...state, title: action.payload };
//     case 'SET_MEETUP_BADGE':
//       return { ...state, badge: action.payload };
//     case 'SET_MEETUP_BADGES':
//       return { ...state, badges: action.payload };
//     case 'SET_START_DATE_AND_TIME':
//       return { ...state, startDateAndTime: action.payload };
//     case 'SET_DURATION':
//       return { ...state, duration: action.payload };
//     case 'SET_APPLICATION_DEADLINE':
//       return { ...state, applicationDeadline: action.payload };
//     case 'SET_IS_START_DATE_PICKER_VISIBLE':
//       return { ...state, isStartDatePickerVisible: action.payload };
//     case 'SET_IS_DURATION_PICKER_VISIBLE':
//       return { ...state, isDurationPickerVisible: action.payload };
//     case 'SET_IS_APPLICATION_DEADLINE_PICKER_VISIBLE':
//       return { ...state, isApplicationDeadlinePickerVisible: action.payload };
//     case 'SET_END_DATE_AND_TIME':
//       return { ...state, endDateAndTime: action.payload };
//     case 'SET_IS_END_DATE_PICKER_VISIBLE':
//       return { ...state, isEndDatePickerVisible: action.payload };
//     case 'SET_IS_MEETUP_ATTENDEES_LIMIT_FREE':
//       return { ...state, isMeetupAttendeesLimitFree: !state.isMeetupAttendeesLimitFree };
//     case 'SET_MEETUP_ATTENDEES_LIMIT':
//       return { ...state, meetupAttendeesLimit: action.payload };
//     case 'SET_IS_MEETUP_FEE_FREE':
//       return { ...state, isMeetupFeeFree: !state.isMeetupFeeFree };
//     case 'SET_IS_CURRENCY_MENU_VISIBLE':
//       return { ...state, isCurrencyMenuVisible: action.payload };
//     case 'SET_IS_MEDIA_ALLOWED':
//       return { ...state, isMediaAllowed: !state.isMediaAllowed };
//     case 'SET_CURRENCY':
//       return { ...state, currency: action.payload };
//     case 'SET_MEETUP_FEE':
//       return { ...state, meetupFee: action.payload };
//     case 'SET_DESCRIPTION':
//       return { ...state, description: action.payload };
//     case 'SET_LINK':
//       return { ...state, link: action.payload };
//     case 'LAUNCHED':
//       return INITIAL_STATE;
//     case 'CANCEL_LAUNCHING':
//       return INITIAL_STATE;
//     default:
//       return { ...state };
//   }
// };

const LaunchMeetupContainer = (props) => {
  const INITIAL_STATE = {
    title: '',
    badges: {},
    startDateAndTime: null,
    duration: null,
    agenda: '', // 500字以内
    isStartDatePickerVisible: false,
    isDurationPickerVisible: false,
    isAttendeesLimitFree: true,
    attendeesLimit: '',
    isFeeFree: true,
    fee: '',
    feeDatail: '',
    meetupPointDetail: '',
    description: '',
    link: '',
  };
  const {
    setIsCancelLaunchMeetupConfirmationModalOpen,
    launchLocation,
    setLaunchLocation,
    setIsLaunchMeetupConfirmed,
    launchMeetupBottomSheetRef,
    setMeetups,
  } = useContext(MapContext);

  const snapPoints = ['40%', '75%'];
  const [component, setComponent] = useState('MEETUP_TITLE');
  const [formData, setFormData] = useState(INITIAL_STATE);

  // const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // const onSubmit = async () => {
  //   setLoading(true);
  //   const payload = {
  //     title: state.title,
  //     place: {
  //       type: 'Point',
  //       coordinates: [launchLocation.longitude, launchLocation.latitude],
  //     },
  //     badges: Object.values(state.badges),
  //     startDateAndTime: state.startDateAndTime,
  //     duration: state.duration,
  //     applicationDeadline: state.applicationDeadline,
  //     isMeetupAttendeesLimitFree: state.isMeetupAttendeesLimitFree,
  //     meetupAttendeesLimit: state.meetupAttendeesLimit,
  //     isMeetupFeeFree: state.isMeetupFeeFree,
  //     fee: state.meetupFee,
  //     description: state.description,
  //     launcher: auth.data._id,
  //   };
  //   const result = await lampostAPI.post('/meetups', payload);
  //   const { meetup, viewedChatsLastTime, launcher } = result.data;
  //   console.log('this is the launcher');
  //   // ここまではapi request.
  //   setMeetups((previous) => {
  //     return {
  //       ...previous,
  //       [meetup._id]: meetup,
  //     };
  //   });
  //   setLoading(false);
  //   setAuth((previous) => {
  //     return {
  //       ...previous,
  //       data: {
  //         ...previous.data,
  //         upcomingMeetups: [meetup._id],
  //       },
  //     };
  //   });
  //   // ここでも、chat roomにjoinしなきゃいけない。
  //   setMyUpcomingMeetups((previous) => {
  //     return {
  //       ...previous,
  //       [meetup._id]: {
  //         _id: meetup._id,
  //         title: meetup.title,
  //         startDateAndTime: meetup.startDateAndTime,
  //         launcher: launcher,
  //         state: meetup.state,
  //         unreadChatsTable: {
  //           general: 0,
  //           reply: 0,
  //           question: 0,
  //           help: 0,
  //         },
  //       },
  //     };
  //   });
  //   // auth.socket.emit('JOIN_A_LOUNGE', { meetupId: meetup._id });
  //   Keyboard.dismiss();
  //   setLoading(false);
  //   setIsLaunchMeetupConfirmed(false);
  //   setLaunchLocation(null);
  //   launchMeetupBottomSheetRef.current.close();
  //   setSnackBar({
  //     isVisible: true,
  //     message: 'Launched a meetup.',
  //     barType: 'success',
  //     duration: 5000,
  //   });
  //   const reault2 = await lampostAPI.post('/launcherandpatronrelationships/patronnotification', {
  //     launcher: {
  //       _id: auth.data._id,
  //       name: auth.data.name,
  //     },
  //     description: state.description,
  //   });
  //   dispatch({ type: 'LAUNCHED', payload: '' });
  // };

  const switchComponent = () => {
    switch (component) {
      case 'MEETUP_TITLE':
        return <CreateMeetupTitle />;
      // case 'MeetupBadges':
      //   return <CreateMeetupBadges />;
      case 'MEETUP_PEOPLE':
        return <CreateMeetupPeople />;
      case 'MEETUP_DATE_AND_TIME':
        return <CreateMeetupDateAndTime />;
      case 'MEETUP_FEE':
        return <CreateMeetupFee />;
      // case 'MeetupDetail':
      //   return <CreateMeetupDetail />;
      case 'MEETUP_DESCRIPTION':
        return <CreateMeetupDescription />;
      default:
        return null;
    }
  };

  return (
    <LaunchMeetupContext.Provider
      value={{
        component,
        setComponent,
        INITIAL_STATE,
        formData,
        setFormData,
        navigation: props.navigation,
        route: props.route,
      }}
    >
      <GorhomBottomSheet
        index={-1}
        enableOverDrag={true}
        ref={launchMeetupBottomSheetRef}
        snapPoints={snapPoints}
        keyboardBehavior={'extend'}
        enablePanDownToClose={false}
        backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
        handleIndicatorStyle={{ backgroundColor: 'white' }}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <BottomSheetScrollView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
            {switchComponent()}
          </BottomSheetScrollView>
        </BottomSheetView>
      </GorhomBottomSheet>
    </LaunchMeetupContext.Provider>
  );
};

export default LaunchMeetupContainer;
