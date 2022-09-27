// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';

// ac
import { setIsSelectedItemBottomSheetOpen } from '../../../redux/actionCreators/bottomSheet';

import Header from './Header';
import Body from './Body/Container';
import Footer from './Footer';

const Container = (props) => {
  const snapPoints = ['60%'];

  const onSelectedItemBottomSheetClose = () => {
    if (props.bottomSheet.selectedItem.isOpen) {
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
        <Header />
        <Body />
        <Footer />
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default Container;
