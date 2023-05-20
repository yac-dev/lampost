import React, { useState, useMemo, useContext } from 'react';
import GlobalContext from '../../../../GlobalContext';
import ImpressionsContext from './ImpressionsContext';
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor, iconColorsTable, backgroundColorsTable } from '../../../../utils/colorsTable';
import { iconsTable } from '../../../../utils/icons';
const { Ionicons } = iconsTable;

const EmojiBottomSheet = () => {
  const snapPoints = useMemo(() => ['50%'], []);
  const { isIpad } = useContext(GlobalContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 15 : Dimensions.get('window').width / 4;
  const { emojiBottomSheetRef, impressionTypes, addedImpressions, setAddedImpressions } =
    useContext(ImpressionsContext);

  const renderEmojis = () => {
    const list = impressionTypes.map((impression, index) => {
      return (
        <View key={index} style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={() => {
              setAddedImpressions((previous) => {
                const updating = { ...previous };
                if (addedImpressions[impression.emoji]) {
                  delete updating[impression.emoji];
                  return updating;
                } else {
                  updating[impression.emoji] = impression;
                  return updating;
                }
              });
            }}
          >
            <Text style={{ fontSize: 35 }}>{impression.emoji}</Text>
            <Text style={{ color: 'white', textAlign: 'center' }}>{impression.label}</Text>
          </TouchableOpacity>
          {addedImpressions[impression.emoji] ? (
            <Ionicons
              name='checkmark-circle'
              size={20}
              color={iconColorsTable['green1']}
              style={{ position: 'absolute', right: 5, top: 0 }}
            />
          ) : null}
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
      ref={emojiBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={false}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <Text style={{ color: 'white', paddingLeft: 10, fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
          How do you rate this meetup?
        </Text>
        {renderEmojis()}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default EmojiBottomSheet;
