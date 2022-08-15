// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';

// components
// import Form from './Form';
import FormContainer from './Form/Container';

const BottomSheet = (props) => {
  const snapPoints = ['20%', '80%'];

  if (props.hostMeetup.isOpen && props.hostMeetup.setLocation) {
    return (
      <GorhomBottomSheet
        index={1}
        enableOverDrag={true}
        ref={props.postBottomSheetRef}
        snapPoints={snapPoints}
        // enablePanDownToClose={true}
        onClose={() => onFormBottomSheetClose()}
      >
        <BottomSheetView>
          <FormContainer />
        </BottomSheetView>
      </GorhomBottomSheet>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return { hostMeetup: state.hostMeetup };
};

export default connect(mapStateToProps)(BottomSheet);