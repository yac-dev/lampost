import React, { useMemo, useContext } from 'react';
import MapContext from '../MeetupContext';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import AppMenuButtons from './AppMenuButtons';
import UpcomingMeetups from './UpcomingMeetups/Container';
import { appBottomSheetBackgroundColor } from '../../../utils/colorsTable';
import { setIsConfirmHostMeetupModalOpen } from '../../../redux/actionCreators/modal';

const AppMenusBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['8%', '30%', '80%'], []);
  const { appMenuBottomSheetRef } = useContext(MapContext);

  console.log(props.auth.data);

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
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // keyboardBehavior={'interactive'}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', marginBottom: 15 }}>Launch your meetup?</Text>
        <AppMenuButtons />
        <UpcomingMeetups />
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

const mapStateToProps = (state) => {
  return { hostMeetup: state.hostMeetup, auth: state.auth };
};

export default connect(mapStateToProps, { setIsConfirmHostMeetupModalOpen })(AppMenusBottomSheet);
