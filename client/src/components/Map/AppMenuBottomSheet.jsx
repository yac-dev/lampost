import React, { useMemo, useContext } from 'react';
import MapContext from './MeetupContext';
import { View, Text, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  baseTextColor,
  iconColorsTable,
  backgroundColorsTable,
} from '../../utils/colorsTable';
import { iconsTable } from '../../utils/icons';
const { MaterialCommunityIcons, Foundation } = iconsTable;

const AppMenusBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['30%'], []);
  const { appMenuBottomSheetRef, navigation } = useContext(MapContext);

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={appMenuBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
    >
      <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            appMenuBottomSheetRef.current.close();
            navigation.navigate('Launch new meetup');
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['red1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                marginRight: 10,
              }}
            >
              <MaterialCommunityIcons name='rocket-launch' color={iconColorsTable['red1']} size={20} />
            </View>
            <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>Launch new meetup</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            return null;
          }}
          disabled={true}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['lightBlue1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                marginRight: 10,
              }}
            >
              <MaterialCommunityIcons name='map-search-outline' color={iconColorsTable['lightBlue1']} size={20} />
            </View>
            <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>Search for meetup</Text>
          </View>
          <Foundation name='prohibited' color={iconColorsTable['red1']} size={25} />
        </TouchableOpacity>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default AppMenusBottomSheet;
