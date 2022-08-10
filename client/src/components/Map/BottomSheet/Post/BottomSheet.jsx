// main libraries
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';

// components
import Content from './Content';

const BottomSheet = (props) => {
  const snapPoints = ['50%'];

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={props.bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={() => onBottomSheetClose()}
    >
      <BottomSheetView>
        <Content />
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default BottomSheet;
