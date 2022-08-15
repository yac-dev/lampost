// main libraries
import React, { useState, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TextInput } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';

// components
// import NativeBaseProvider from '../../../Utils/NativeBaseProvider';
// import Form from './Form';
import FormContainer from '../Post/Form/Container';

// ac
import { setIsPostBottomSheetOpen } from '../../../redux/actionCreators/bottomSheet';

const PostBottomSheet = (props) => {
  // const bottomSheetRef = useRef(null);
  const snapPoints = ['70%'];

  const onFormBottomSheetClose = () => {
    if (props.bottomSheet.post.isOpen) {
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
      onClose={() => onFormBottomSheetClose()}
    >
      <BottomSheetView>
        {/* <Form postBottomSheetRef={props.postBottomSheetRef} /> */}
        <FormContainer />
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

const mapStateToProps = (state) => {
  return { bottomSheet: state.bottomSheet };
};

export default connect(mapStateToProps, { setIsPostBottomSheetOpen })(PostBottomSheet);
