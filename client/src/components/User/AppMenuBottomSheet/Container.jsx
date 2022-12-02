import React, { useContext, useMemo } from 'react';
import UserContext from '../Context';
// import UserContext from './Context';
import { View, Text, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import AppButtons from './AppButtons';
import MyConnections from './MyConnections/Container';
import { appBottomSheetBackgroundColor } from '../../../utils/colorsTable';

const AppMenuBottomSheet = (props) => {
  const { appMenuBottomSheetRef } = useContext(UserContext);
  const snapPoints = useMemo(() => ['8%', '30%', '80%'], []);

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
      // keyboardBehavior={'interactive'}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', marginBottom: 5 }}>Add badges?</Text>
        <AppButtons />
        <MyConnections />
        {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10, marginBottom: 15 }}>
          <TouchableOpacity onPress={() => handleCreateLibraryBottomSheet()}>
            <MaterialIcons name='create-new-folder' size={40} />
            <Text>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo name='images' size={40} />
            <Text>Search</Text>
          </TouchableOpacity>
        </View> */}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default AppMenuBottomSheet;
