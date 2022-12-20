import React, { useCallback, useContext } from 'react';
import LibrariesContext from '../../LibrariesContext';
import SelectedLibraryContext from '../SelectedLibraryContext';
import { View, Text } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor } from '../../../../utils/colorsTable';

const Container = (props) => {
  const { selectedLibraryDetailComponentBottomSheetRef } = useContext(LibrariesContext);
  const { selectedDetailComponent } = useContext(SelectedLibraryContext); // これがfunctionじゃねーんだと。。。
  const snapPoints = ['40%', '90%'];

  const switchComponent = () => {
    switch (selectedDetailComponent) {
      case 'Badges':
        return <Badges />;
      case 'Description':
        return <Description />;
      case 'Fee':
        return <Fee />;
      case 'Crew':
        return <Crew />;
      case 'QandAs':
        return <QandAs />;
      case 'MediaPermission':
        return <MediaPermission />;
      case 'Links':
        return <Text>Links here</Text>;
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
      onClose={() => selectedDetailComponent('')}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        {/* {switchComponent()} */}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default Container;
