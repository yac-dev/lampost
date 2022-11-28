// main libraries
import React, { useState, useContext } from 'react';
import MapContext from '../MeetupContext';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import GorhomBottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import {
  baseTextColor,
  iconColorsTable,
  backgroundColorsTable,
  appBottomSheetBackgroundColor,
} from '../../../utils/colorsTable';

// components
// import Form from './Form';
import FormContainer from './Form/Container';

const BottomSheet = (props) => {
  const { launchMeetupBottomSheetRef } = useContext(MapContext);
  const snapPoints = ['55%'];

  // if (props.hostMeetup.isOpen && props.hostMeetup.setLocation) {
  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={launchMeetupBottomSheetRef}
      snapPoints={snapPoints}
      // enablePanDownToClose={true}
      // onClose={() => onFormBottomSheetClose()}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <FormContainer navigation={props.navigation} route={props.route} />
      </BottomSheetView>
    </GorhomBottomSheet>
  );
  // } else {
  //   return null;
  // }
};

const mapStateToProps = (state) => {
  return { hostMeetup: state.hostMeetup };
};

export default connect(mapStateToProps)(BottomSheet);
