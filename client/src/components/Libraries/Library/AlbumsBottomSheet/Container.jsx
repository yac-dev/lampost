import React, { useContext, useMemo, useEffect } from 'react';
import GlobalContext from '../../../../GlobalContext';
import LibraryContext from '../LibraryContext';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor, baseTextColor, backgroundColorsTable } from '../../../../utils/colorsTable';
import { iconsTable } from '../../../../utils/icons';

const AppMenuBottomSheet = (props) => {
  const { albumsBottomSheetRef } = useContext(LibraryContext);
  const snapPoints = useMemo(() => ['60%'], []);
  const { MaterialCommunityIcons } = iconsTable;

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={albumsBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
    >
      <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: backgroundColorsTable['lightGreen1'],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 7,
              marginRight: 10,
            }}
          >
            <MaterialCommunityIcons name='image-album' color={backgroundColorsTable['lightGreen1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Albums</Text>
        </View>
        <Text style={{ color: baseTextColor, fontSize: 20 }}>It's not available now 🛠</Text>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default AppMenuBottomSheet;
