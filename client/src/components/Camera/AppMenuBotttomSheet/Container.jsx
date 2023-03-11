import React, { useContext, useMemo, useEffect } from 'react';
import GlobalContext from '../../../GlobalContext';
import CameraContext from '../CameraContext';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor, baseTextColor } from '../../../utils/colorsTable';
import AppMenuButtons from './AppMenuButtons';
import { Ionicons } from '@expo/vector-icons';

const AppMenuBottomSheet = (props) => {
  const { auth, isIpad } = useContext(GlobalContext);
  const { appMenuBottomSheetRef, cameraMode } = useContext(CameraContext);
  const snapPoints = useMemo(() => ['45%', '60%'], []);

  const renderCameraMode = () => {
    switch (cameraMode) {
      case 'photo':
        return <Ionicons name='camera' size={25} color='white' />;
      case 'video':
        return <Ionicons name='videocam' size={25} color='white' />;
      case 'live':
        return <Ionicons name='radio' size={35} color='white' />;
      default:
        return null;
    }
  };

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
      // keyboardBehavior={'interactive'}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
        <AppMenuButtons />
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default AppMenuBottomSheet;
