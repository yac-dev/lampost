// main libraries
import React, { useState, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TextInput } from 'react-native';
import BS, { BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Picker } from '@react-native-picker/picker';

// components
import NativeBaseProvider from '../../Utils/NativeBaseProvider';
import Form from './Form';

// ac
import { setIsBottomSheetOpen } from '../../../redux/actionCreators/modal';

const BottomSheet = (props) => {
  // const bottomSheetRef = useRef(null);
  const snapPoints = ['10%', '75%'];

  return (
    <BS
      enableOverDrag={true}
      ref={props.bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={() => props.setIsBottomSheetOpen(false)}
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

export default connect(mapStateToProps, { setIsBottomSheetOpen })(BottomSheet);
