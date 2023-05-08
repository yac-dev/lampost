import React, { useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import LibrariesContext from '../LibrariesContext';
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
import BadgeLabels from './BadgeLabels';
import ActionButtons from './ActionButtons';
import CreatedBy from './CreatedBy';
import Description from './Description';
import SnapType from './SnapType';
import Reactions from './Reactions';
import Comments from './Comments';
import Members from './Members';
import Snaps from './Snaps';
const { MaterialCommunityIcons, Feather } = iconsTable;

const LibraryDetailBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['70%'], []);
  const { libraryDetailBottomSheetRef, selectedLibrary, setSelectedLibrary, navigation } = useContext(LibrariesContext);
  console.log(selectedLibrary);
  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={libraryDetailBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: appBottomSheetBackgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      keyboardBehavior={'extend'}
      onClose={() => setSelectedLibrary(null)}
    >
      <BottomSheetView style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
        {selectedLibrary ? (
          <>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, marginBottom: 7 }}>
                {selectedLibrary.title}
              </Text>
              <BadgeLabels />
              {selectedLibrary.isPublic ? null : (
                <Text style={{ alignSelf: 'flex-end', color: baseTextColor }}>This is a private library</Text>
              )}
            </View>
            <ActionButtons />
            <ScrollView showsVerticalScrollIndicator={false} style={{}}>
              <CreatedBy />
              <Description />
              <SnapType />
              <Reactions />
              {/* <Comments /> */}
              <Members />
              <Snaps />
            </ScrollView>
          </>
        ) : (
          <ActivityIndicator />
        )}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default LibraryDetailBottomSheet;
