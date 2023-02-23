// main libraries
import React, { useContext, useMemo } from 'react';
import GlobalContext from '../../../GlobalContext';
import MapContext from '../MeetupContext';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetTextInput, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { baseTextColor } from '../../../utils/colorsTable';
import BadgeLabels from './BadgesLabels';

// ac
import { setIsSelectedItemBottomSheetOpen } from '../../../redux/actionCreators/bottomSheet';
import { appBottomSheetBackgroundColor } from '../../../utils/colorsTable';

import Header from './Header';
import ActionButtons from './ActionButtons';
import Badges from './BadgesLabels';
import Menus from './Menus';

const SelectedMeetupContainer = (props) => {
  const snapPoints = useMemo(() => ['60%', '90%'], []);
  const { selectedMeetup, selectedMeetupBottomSheetRef } = useContext(MapContext);

  const renderSelectedMeetup = () => {
    if (selectedMeetup) {
      return (
        <>
          <Header />
          <BadgeLabels />
          <ActionButtons />
          <Menus />
        </>
      );
    } else {
      return (
        <View>
          <ActivityIndicator />
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
      <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>{renderSelectedMeetup()}</BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default SelectedMeetupContainer;
