import React, { useContext } from 'react';
import UserContext from '../../UserContext';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  iconColorsTable,
  baseTextColor,
  screenSectionBackgroundColor,
  backgroundColorsTable,
} from '../../../../utils/colorsTable';
import { iconsTable } from '../../../../utils/icons';

const BadgeTags = () => {
  const { pressedBadgeData, isMyPage } = useContext(UserContext);
  const { MaterialCommunityIcons, Ionicons } = iconsTable;

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
            }}
            key={index}
          >
            <Text style={{ color: 'white', fontSize: 17 }}>{badgeTag.name}</Text>
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
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: backgroundColorsTable['lightGreen1'],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              marginRight: 10,
            }}
          >
            <Ionicons name='pricetags' color={iconColorsTable['lightGreen1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Badge tags</Text>
        </View>
      </View>

      {renderTags()}
    </View>
  );
};

export default BadgeTags;
