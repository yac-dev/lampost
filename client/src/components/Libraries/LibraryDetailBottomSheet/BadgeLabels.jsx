import React, { useContext } from 'react';
import LibrariesContext from '../LibrariesContext';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import BadgeLabel from '../../Utils/BadgeLabel';

const BadgeLabels = () => {
  const { selectedLibrary } = useContext(LibrariesContext);

  const renderBadges = () => {
    const badgesList = selectedLibrary.badges.map((badge, index) => {
      return <BadgeLabel key={index} badge={badge} />;
    });
    return <View style={{ flexDirection: 'row' }}>{badgesList}</View>;
  };

  return (
    <View style={{ marginBottom: 7 }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {renderBadges()}
      </ScrollView>
    </View>
  );
};

export default BadgeLabels;
