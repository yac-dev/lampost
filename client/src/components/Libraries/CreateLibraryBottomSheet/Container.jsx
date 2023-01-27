import React, { useState, useContext, useCallback } from 'react';
import LibrariesContext from '../LibrariesContext';
import FormContext from './FormContext';
// import UserContext from './Context';
import { View, Text, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackgroundProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor, baseTextColor } from '../../../utils/colorsTable';
import LibraryName from './Form/LibraryName';
import LibraryBadges from './Form/LibraryBadges';
import LibraryDescription from './Form/LibraryDescription';
import LibraryAsset from './Form/LibraryAsset';

const Container = (props) => {
  const { createLibraryBottomSheetRef } = useContext(LibrariesContext);
  const snapPoints = ['65%'];
  const [component, setComponent] = useState('LIBRARY_NAME');
  // const [formData, setFormData] = useState({ name: '', badges: {}, description: '', rolls: ['', ''] });
  const [formData, setFormData] = useState({ name: '', badges: {}, description: '', asset: null });

  const switchComponent = () => {
    switch (component) {
      case 'LIBRARY_NAME':
        return <LibraryName />;
      case 'LIBRARY_BADGES':
        return <LibraryBadges />;
      case 'LIBRARY_DESCRIPTION':
        return <LibraryDescription />;
      case 'LIBRARY_ASSET':
        return <LibraryAsset />;
      default:
        return null;
    }
  };
  return (
    <FormContext.Provider value={{ formData, setFormData, component, setComponent }}>
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
        keyboardBehavior={'extend'}
        // onClose={() => onSelectedItemBottomSheetClose()}
      >
        <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
          <BottomSheetScrollView>{switchComponent()}</BottomSheetScrollView>
        </BottomSheetView>
      </GorhomBottomSheet>
    </FormContext.Provider>
  );
};

export default Container;
