import React from 'react';
import { View, Text } from 'react-native';
import GorhomBottomSheet, {
  BottomSheetView,
  BottomSheetTextInput,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

const BadgeStatusBottomSheet = (props) => {
  const snapPoints = ['40%, 100%'];

  return (
    <GorhomBottomSheet
      index={0}
      enableOverDrag={true}
      ref={props.badgeStatusBottomSheetRef}
      snapPoints={snapPoints}
      // backdropComponent={(backdropProps) => (
      //   <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      // )}
      enablePanDownToClose={true}
      // keyboardBehavior={'interactive'}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        {props.badgeStatus ? <Text>This is the badge status</Text> : <Text>No badge status tapped ...</Text>}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default BadgeStatusBottomSheet;
