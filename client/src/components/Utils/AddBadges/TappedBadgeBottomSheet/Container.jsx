import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetTextInput, BottomSheetScrollView } from '@gorhom/bottom-sheet';

// components
import BadgeDetail from '../../BadgeDetail/Container';

// ac
import { setIsTappedBadgeBottomSheetOpen } from '../../../../redux/actionCreators/bottomSheet';

const Container = (props) => {
  const snapPoints = ['15%', '35%', '80%'];

  if (props.bottomSheet.badgeDetail.isOpen) {
    return (
      <GorhomBottomSheet
        index={1}
        enableOverDrag={true}
        ref={props.tappedBadgeBottomSheetRef}
        snapPoints={snapPoints}
        // enablePanDownToClose={true}
        // keyboardBehavior={'extend'}
        // onClose={() => onSelectedItemBottomSheetClose()}
      >
        <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
          {/* <BottomSheetTextInput /> */}
          <TouchableOpacity onPress={() => props.closeTappedBadgeBottomSheet()}>
            <Text>Close this bottom</Text>
          </TouchableOpacity>
          <BadgeDetail badge={props.badge} setBadge={props.setBadge} fromComponent={props.fromComponent} />
        </BottomSheetView>
      </GorhomBottomSheet>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return { bottomSheet: state.bottomSheet };
};

export default connect(mapStateToProps, { setIsTappedBadgeBottomSheetOpen })(Container);
