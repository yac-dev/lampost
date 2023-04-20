import React, { useMemo, useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import { View, Text, TouchableOpacity, FlatList, ScrollView, Dimensions } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor, inputBackgroundColorNew } from '../../../utils/colorsTable';
import { emojis } from '../../../utils/emojisList';

const EmojisPickerBottomSheet = (props) => {
  const { isIpad } = useContext(GlobalContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 15 : Dimensions.get('window').width / 8;
  // const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 7.5;

  const snapPoints = useMemo(() => ['50%'], []);

  const renderEmojis = () => {
    const list = emojis.map((emoji, index) => {
      return (
        <View key={index} style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: inputBackgroundColorNew,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={() => {
              props.setGrowingTable((previous) => {
                const updating = { ...previous };
                updating[props.changingEmojiBadge].emoji = emoji;
                return updating;
              });
              props.emojisPickerBottomSheetRef.current.close();
            }}
          >
            <Text style={{ fontSize: 35 }}>{emoji}</Text>
          </TouchableOpacity>
        </View>
      );
    });

    return (
      <ScrollView>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>{list}</View>
      </ScrollView>
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
      <BottomSheetView style={{ flex: 1 }}>{renderEmojis()}</BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default EmojisPickerBottomSheet;
