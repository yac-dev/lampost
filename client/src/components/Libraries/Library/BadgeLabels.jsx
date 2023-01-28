import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import LibraryContext from './LibraryContext';
import { rnDefaultBackgroundColor, backgroundColorsTable, iconColorsTable } from '../../../utils/colorsTable';
import BadgeLabel from '../../Utils/BadgeLabel';

const BadgeLabels = () => {
  const { library } = useContext(LibraryContext);

  const renderBadges = () => {
    if (library) {
      const badgesList = library.badges.map((badge, index) => {
        return <BadgeLabel key={index} badge={badge} />;
      });

      return <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20 }}>{badgesList}</View>;
    } else {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
  };

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginBottom: 15 }}>
      {renderBadges()}
    </ScrollView>
  );
};

export default BadgeLabels;
