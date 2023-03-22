import React, { useState, useEffect, useReducer, useContext, useMemo } from 'react';
import MapContext from '../MeetupContext';
import LaunchMeetupContext from './LaunchMeetupContrext';
import GorhomBottomSheet, { BottomSheetView, BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { baseTextColor, appBottomSheetBackgroundColor } from '../../../utils/colorsTable';

// AIzaSyCS21jPWA4QzrsmT8zkRiTH623JxTVJ6ek
import CreateMeetupTitle from './CreateMeetupTitle/Container';
import CreateMeetupPeople from './CreateMeetupPeople/Container';
import CreateMeetupDateAndTime from './CreateMeetupDateAndTime/Container';
import CreateMeetupFee from './CreateMeetupFee/Container';
import CreateMeetupDescription from './CreateMeetupDescription/Container';

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
  const { launchMeetupBottomSheetRef } = useContext(MapContext);

  const snapPoints = ['40%', '75%'];
  const [component, setComponent] = useState('MEETUP_TITLE');
  const [formData, setFormData] = useState(INITIAL_STATE);

  const switchComponent = () => {
    switch (component) {
      case 'MEETUP_TITLE':
        return <CreateMeetupTitle />;
      case 'MEETUP_PEOPLE':
        return <CreateMeetupPeople />;
      case 'MEETUP_DATE_AND_TIME':
        return <CreateMeetupDateAndTime />;
      case 'MEETUP_FEE':
        return <CreateMeetupFee />;
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
