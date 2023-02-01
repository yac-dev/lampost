import React, { useContext, useMemo, useEffect } from 'react';
import GlobalContext from '../../../GlobalContext';
import CameraContext from '../CameraContext';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor, baseTextColor } from '../../../utils/colorsTable';
import AppMenuButtons from './AppMenuButtons';
import AddEffect from './AddEffect';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const AppMenuBottomSheet = (props) => {
  const { auth, isIpad } = useContext(GlobalContext);
  const { appMenuBottomSheetRef, cameraMode } = useContext(CameraContext);
  const snapPoints = useMemo(() => ['8%', '45%', '80%'], []);

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
      index={0}
      enableOverDrag={true}
      ref={appMenuBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={1} disappearsOnIndex={0} pressBehavior={0} />
      )}
      enablePanDownToClose={false}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // keyboardBehavior={'interactive'}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, paddingTop: isIpad ? 10 : 0, flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: isIpad ? 35 : 20,
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>Change the mode?</Text>
          {renderCameraMode()}
        </View>
        <AppMenuButtons />
        <AddEffect />
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default AppMenuBottomSheet;
