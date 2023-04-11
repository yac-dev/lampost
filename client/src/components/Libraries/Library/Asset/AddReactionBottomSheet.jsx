import React, { useContext, useMemo, useEffect, useState } from 'react';
import GlobalContext from '../../../../GlobalContext';
import AssetContext from './AssetContext';
import { View, Text, InputAccessoryView, TouchableOpacity, Keyboard } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  baseTextColor,
  iconColorsTable,
  sectionBackgroundColor,
  inputBackgroundColor,
  rnDefaultBackgroundColor,
  backgroundColorsTable,
} from '../../../../utils/colorsTable';
import ActionButton from '../../../Utils/ActionButton';
import lampostAPI from '../../../../apis/lampost';
import FastImage from 'react-native-fast-image';

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const AddReactionBottomSheet = (props) => {
  const { auth } = useContext(GlobalContext);
  const snapPoints = useMemo(() => ['40%'], []);
  const { addReactionBottomSheetRef, reactions } = useContext(AssetContext);
  const onDonePress = () => {
    Keyboard.dismiss();
  };

  const renderReactions = () => {
    if (reactions.length) {
      const list = reactions.map((reactionObject, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{
              backgroundColor: rnDefaultBackgroundColor,
              borderRadius: 5,
              marginRight: 10,
            }}
            onPress={() => {
              addReactionBottomSheetRef.current.snapToIndex(0);
            }}
          >
            <View
              style={{
                backgroundColor: backgroundColorsTable[reactionObject.reaction.color],
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                padding: 5,
                borderRadius: 5,
              }}
            >
              <FastImage
                source={{ uri: reactionObject.reaction.icon }}
                style={{ width: 30, height: 30, marginRight: 5 }}
                tintColor={iconColorsTable[reactionObject.reaction.color]}
              />
              <Text style={{ color: 'white', marginRight: 10 }}>{reactionObject.reaction.comment}</Text>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>{reactionObject.upvoted}</Text>
            </View>
          </TouchableOpacity>
        );
      });

      return <View>{list}</View>;
    } else {
      return null;
    }
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={addReactionBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={false}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      keyboardBehavior={'interactive'}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        <View>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginBottom: 10 }}
            onPress={() => props.addNewReactionBottomSheetRef.current.close()}
          >
            <AntDesign name='close' size={20} color={baseTextColor} style={{ marginRight: 5 }} />
            <Text style={{ color: baseTextColor }}>Undo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginBottom: 10 }}
            onPress={() => props.addNewReactionBottomSheetRef.current.close()}
          >
            <AntDesign name='close' size={20} color={baseTextColor} style={{ marginRight: 5 }} />
            <Text style={{ color: baseTextColor }}>Done</Text>
          </TouchableOpacity>
        </View>
        {renderReactions()}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default AddReactionBottomSheet;
