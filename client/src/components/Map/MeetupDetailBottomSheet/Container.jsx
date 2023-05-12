import React, { useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import MeetupContext from '../MeetupContext';
import DiscoverNavigatorContext from '../../Navigator/Discover/DiscoverNavigatorContext';
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
const { MaterialCommunityIcons, Feather, Ionicons } = iconsTable;
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
  const { topLevelNavigation } = useContext(DiscoverNavigatorContext);

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
              <View
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>{selectedMeetup.title}</Text>
                <TouchableOpacity
                  onPress={() => topLevelNavigation.navigate('Discover report', { report: selectedMeetup.title })}
                >
                  <Ionicons name='flag' size={15} color='white' />
                </TouchableOpacity>
              </View>
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
