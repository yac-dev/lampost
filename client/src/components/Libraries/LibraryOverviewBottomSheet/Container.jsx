import React, { useContext, useState } from 'react';
import LibrariesContext from '../LibrariesContext';
import SelectedLibraryContext from './SelectedLibraryContext';
import { View, Text, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor } from '../../../utils/colorsTable';
import Body from './Body/Container';
import InfoDetail from './InfoDetail/Container';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Container = (props) => {
  // oncloseでselecteされたlibraryを消すようにすればいい。
  const { libraryOverviewBottomSheetRef, setSelectedLibrary } = useContext(LibrariesContext);
  const snapPoints = ['80%', '100%'];
  const [selectedDetailComponent, setSelectedDetailComponent] = useState('');

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={libraryOverviewBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop
          {...backdropProps}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          // pressBehavior={'none'} 最終的にこれにする。
        />
      )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // keyboardBehavior={'interactive'}
      onClose={() => setSelectedDetailComponent('')}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <SelectedLibraryContext.Provider value={{ selectedDetailComponent, setSelectedDetailComponent }}>
          <Body />
          <InfoDetail />
        </SelectedLibraryContext.Provider>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default Container;
