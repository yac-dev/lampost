// main libraries
import React, { useState, useContext } from 'react';
import MapContext from '../MeetupContext';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
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
      keyboardBehavior={'extend'}
      enablePanDownToClose={false}
      // onClose={() => onFormBottomSheetClose()}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={1} disappearsOnIndex={0} pressBehavior={'none'} />
      )}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
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
