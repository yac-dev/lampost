import React, { useContext, useMemo } from 'react';
import LibrariesContext from '../LibrariesContext';
// import UserContext from './Context';
import { View, Text, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor, backgroundColorsTable, iconColorsTable } from '../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import AppMenuButtons from './AppMenuButtons';
import MyLibraries from './MyLibraries';

const AppMenuBottomSheet = (props) => {
  const { appMenuBottomSheetRef, handleCreateLibraryBottomSheet, isIpad } = useContext(LibrariesContext);
  const snapPoints = useMemo(() => ['45%', '60%', '80%'], []);

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
        {/* <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>My joined libraries</Text>
         */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: backgroundColorsTable['yellow1'],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginRight: 10,
            }}
          >
            <Ionicons name='ios-library' color={iconColorsTable['yellow1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>My libraries</Text>
        </View>
        <MyLibraries />
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default AppMenuBottomSheet;
