import React, { useContext, useMemo, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import FormContext from './FormContext';
import lampostAPI from '../../../apis/lampost';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor, baseTextColor, inputBackgroundColorNew } from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';

const CreateUpvoteOptionBottomSheet = () => {
  const { Fontisto } = iconsTable;
  const snapPoints = useMemo(() => ['60%'], []);
  const { createReactionBottomSheetRef, creatingReaction, setCreatingReaction, navigation, setFormData } =
    useContext(FormContext);
  const [isDoneDisabled, setIsDoneDisabled] = useState(true);

  useEffect(() => {
    if (creatingReaction.icon && creatingReaction.comment && creatingReaction.color) {
      setIsDoneDisabled(false);
    } else {
      setIsDoneDisabled(true);
    }
  }, [creatingReaction]);

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={createReactionBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={false}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // keyboardBehavior={'interactive'}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              backgroundColor: inputBackgroundColorNew,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              marginRight: 10,
            }}
            onPress={() => navigation.navigate('Icons')}
          >
            <Fontisto name='smiley' color={baseTextColor} size={25} />
          </TouchableOpacity>
          <TextInput
            placeholder='In 12 characters'
            placeholderTextColor={baseTextColor}
            style={{
              padding: 10,
              color: baseTextColor,
              backgroundColor: inputBackgroundColorNew,
              borderRadius: 5,
            }}
            value={creatingReaction.comment}
            onChangeText={(text) => {
              setCreatingReaction((previous) => {
                return {
                  ...previous,
                  comment: text,
                };
              });
            }}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <TouchableOpacity
            onPress={() => createReactionBottomSheetRef.current.close()}
            style={{ marginRight: 10, padding: 10, backgroundColor: 'red', borderRadius: 5 }}
          >
            <Text style={{ color: 'white' }}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => createReactionBottomSheetRef.current.close()}
            style={{ marginRight: 10, padding: 10, backgroundColor: 'blue', borderRadius: 5 }}
            disabled={isDoneDisabled}
          >
            <Text style={{ color: 'white' }}>Done</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default CreateUpvoteOptionBottomSheet;
