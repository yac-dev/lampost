import React, { useContext, useMemo, useEffect } from 'react';
import GlobalContext from '../../../GlobalContext';
import CameraContext from '../CameraContext';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  baseTextColor,
  iconColorsTable,
  backgroundColorsTable,
} from '../../../utils/colorsTable';
// import AddAssetEffect from './AddAssetEffectMenu/Container';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

const TagPeopleBottomSheet = (props) => {
  const { auth, isIpad } = useContext(GlobalContext);
  const { tagPeopleBottomSheetRef, taggedPeople, setTaggedPeople } = useContext(CameraContext);
  const snapPoints = useMemo(() => ['30%'], []);

  const renderPeople = () => {};

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={tagPeopleBottomSheetRef}
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
        <View style={{ color: 'red' }}>
          <Text>Tagging people here!!</Text>
        </View>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default TagPeopleBottomSheet;
