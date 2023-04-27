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
import ActionButton from '../../../Utils/ActionButton';

const BadgeTags = () => {
  const { pressedBadgeData, isMyPage, badgeDetailBottomSheetRef, navigation } = useContext(UserContext);
  const { MaterialCommunityIcons, Ionicons } = iconsTable;

  const renderTags = () => {
    if (pressedBadgeData.badgeTags.length) {
      const badgeTagsList = pressedBadgeData.badgeTags.map((badgeTag, index) => {
        return (
          <TouchableOpacity
            style={{
              backgroundColor: screenSectionBackgroundColor,
              padding: 5,
              marginRight: 5,
              marginBottom: 10,
              borderRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            key={index}
          >
            <Text style={{ fontSize: 18, marginRight: 5 }}>{badgeTag.emoji}</Text>
            <Text style={{ color: 'white', fontSize: 18 }}>{badgeTag.text}</Text>
          </TouchableOpacity>
        );
      });

      return <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>{badgeTagsList}</View>;
    } else {
      return null;
    }
  };

  return <View style={{ marginBottom: 20 }}>{renderTags()}</View>;
};

export default BadgeTags;
