import React, { useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import MeetupContext from '../MeetupContext';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import {
  appBottomSheetBackgroundColor,
  sectionBackgroundColor,
  baseTextColor,
  iconColorsTable,
  backgroundColorsTable,
  screenSectionBackgroundColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
const { MaterialCommunityIcons, Feather } = iconsTable;
import BadgeLabels from './BadgeLabels';
import ActionButtons from './ActionButtons';
import Launcher from './Launcher';
import Description from './Description';
import DateAndTime from './DateAndTime';
import Fee from './Fee';
import Members from './Members';

const MeetupDetailBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['65%'], []);
  const { meetupDetailBottomSheetRef, selectedMeetup, setSelectedMeetup } = useContext(MeetupContext);
  console.log(selectedMeetup);
  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={meetupDetailBottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      keyboardBehavior={'extend'}
      onClose={() => setSelectedMeetup(null)}
    >
      <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
        {selectedMeetup ? (
          <>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, marginBottom: 7 }}>
                {selectedMeetup.title}
              </Text>
              <BadgeLabels />
              <ActionButtons />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{}}>
              <Launcher />
              <Description />
              <DateAndTime />
              <Fee />
              <Members />
            </ScrollView>
          </>
        ) : (
          <ActivityIndicator />
        )}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default MeetupDetailBottomSheet;
