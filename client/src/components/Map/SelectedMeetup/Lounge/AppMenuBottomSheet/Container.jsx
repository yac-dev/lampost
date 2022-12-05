import React, { useMemo, useContext } from 'react';
import LoungeContext from '../LoungeContext';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor } from '../../../../../utils/colorsTable';
import AppMenuButtons from './AppMenuButtons';

const AppMenusBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['8%', '30%'], []);
  const { appMenuBottomSheetRef } = useContext(LoungeContext);

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
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', marginBottom: 15 }}>Send a chat?</Text>
        <AppMenuButtons />
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default AppMenusBottomSheet;
