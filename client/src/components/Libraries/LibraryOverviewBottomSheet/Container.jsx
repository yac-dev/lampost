import React, { useContext } from 'react';
import LibrariesContext from '../LibrariesContext';
import { View, Text, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import Body from './Body/Container';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Container = (props) => {
  // oncloseでselecteされたlibraryを消すようにすればいい。
  const { libraryOverviewBottomSheetRef, setSelectedLibrary } = useContext(LibrariesContext);
  const snapPoints = ['80%', '100%'];

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
      enablePanDownToClose={false}
      // backgroundStyle={{ backgroundColor: 'rgb(50, 78, 165)' }}
      // keyboardBehavior={'interactive'}
      onClose={() => setSelectedLibrary(null)}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        <Body />
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default Container;
