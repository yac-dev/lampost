import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import BadgeLabel from '../../../Utils/BadgeLabel';

const BadgeLabels = (props) => {
  const renderBadges = () => {
    const badgesList = props.library.badges.map((badge, index) => {
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
