import React, { useState, useMemo, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AssetContext from './AssetContext';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor, baseTextColor } from '../../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const AssetMenuBottomSheet = () => {
  // comment (not available), location, meetup, tagged people, report
  const snapPoints = useMemo(() => ['30%', '80%'], []);
  const { assetMenuBottomSheetRef, asset, navigation } = useContext(AssetContext);
  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={assetMenuBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={false}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        <TouchableOpacity
          style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}
          onPress={() => {
            assetMenuBottomSheetRef.current.close();
          }}
        >
          <MaterialIcons name='groups' color={baseTextColor} size={25} style={{ marginRight: 10 }} />
          <Text style={{ color: baseTextColor }}>Tagged</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}
          onPress={() => {
            assetMenuBottomSheetRef.current.close();
          }}
        >
          <Entypo name='location' color={baseTextColor} size={25} style={{ marginRight: 10 }} />
          <Text style={{ color: baseTextColor }}>Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}
          onPress={() => {
            assetMenuBottomSheetRef.current.close();
            navigation.navigate('Report asset', { assetId: asset._id });
          }}
        >
          <MaterialIcons name='report-problem' color={baseTextColor} size={25} style={{ marginRight: 10 }} />
          <Text style={{ color: baseTextColor }}>Report this asset</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default AssetMenuBottomSheet;
