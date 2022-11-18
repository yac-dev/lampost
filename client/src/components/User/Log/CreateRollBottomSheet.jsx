import React, { useState } from 'react';
import { View, Text } from 'react-native';
import GorhomBottomSheet, {
  BottomSheetView,
  BottomSheetTextInput,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

const CreateRollBottomSheet = (props) => {
  const snapPoints = ['50%', '80%', '100%'];
  const [rollName, setRollName] = useState('');

  const onClose = () => {
    props.createRollBottomSheetRef.current.snapToIndex(-1);
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={props.createRollBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={true}
      // keyboardBehavior={'interactive'}
      onClose={() => onClose()}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        <Text>Create new roll</Text>
        <Text>Your meetup has these assets. You can share them on shared album by creating or joining</Text>
        <BottomSheetTextInput
          placeholder='Please write the roll name'
          // inputAccessoryViewID={inputAccessoryViewID}
          style={{
            borderRadius: 10,
            borderWidth: 0.3,
            height: 100,
            padding: 10,
            // backgroundColor: 'rgb(235, 235, 235)',
            width: '100%', // ここも、下の修正に沿って80 90%に変える。
          }}
          // ref={props.textInputRef}
          value={rollName}
          onChangeText={setRollName}
          autoCapitalize='none'
        />
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default CreateRollBottomSheet;
