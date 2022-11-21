import React, { useContext } from 'react';
import UserContext from './Context';
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
      backgroundStyle={{ backgroundColor: 'rgb(50, 78, 165)' }}
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
            padding: 10,
            color: 'white',
          }}
        >
          Actions
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Log', { userId: user._id })}>
            <MaterialCommunityIcons name='history' size={40} />
            <Text>Log</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo name='images' size={40} />
            <Text>Assets</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name='handshake-o' size={40} />
            <Text>Connections</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons name='logout' size={40} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Fontisto name='player-settings' size={40} />
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default AppMenuBottomSheet;
