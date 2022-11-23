import React, { useContext } from 'react';
import RollsContext from '../LibrariesContext';
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

const Container = (props) => {
  const { createLibraryBottomSheetRef } = useContext(RollsContext);
  const snapPoints = ['80%'];
  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={createLibraryBottomSheetRef}
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
          Launch your Library
        </Text>
        <Form />
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default Container;
