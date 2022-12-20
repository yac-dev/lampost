// main libraries
import React, { useContext, useMemo } from 'react';
import GlobalContext from '../../../GlobalContext';
import MapContext from '../MeetupContext';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetTextInput, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { baseTextColor } from '../../../utils/colorsTable';

// ac
import { setIsSelectedItemBottomSheetOpen } from '../../../redux/actionCreators/bottomSheet';
import { appBottomSheetBackgroundColor } from '../../../utils/colorsTable';

import Header from './Header';
import ActionButtons from './ActionButtons';
import Badges from './Badges';
import Menus from './Menus';

const Container = (props) => {
  const snapPoints = useMemo(() => ['60%', '85%'], []);
  const { selectedMeetup, selectedMeetupBottomSheetRef } = useContext(MapContext);

  const renderSelectedMeetup = () => {
    if (selectedMeetup) {
      return (
        <View>
          <Header />
          <ActionButtons />
          <Menus />
        </View>
      );
    } else {
      return (
        <View>
          <Text style={{ color: baseTextColor }}>Now Loading...</Text>
        </View>
      );
    }
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      // ref={props.selectedItemBottomSheetRef}
      ref={selectedMeetupBottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      keyboardBehavior={'interactive'}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
    >
      <BottomSheetView style={{ paddingLeft: 20, paddingRight: 20, flex: 1 }}>
        <ScrollView>{renderSelectedMeetup()}</ScrollView>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup, bottomSheet: state.bottomSheet };
};

export default connect(mapStateToProps, { setIsSelectedItemBottomSheetOpen })(Container);
