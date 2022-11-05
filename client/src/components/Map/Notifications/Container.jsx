import React from 'react';
import { View, Text } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Tabs from './Tabs';

const Container = (props) => {
  const snapPoints = ['50%', '100%'];

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={props.notificationBottomSheetRef}
      snapPoints={snapPoints}
      // enablePanDownToClose={true}
      keyboardBehavior={'extend'}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      // onClose={() => onTextBoxBottomSheetClose()}
    >
      <BottomSheetView style={{ flex: 1, paddingLeft: 15, paddingRight: 15 }}>
        <Tabs />
        {/* <Text>meetup notifications here!</Text> */}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default Container;
