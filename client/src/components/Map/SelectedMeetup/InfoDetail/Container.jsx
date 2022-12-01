import React, { useCallback, useContext } from 'react';
import MapContext from '../../MeetupContext';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { appBottomSheetBackgroundColor } from '../../../../utils/colorsTable';
// components
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

  // const renderSwitchingComponent = () => {
  //   if (props.bottomSheet.selectedItem.infoDetail.isOpen) {
  //     return <>{switchComponent()}</>;
  //   } else {
  //     return null;
  //   }
  // };

  // const onCloseInfoDetailBottomSheet = () => {
  //   props.setIsSelectedMeetupInfoDetailBottomSheetOpen(false, '');
  // };

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
      // onClose={() => onCloseInfoDetailBottomSheet()}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>{switchComponent()}</BottomSheetView>
    </GorhomBottomSheet>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup, bottomSheet: state.bottomSheet };
};

export default connect(mapStateToProps, { setIsSelectedMeetupInfoDetailBottomSheetOpen })(Container);
