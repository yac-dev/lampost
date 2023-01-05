import React, { useContext, useMemo } from 'react';
import LaunchedContext from './LaunchedContext';
import { View, Text, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor } from '../../../utils/colorsTable';

const ImpressionsBottomSheet = () => {
  const snapPoints = useMemo(() => ['30%', '80%'], []);
  const { impressionsBottomSheetRef } = useContext(LaunchedContext);

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={impressionsBottomSheetRef}
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
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', marginBottom: 15 }}>Add badges?</Text>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default ImpressionsBottomSheet;
