import React, { useMemo, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import UserContext from './UserContext';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor, baseTextColor } from '../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const FlagUserMenuBottomSheet = () => {
  const snapPoints = useMemo(() => ['30%'], []);
  const { flagUserMenuBottomSheetRef, setIsConfirmBlockUserModalOpen } = useContext(UserContext);

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={flagUserMenuBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={false}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
          onPress={() => flagUserMenuBottomSheetRef.current.close()}
        >
          <MaterialIcons name='report-problem' color={baseTextColor} size={20} style={{ marginRight: 10 }} />
          <Text style={{ color: baseTextColor }}>Report this user</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
          onPress={() => {
            flagUserMenuBottomSheetRef.current.close();
            setIsConfirmBlockUserModalOpen(true);
          }}
        >
          <MaterialCommunityIcons name='block-helper' color={baseTextColor} size={20} style={{ marginRight: 10 }} />
          <Text style={{ color: baseTextColor }}>Block this user</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default FlagUserMenuBottomSheet;
