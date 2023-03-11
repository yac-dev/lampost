import React, { useContext, useMemo, useEffect } from 'react';
import GlobalContext from '../../GlobalContext';
import CameraContext from './CameraContext';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  baseTextColor,
  iconColorsTable,
  backgroundColorsTable,
} from '../../utils/colorsTable';
// import AddAssetEffect from './AddAssetEffectMenu/Container';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

const FlipBottomSheet = (props) => {
  const { auth, isIpad } = useContext(GlobalContext);
  const {
    appMenuBottomSheetRef,
    cameraType,
    setCameraType,
    CameraType,
    cameraModeBottomSheetRef,
    flipBottomSheetRef,
    timeMachineBottomSheetRef,
  } = useContext(CameraContext);
  const snapPoints = useMemo(() => ['30%'], []);

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={flipBottomSheetRef}
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
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            setCameraType(CameraType.back);
            flipBottomSheetRef.current.close();
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
              <MaterialIcons name='flip-to-front' size={20} color={iconColorsTable['red1']} />
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>Normal</Text>
          </View>
          {cameraType === CameraType.back ? (
            <Ionicons name='checkmark-circle' color={iconColorsTable['green1']} size={25} />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            setCameraType(CameraType.front);
            flipBottomSheetRef.current.close();
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['blue1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                marginRight: 10,
              }}
            >
              <MaterialIcons name='flip-to-back' size={20} color={iconColorsTable['blue1']} />
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>Selfie</Text>
          </View>
          {cameraType === CameraType.front ? (
            <Ionicons name='checkmark-circle' color={iconColorsTable['green1']} size={25} />
          ) : null}
        </TouchableOpacity>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default FlipBottomSheet;
