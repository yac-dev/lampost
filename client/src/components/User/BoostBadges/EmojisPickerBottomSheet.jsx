import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor } from '../../../utils/colorsTable';
import { emojis } from '../../../utils/emojisList';

const EmojisPickerBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['50%'], []);

  const renderEmoji = (emoji) => {
    return (
      <TouchableOpacity onPress={() => console.log('hello')}>
        <Text style={{ fontSize: 18 }}>{emoji}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={props.emojisPickerBottomSheetRef}
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
      <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
        <FlatList
          data={emojis}
          renderItem={({ item }) => renderEmoji(item)}
          keyExtractor={(item, index) => `${item}-${index}`}
        />
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default EmojisPickerBottomSheet;
