// main libraries
import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';

// components
import Form from './Form';

const BottomSheet = () => {
  const snapPoints = ['20%', '70%'];
  return (
    <GorhomBottomSheet
      index={1}
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
  return {};
};

export default connect(mapStateToProps)(BottomSheet);
