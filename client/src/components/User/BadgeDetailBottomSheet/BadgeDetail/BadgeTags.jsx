import React, { useContext } from 'react';
import UserContext from '../../UserContext';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { iconColorsTable, baseTextColor, screenSectionBackgroundColor } from '../../../../utils/colorsTable';

const BadgeTags = () => {
  const { pressedBadgeData, isMyPage } = useContext(UserContext);

  const renderTags = () => {
    if (pressedBadgeData.badgeTags.length) {
      const badgeTagsList = pressedBadgeData.badgeTags.map((badgeTag, index) => {
        return (
          <TouchableOpacity
            style={{
              backgroundColor: screenSectionBackgroundColor,
              padding: 7,
              marginRight: 10,
              marginBottom: 10,
              borderRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            key={index}
          >
            <MaterialCommunityIcons name='tag' size={20} color='white' style={{ marginRight: 10 }} />
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>{badgeTag.name}</Text>
          </TouchableOpacity>
        );
      });

      return <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>{badgeTagsList}</View>;
    } else {
      return <Text style={{ color: baseTextColor }}>No badge tags added yet.</Text>;
    }
  };

  return (
    <View style={{ marginBottom: 25 }}>
      <Text style={{ color: 'white', marginBottom: 10, fontWeight: 'bold', fontSize: 20 }}>Badge tags</Text>
      {renderTags()}
    </View>
  );
};

export default BadgeTags;
