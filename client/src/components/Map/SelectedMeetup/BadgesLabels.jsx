import React, { useContext } from 'react';
import MapContext from '../MeetupContext';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import {
  baseTextColor,
  iconColorsTable,
  backgroundColorsTable,
  rnDefaultBackgroundColor,
} from '../../../utils/colorsTable';
import FastImage from 'react-native-fast-image';
import BadgeLabel from '../../Utils/BadgeLabel';
import { BottomSheetScrollView, BottomSheetFlatList } from '@gorhom/bottom-sheet';

const BadgeLabels = (props) => {
  const { selectedMeetup } = useContext(MapContext);

  const renderBadges = () => {
    const badgesList = selectedMeetup.badges.map((badge, index) => {
      return <BadgeLabel key={index} badge={badge} />;
    });

    return <View style={{ flexDirection: 'row' }}>{badgesList}</View>;
  };

  return (
    // <BottomSheetFlatList
    //   data={selectedMeetup.badges}
    //   renderItem={({ item }) => <BadgeLabel badge={item} />}
    //   keyExtractor={(item) => item._id}
    //   horizontal={true}
    //   // contentContainerStyle={{ paddingBottom: 30 }}
    //   // showsHorizontalScrollIndicator={false}
    // />
    <View style={{ marginBottom: 20 }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {renderBadges()}
      </ScrollView>
    </View>
  );
};

export default BadgeLabels;
