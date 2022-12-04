import React, { useState } from 'react';
import lampostAPI from '../../../apis/lampost';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, {
  BottomSheetView,
  BottomSheetTextInput,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

const CreateRollBottomSheet = (props) => {
  const snapPoints = ['50%', '70%'];
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

  const createRoll = async () => {
    const formData = {
      name: rollName,
      badge: props.selectedMeetup.badge._id,
      meetupId: props.selectedMeetup._id,
    };
    const result = await lampostAPI.post(`/rolls`, formData);
    console.log('roll was created');
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
          Hey launcher! Your meetup has these assets and you can create your own Roll(sharable album) or join the
          exisisting one!
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
        {createOrJoin ? (
          <TouchableOpacity onPress={() => setCreateOrJoin('')}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        ) : null}
        {createOrJoin === 'create' ? (
          <View>
            <BottomSheetTextInput
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
            />
            <TouchableOpacity onPress={() => createRoll()}>
              <Text>Done</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default CreateRollBottomSheet;
