import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { IconButton, Menu, Provider, Button } from 'react-native-paper';
import GorhomBottomSheet, {
  BottomSheetView,
  BottomSheetTextInput,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

// components
import Crew from './Crew';

// ac
import { setIsCrewBottomSheetOpen } from '../../../../../redux/actionCreators/bottomSheet';

const CrewBottomSheet = (props) => {
  const snapPoints = ['65%', '85%', '100%'];

  const onCrewBottomSheetClose = () => {
    if (props.bottomSheet.crew.isOpen) {
      props.setIsCrewBottomSheetOpen(false);
      Keyboard.dismiss();
    }
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={props.crewBottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      // keyboardBehavior={'extend'}
      // keyboardBehavior='interactive'
      onClose={() => onCrewBottomSheetClose()}
    >
      <BottomSheetView style={{ flex: 1, paddingLeft: 15, paddingRight: 15 }}>
        <Text>Crew</Text>
        <Crew meetup={props.meetup} navigation={props.navigation} />
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

const mapStateToProps = (state) => {
  return { bottomSheet: state.bottomSheet };
};

export default connect(mapStateToProps, { setIsCrewBottomSheetOpen })(CrewBottomSheet);
