import React, { useContext, useMemo, useEffect } from 'react';
import LibraryContext from './LibraryContext';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor, baseTextColor } from '../../../utils/colorsTable';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import lampostAPI from '../../../apis/lampost';

const AppMenuBottomSheet = (props) => {
  const { appMenuBottomSheetRef, library, selectedRoll, setSelectedRoll } = useContext(LibraryContext);
  const snapPoints = useMemo(() => ['8%', '30%', '80%'], []);

  const selectRoll = (rollId) => {
    setSelectedRoll(rollId);
    appMenuBottomSheetRef.current.snapToIndex(0);
  };

  const renderRolls = () => {
    if (library && selectedRoll) {
      const rollsList = library.rolls.map((roll, index) => {
        if (selectedRoll === roll._id) {
          return (
            <TouchableOpacity key={index}>
              <Text style={{ color: 'red' }}>{roll.name}</Text>
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity key={index} onPress={() => selectRoll(roll._id)}>
              <Text style={{ color: baseTextColor }}>{roll.name}</Text>
            </TouchableOpacity>
          );
        }
      });
      return <View>{rollsList}</View>;
    } else {
      return (
        <View>
          <Text>Now loading...</Text>
        </View>
      );
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
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        <Text style={{ color: 'white' }}>Rolls</Text>
        <ScrollView>{renderRolls()}</ScrollView>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default AppMenuBottomSheet;
