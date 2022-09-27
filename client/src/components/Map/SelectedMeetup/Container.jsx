// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';

// ac
import { setIsSelectedItemBottomSheetOpen } from '../../../redux/actionCreators/bottomSheet';

import Header from './Header';
import ActionButtons from './ActionButtons';
import About from './About';

const Container = (props) => {
  const [component, setComponent] = useState('about');
  const snapPoints = ['60%'];

  const onSelectedItemBottomSheetClose = () => {
    if (props.bottomSheet.selectedItem.isOpen) {
      props.setIsSelectedItemBottomSheetOpen(false);
    }
  };

  const renderSelectedMeetup = () => {
    if (props.selectedMeetup) {
      return (
        <View>
          <Header component={component} setComponent={setComponent} />
          <ActionButtons />
          <About />
        </View>
      );
    } else {
      <View>
        <Text>Loading</Text>
      </View>;
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
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20 }}>{renderSelectedMeetup()}</BottomSheetView>
    </GorhomBottomSheet>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup };
};

export default connect(mapStateToProps)(Container);
