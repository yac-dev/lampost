import React, { useMemo, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ActivityContext from './ActivityContext';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  baseTextColor,
  screenSectionBackgroundColor,
} from '../../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ClapPeopleBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['70%', '100%'], []);
  const { selectedUser } = useContext(ActivityContext);

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={props.clapPeopleBottomSheetRef}
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
      <BottomSheetView
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          flex: 1,
        }}
      >
        {selectedUser ? (
          <View>
            <Text style={{ color: baseTextColor }}>You got along with {selectedUser.name}?</Text>
            <Text>Let's praise him/her and get to know more!</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: baseTextColor }}>He/She was kind.</Text>
              <TouchableOpacity>
                <MaterialCommunityIcons name='hand-clap' color={baseTextColor} size={25} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Text style={{ color: 'red' }}>Submit</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default ClapPeopleBottomSheet;
