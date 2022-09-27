// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';

// ac
import { setIsSelectedItemBottomSheetOpen } from '../../../redux/actionCreators/bottomSheet';

import Header from './Header';
import Body from './Body/Container';
import ActionButtons from './ActionButtons';

const Container = (props) => {
  const [component, setComponent] = useState('overview');
  const snapPoints = ['60%'];

  const onSelectedItemBottomSheetClose = () => {
    if (props.bottomSheet.selectedItem.isOpen) {
      props.setIsSelectedItemBottomSheetOpen(false);
    }
  };

  const renderSelectedMeetup = () => {
    if (props.selectedMeetup) {
      return (
        <View style={{ position: 'relative' }}>
          <Header component={component} setComponent={setComponent} />
          <ActionButtons />
          <Body component={component} />
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
      <BottomSheetView style={{ padding: 20 }}>{renderSelectedMeetup()}</BottomSheetView>
    </GorhomBottomSheet>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup };
};

export default connect(mapStateToProps)(Container);
