import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import BadgeLabel from '../../../Utils/BadgeLabel';
import { backgroundColorsTable, iconColorsTable } from '../../../../utils/colorsTable';
import LibrariesContext from '../../LibrariesContext';

const BadgeLabels = () => {
  const { selectedLibrary } = useContext(LibrariesContext);

  const renderBadges = () => {
    const badgesList = selectedLibrary.badges.map((badge, index) => {
      return <BadgeLabel key={index} badge={badge} />;
    });

    return <View style={{ flexDirection: 'row' }}>{badgesList}</View>;
  };

  return <ScrollView horizontal={true}>{renderBadges()}</ScrollView>;
};

export default BadgeLabels;
