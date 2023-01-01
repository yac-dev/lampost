import React, { useContext } from 'react';
import UserContext from '../../UserContext';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { iconColorsTable, baseTextColor } from '../../../../utils/colorsTable';

const BadgeTags = () => {
  const { pressedBadgeData, isMyPage } = useContext(UserContext);

  const renderTags = () => {
    if (pressedBadgeData.badgeTags.length) {
      const badgeTagsList = pressedBadgeData.badgeTags.map((badgeTag, index) => {
        return (
          <TouchableOpacity
            style={{
              backgroundColor: iconColorsTable['lightGreen1'],
              padding: 5,
              marginRight: 10,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            key={index}
          >
            <MaterialCommunityIcons name='tag' size={25} color='white' style={{ marginRight: 10 }} />
            <Text style={{ color: 'white' }}>{badgeTag.name}</Text>
          </TouchableOpacity>
        );
      });

      return <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>{badgeTagsList}</View>;
    } else {
      return <Text style={{ color: baseTextColor }}>No badge tags added yet.</Text>;
    }
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ color: 'white', marginBottom: 5, fontWeight: 'bold', fontSize: 20 }}>Badge tags</Text>
      {renderTags()}
    </View>
  );
};

export default BadgeTags;
