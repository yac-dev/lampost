import React, { useContext, useMemo, useEffect } from 'react';
import GlobalContext from '../../../../GlobalContext';
import LibraryContext from '../LibraryContext';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor, baseTextColor } from '../../../../utils/colorsTable';
import AppMenuButtons from './AppMenuButtons';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import lampostAPI from '../../../../apis/lampost';

const AppMenuBottomSheet = (props) => {
  const { appMenuBottomSheetRef, library, selectedRoll, setSelectedRoll } = useContext(LibraryContext);
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
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        {/* <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', marginBottom: 35 }}>Post your asset?</Text> */}
        <AppMenuButtons />
        {/* ここに、自分がpostした写真をrenderして、deleteとかを簡単にできるようにしたい。 */}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default AppMenuBottomSheet;
