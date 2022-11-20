import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import GorhomBottomSheet, {
  BottomSheetView,
  BottomSheetTextInput,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CreateRollBottomSheet = (props) => {
  const snapPoints = ['50%', '80%', '100%'];
  const [rollName, setRollName] = useState('');
  const [createOrJoin, setCreateOrJoin] = useState('');

  const onClose = () => {
    props.createRollBottomSheetRef.current.snapToIndex(-1);
  };

  const renderAssets = () => {
    const assetsList = props.selectedMeetup.assets.map((asset, index) => {
      return <Image key={index} style={{ width: 50, height: 50, borderRadius: 5 }} source={{ uri: asset.data }} />;
    });

    return <View style={{ flexDirection: 'row', marginBottom: 15 }}>{assetsList}</View>;
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
        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>New roll</Text>
        <Text style={{ marginBottom: 10 }}>
          Hey launcher! Your meetup has these assets and you can create or join the roll!
        </Text>
        {props.selectedMeetup ? renderAssets() : null}
        <TouchableOpacity onPress={() => setCreateOrJoin('create')}>
          <Text>Create</Text>
          {createOrJoin === 'create' ? <Text>Checked</Text> : null}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCreateOrJoin('join')}>
          <Text>Join</Text>
          {createOrJoin === 'join' ? <Text>Checked</Text> : null}
        </TouchableOpacity>
        {createOrJoin ? <Text>Cancel</Text> : null}
        {/* <BottomSheetTextInput
          placeholder='Please write the roll name'
          // inputAccessoryViewID={inputAccessoryViewID}
          style={{
            borderRadius: 10,
            borderWidth: 0.3,
            // height: 100,
            padding: 10,
            // backgroundColor: 'rgb(235, 235, 235)',
            width: '100%', // ここも、下の修正に沿って80 90%に変える。
          }}
          // ref={props.textInputRef}
          value={rollName}
          onChangeText={setRollName}
          autoCapitalize='none'
        /> */}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default CreateRollBottomSheet;
