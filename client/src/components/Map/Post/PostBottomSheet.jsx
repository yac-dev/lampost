// main libraries
import React, { useState, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TextInput } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Picker } from '@react-native-picker/picker';

// components
// import NativeBaseProvider from '../../../Utils/NativeBaseProvider';
import Form from './Form';

// ac
import { setIsPostBottomSheetOpen } from '../../../redux/actionCreators/modal';

const PostBottomSheet = (props) => {
  // const bottomSheetRef = useRef(null);
  const snapPoints = ['70%'];

  const onFormBottomSheetClose = () => {
    if (props.modal.postBottomSheet.isOpen) {
      props.setIsPostBottomSheetOpen(false);
    }
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={props.postBottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={() => onFormBottomSheetClose()}
    >
      <BottomSheetView>
        <Form />
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

const mapStateToProps = (state) => {
  return { modal: state.modal };
};

export default connect(mapStateToProps, { setIsPostBottomSheetOpen })(PostBottomSheet);
