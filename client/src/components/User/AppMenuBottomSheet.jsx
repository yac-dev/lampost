import React, { useContext } from 'react';
import UserContext from './Context';
import { View, Text, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, {
  BottomSheetView,
  BottomSheetTextInput,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

const AppMenuBottomSheet = (props) => {
  const { navigation, user } = useContext(UserContext);
  const snapPoints = ['10%', '30%'];
  return (
    <GorhomBottomSheet
      index={0}
      enableOverDrag={true}
      ref={props.appMenuBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={1} disappearsOnIndex={0} pressBehavior={0} />
      )}
      enablePanDownToClose={false}
      // keyboardBehavior={'interactive'}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        <Text style={{ fontWeight: 'bold', alignSelf: 'center', fontSize: 20, borderBottomWidth: 0.3, padding: 10 }}>
          Actions
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Log', { userId: user._id })}>
          <MaterialCommunityIcons name='history' size={40} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name='logout' size={40} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Fontisto name='player-settings' size={40} />
        </TouchableOpacity>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default AppMenuBottomSheet;
