// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetTextInput, BottomSheetScrollView } from '@gorhom/bottom-sheet';

// ac
import { setIsSelectedItemBottomSheetOpen } from '../../../redux/actionCreators/bottomSheet';
import { appBottomSheetBackgroundColor } from '../../../utils/colorsTable';

import Header from './Header';
import ActionButtons from './ActionButtons';
import Badges from './Badges';
import Menus from './Menus';

const Container = (props) => {
  const snapPoints = ['60%', '85%'];

  const onSelectedItemBottomSheetClose = () => {
    if (props.bottomSheet.selectedItem.isOpen) {
      props.setIsSelectedItemBottomSheetOpen(false);
    }
  };

  const renderSelectedMeetup = () => {
    if (props.selectedMeetup) {
      return (
        <View>
          <Header />
          <ActionButtons navigation={props.navigation} />
          <Menus
            navigation={props.navigation}
            handleselectedMeetupDetailBottomSheetChanges={props.handleselectedMeetupDetailBottomSheetChanges}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text>Now Loading...</Text>
        </View>
      );
    }
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={props.selectedItemBottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      keyboardBehavior={'interactive'}
      onClose={() => onSelectedItemBottomSheetClose()}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>{renderSelectedMeetup()}</BottomSheetView>
    </GorhomBottomSheet>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup, bottomSheet: state.bottomSheet };
};

export default connect(mapStateToProps, { setIsSelectedItemBottomSheetOpen })(Container);
