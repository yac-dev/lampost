import React, { useContext } from 'react';
import MapContext from '../MeetupContext';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {
  baseTextColor,
  iconColorsTable,
  backgroundColorsTable,
  rnDefaultBackgroundColor,
} from '../../../utils/colorsTable';
import FastImage from 'react-native-fast-image';
import BadgeLabel from '../../Utils/BadgeLabel';
import { BottomSheetScrollView, BottomSheetFlatList } from '@gorhom/bottom-sheet';

const Badges = (props) => {
  const { selectedMeetup } = useContext(MapContext);

  const renderBadges = () => {
    const badgesList = selectedMeetup.badges.map((badge, index) => {
      return <BadgeLabel key={index} badge={badge} />;
    });

    return (
      <View
        // contentContainerStyle={{ flexGrow: 1, flexDirection: 'row', paddingBottom: 10, backgroundColor: 'red' }}
        // horizontal={true}
        style={{ flexDirection: 'row' }}
      >
        {badgesList}
      </View>
    );
  };

  return (
    // <BottomSheetScrollView style={{ backgroundColor: 'red' }}>
    <BottomSheetFlatList
      data={selectedMeetup.badges}
      renderItem={({ item }) => <BadgeLabel badge={item} />}
      keyExtractor={(item) => item._id}
    />

    // </BottomSheetScrollView>
  );
};

export default Badges;
