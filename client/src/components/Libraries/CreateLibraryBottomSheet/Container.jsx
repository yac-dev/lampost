import React, { useState, useContext, useCallback } from 'react';
import LibrariesContext from '../LibrariesContext';
import FormContext from './FormContext';
// import UserContext from './Context';
import { View, Text, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackgroundProps,
} from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor, baseTextColor } from '../../../utils/colorsTable';

import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import FirstPage from './Form/FirstPage/Container';
import SecondPage from './Form/SecondPage/LibraryRolls';

const Container = (props) => {
  const { createLibraryBottomSheetRef } = useContext(LibrariesContext);
  const snapPoints = ['90%'];
  const [page, setPage] = useState('FIRST_PAGE');
  const [formData, setFormData] = useState({ name: '', badges: {}, description: '', rolls: ['', ''] });

  const switchPage = () => {
    console.log('hello world');
    switch (page) {
      case 'FIRST_PAGE':
        return <FirstPage />;
      case 'SECOND_PAGE':
        return <SecondPage />;
      default:
        return null;
    }
  };

  return (
    <FormContext.Provider value={{ formData, setFormData, page, setPage }}>
      <GorhomBottomSheet
        index={-1}
        enableOverDrag={true}
        ref={createLibraryBottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior={'none'} />
        )}
        enablePanDownToClose={false}
        backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
        handleIndicatorStyle={{ backgroundColor: 'white' }}
        // keyboardBehavior={'interactive'}
        // onClose={() => onSelectedItemBottomSheetClose()}
      >
        <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}
            onPress={() => createLibraryBottomSheetRef.current.close()} // stateをからにするのも必要。本当は。
          >
            <AntDesign name='close' size={20} color={baseTextColor} style={{ marginRight: 5 }} />
            <Text style={{ color: baseTextColor }}>Cancel</Text>
          </TouchableOpacity>
          {/* <Form /> */}
          {switchPage()}
        </BottomSheetView>
      </GorhomBottomSheet>
    </FormContext.Provider>
  );
};

export default Container;
