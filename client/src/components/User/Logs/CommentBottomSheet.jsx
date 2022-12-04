import React from 'react';
import { View, Text } from 'react-native';
import GorhomBottomSheet, {
  BottomSheetView,
  BottomSheetTextInput,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

const AddCommentBottomSheet = (props) => {
  const snapPoints = ['50%', '80%', '100%'];

  const onClose = () => {
    props.addCommentBottomSheetRef.current.snapToIndex(-1);
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={props.addCommentBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={true}
      // keyboardBehavior={'interactive'}
      onClose={() => onClose()}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        <Text>Add comment bottom sheet</Text>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default AddCommentBottomSheet;
