import React, { useContext, useMemo } from 'react';
import LibrariesContext from '../LibrariesContext';
// import UserContext from './Context';
import { View, Text, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor } from '../../../utils/colorsTable';

import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import AppButtons from './AppButtons';
import MyLibraries from './MyLibraries/Container';

const AppMenuBottomSheet = (props) => {
  const { appMenuBottomSheetRef, handleCreateLibraryBottomSheet } = useContext(LibrariesContext);
  const snapPoints = useMemo(() => ['8%', '30%', '80%'], []);

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
      // keyboardBehavior={'interactive'}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', marginBottom: 5 }}>
          What are you gonna do?
        </Text>
        <AppButtons />
        <MyLibraries />
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default AppMenuBottomSheet;
