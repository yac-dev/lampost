import React, { useContext } from 'react';
import AddBadgesContext from '../AddBadgesContext';
import BadgeContext from '../BadgeContext';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { baseTextColor } from '../../../../utils/colorsTable';

import Badge from './Badge';

const Container = () => {
  const { badges, selectedFilterOption } = useContext(AddBadgesContext);
  const renderBadges = () => {
    const renderingBadges = badges[selectedFilterOption];
    if (renderingBadges.length) {
      const badgesList = badges[selectedFilterOption].map((badge, index) => {
        return (
          <BadgeContext.Provider value={{ badge }} key={index}>
            <Badge />
          </BadgeContext.Provider>
        );
      });

      return <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10 }}>{badgesList}</View>;
    } else {
      return <ActivityIndicator />;
    }
  };

  // if (queriedBadges.length) {
  //   return <ScrollView contentContainerStyle={{ paddingBottom: 300 }}>{renderBadges()}</ScrollView>;
  // } else {
  //   return <Text style={{ color: baseTextColor }}>Now loading badges...</Text>;
  // }
  return <ScrollView contentContainerStyle={{ paddingBottom: 300 }}>{renderBadges()}</ScrollView>;
};

export default Container;
