// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';

// components
import Post from './Post';

// ac
import { setIsPostBottomSheetOpen } from '../../../../redux/actionCreators/modal';

const BottomSheet = (props) => {
  const snapPoints = ['50%'];

  const onPostBottomSheetClose = () => {
    if (props.modal.postBottomSheet.isOpen) {
      props.setIsPostBottomSheetOpen(false);
    }
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={props.postBottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={() => onPostBottomSheetClose()}
    >
      <BottomSheetView>
        <Post />
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

const mapStateToProps = (state) => {
  return { modal: state.modal };
};

export default connect(mapStateToProps, { setIsPostBottomSheetOpen })(BottomSheet);
