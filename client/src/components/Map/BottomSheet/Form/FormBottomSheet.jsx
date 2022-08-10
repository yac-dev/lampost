// main libraries
import React, { useState, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TextInput } from 'react-native';
import BS, { BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Picker } from '@react-native-picker/picker';

// components
import NativeBaseProvider from '../../../Utils/NativeBaseProvider';
import Form from './Form';

// ac
import { setIsFormBottomSheetOpen } from '../../../../redux/actionCreators/modal';

const FormBottomSheet = (props) => {
  // const bottomSheetRef = useRef(null);
  const snapPoints = ['75%'];

  const onFormBottomSheetClose = () => {
    if (props.modal.formBottomSheet.isOpen) {
      props.setIsFormBottomSheetOpen(false);
    }
  };

  return (
    <BS
      index={-1}
      enableOverDrag={true}
      ref={props.formBottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={() => onFormBottomSheetClose()}
    >
      <BottomSheetView>
        <Form />
      </BottomSheetView>
    </BS>
  );
};

const mapStateToProps = (state) => {
  return { modal: state.modal };
};

export default connect(mapStateToProps, { setIsFormBottomSheetOpen })(FormBottomSheet);
