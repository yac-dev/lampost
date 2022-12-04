import React, { useContext, useMemo } from 'react';
import LogsContext from './LogsContext';
// import UserContext from './Context';
import { View, Text, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import { appBottomSheetBackgroundColor, baseTextColor } from '../../../utils/colorsTable';

const AddThoughtsBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['40%', '80%'], []);
  const { addImpressionsBottomSheetRef } = useContext(LogsContext);

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={addImpressionsBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={false}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      keyboardBehavior={'expand'}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', marginBottom: 15 }}>
          What are your thoughts?
        </Text>
        <Text style={{ color: baseTextColor }}>It's not available now.</Text>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default AddThoughtsBottomSheet;
