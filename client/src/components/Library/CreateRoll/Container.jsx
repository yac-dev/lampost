import React, { useContext } from 'react';
import RollsContext from '../RollsContext';
// import UserContext from './Context';
import { View, Text, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, {
  BottomSheetView,
  BottomSheetTextInput,
  BottomSheetScrollView,
  BottomSheetBackdrop,
  BottomSheetBackgroundProps,
} from '@gorhom/bottom-sheet';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Form from './Form/Container';

const AppMenuBottomSheet = (props) => {
  const { createRollBottomSheetRef } = useContext(RollsContext);
  const snapPoints = ['60%'];
  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={createRollBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop
          {...backdropProps}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          // pressBehavior={0} これ、pressした時にどのsnappointに戻るかってことね。
        />
      )}
      enablePanDownToClose={false}
      // backgroundStyle={{ backgroundColor: 'rgb(50, 78, 165)' }}
      // keyboardBehavior={'interactive'}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        <Text
          style={{
            fontWeight: 'bold',
            alignSelf: 'center',
            fontSize: 20,
            borderBottomWidth: 0.3,
            borderBottomColor: 'red',
            padding: 10,
          }}
        >
          Create new Roll
        </Text>
        <Form />
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default AppMenuBottomSheet;
