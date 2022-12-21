import React, { useCallback, useContext, useMemo } from 'react';
import LibrariesContext from '../LibrariesContext';
import { View, Text } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor } from '../../../utils/colorsTable';
import Description from './Description';
import Members from './Members';
import Reactions from './Reactions';

const Container = (props) => {
  const {
    selectedLibraryDetailComponentBottomSheetRef,
    selectedLibraryDetailComponent,
    setSelectedLibraryDetailComponent,
  } = useContext(LibrariesContext);
  const snapPoints = useMemo(() => ['60%', '90%'], []);

  const switchComponent = () => {
    switch (selectedLibraryDetailComponent) {
      case 'Description':
        return <Description />;
      case 'Members':
        return <Members />;
      case 'Reactions':
        return <Reactions />;
      default:
        return null;
    }
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={selectedLibraryDetailComponentBottomSheetRef}
      snapPoints={snapPoints}
      keyboardBehavior={'extend'}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      enablePanDownToClose={true}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      onClose={() => setSelectedLibraryDetailComponent('')}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>{switchComponent()}</BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default Container;
