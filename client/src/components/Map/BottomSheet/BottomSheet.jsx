// main libraries
import React, { useState, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import BS, { BottomSheetView } from '@gorhom/bottom-sheet';

// components
import NativeBaseProvider from '../../Utils/NativeBaseProvider';
import Form from './Form';

// ac
import { setIsBottomSheetOpen } from '../../../redux/actionCreators/modal';

const BottomSheet = (props) => {
  // const bottomSheetRef = useRef(null);
  const snapPoints = ['10%', '50%'];

  return (
    <BS
      ref={props.bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={() => props.setIsBottomSheetOpen(false)}
    >
      <BottomSheetView>
        <NativeBaseProvider>
          <Form />
        </NativeBaseProvider>
      </BottomSheetView>
    </BS>
  );
};

const mapStateToProps = (state) => {
  return { modal: state.modal };
};

export default connect(mapStateToProps, { setIsBottomSheetOpen })(BottomSheet);
