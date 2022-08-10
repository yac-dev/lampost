// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';

// components
import SelectedItem from './SelectedItem';

// ac
import { setIsSelectedItemBottomSheetOpen } from '../../../redux/actionCreators/modal';

const SelectedItemBottomSheet = (props) => {
  const snapPoints = ['50%'];

  const onSelectedItemBottomSheetClose = () => {
    if (props.modal.selectedItemBottomSheet.isOpen) {
      props.setIsSelectedItemBottomSheetOpen(false);
    }
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={props.selectedItemBottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView>
        <SelectedItem />
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

const mapStateToProps = (state) => {
  return { modal: state.modal };
};

export default connect(mapStateToProps, { setIsSelectedItemBottomSheetOpen })(SelectedItemBottomSheet);
