import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import AppButtons from './AppButtons';

import { setIsConfirmHostMeetupModalOpen } from '../../../redux/actionCreators/modal';

const AppMenusBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['7%', '30%', '80%'], []);

  if (!props.hostMeetup.isOpen) {
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
        backgroundStyle={{ backgroundColor: 'rgb(54, 57, 63)' }}
        // keyboardBehavior={'interactive'}
        // onClose={() => onSelectedItemBottomSheetClose()}
      >
        <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', marginBottom: 5 }}>
            What are you gonna do?
          </Text>
          <AppButtons />
        </BottomSheetView>
      </GorhomBottomSheet>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return { hostMeetup: state.hostMeetup, auth: state.auth };
};

export default connect(mapStateToProps, { setIsConfirmHostMeetupModalOpen })(AppMenusBottomSheet);
