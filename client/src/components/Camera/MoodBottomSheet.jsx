import React, { useContext, useMemo, useEffect } from 'react';
import GlobalContext from '../../GlobalContext';
import CameraContext from './CameraContext';
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  baseTextColor,
  iconColorsTable,
  backgroundColorsTable,
} from '../../utils/colorsTable';
import { emojis } from '../../utils/emojisList';

const emojiOptions = ['😄', '😎', '🤔', '😍', '🤤', '😂', '😎', '🔥', '❤️', '😌'];

const MoodBottomSheet = (props) => {
  const { auth, isIpad } = useContext(GlobalContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 15 : Dimensions.get('window').width / 5;
  const { mood, setMood, moodBottomSheetRef } = useContext(CameraContext);
  const snapPoints = useMemo(() => ['30%'], []);

  const renderEmojis = () => {
    const list = emojiOptions.map((emoji, index) => {
      return (
        <View key={index} style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              // backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={() => {
              setMood(emoji);
              moodBottomSheetRef.current.close();
            }}
          >
            <Text style={{ fontSize: 35 }}>{emoji}</Text>
          </TouchableOpacity>
        </View>
      );
    });

    return (
      <ScrollView contentContainerStyle={{}}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>{list}</View>
      </ScrollView>
    );
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={moodBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // keyboardBehavior={'interactive'}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginLeft: 10, marginBottom: 20 }}>
          How are you feeling now?
        </Text>
        {renderEmojis()}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default MoodBottomSheet;
