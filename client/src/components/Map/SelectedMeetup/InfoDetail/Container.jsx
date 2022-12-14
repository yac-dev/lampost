import React, { useCallback, useContext } from 'react';
import MapContext from '../../MeetupContext';
import { View, Text } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor } from '../../../../utils/colorsTable';
// components
import Description from './Description';
import Badges from './Badges';
import Crew from './Crew';
import Fee from './Fee';
import QandAs from './QandAs';
import MediaPermission from './MediaPermission';

import { setIsSelectedMeetupInfoDetailBottomSheetOpen } from '../../../../redux/actionCreators/bottomSheet';

const Container = (props) => {
  const { selectedMeetupDetailComponent, setSelectedMeetupDetailComponent, selectedMeetupDetailBottomSheetRef } =
    useContext(MapContext);
  const snapPoints = ['40%', '90%'];

  const switchComponent = () => {
    switch (selectedMeetupDetailComponent) {
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
      ref={selectedMeetupDetailBottomSheetRef}
      snapPoints={snapPoints}
      keyboardBehavior={'extend'}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      enablePanDownToClose={true}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      onClose={() => setSelectedMeetupDetailComponent('')}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>{switchComponent()}</BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default Container;
