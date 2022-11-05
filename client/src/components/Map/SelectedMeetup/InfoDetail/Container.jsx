import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import GorhomBottomSheet, {
  BottomSheetView,
  BottomSheetTextInput,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

// components
import Badges from './Badges';
import Crew from './Crew';
import Fee from './Fee';
import QandAs from './QandAs';
import MediaPermission from './MediaPermission';

const Container = (props) => {
  const snapPoints = ['40%', '90%'];

  const switchComponent = () => {
    switch (props.bottomSheet.selectedItem.infoDetail.component) {
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

  // if (props.bottomSheet.selectedItem.isOpen && props.bottomSheet.selectedItem.infoDetail.isOpen) {
  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={props.selectedMeetupDetailBottomSheetRef}
      snapPoints={snapPoints}
      keyboardBehavior={'extend'}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={true}
      // keyboardBehavior={'interactive'}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>{switchComponent()}</BottomSheetView>
    </GorhomBottomSheet>
  );
};
//   else {
//     return null;
//   }
// };

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup, bottomSheet: state.bottomSheet };
};

export default connect(mapStateToProps)(Container);
