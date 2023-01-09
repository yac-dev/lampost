import React, { useContext } from 'react';
import AddBadgesContext from '../AddBadgesContext';
import BadgeContext from '../BadgeContext';
import { View, Text, ScrollView } from 'react-native';
import { baseTextColor } from '../../../../utils/colorsTable';

import Badge from './Badge';

const Container = () => {
  const { queriedBadges } = useContext(AddBadgesContext);
  const renderBadges = () => {
    const badgesList = queriedBadges.map((badge, index) => {
      return (
        <BadgeContext.Provider value={{ badge }} key={index}>
          <Badge
          // user={props.user}
          // key={index}
          // fromComponent={props.fromComponent}
          // badgeState={props.badgeState}
          // meetupBadges={props.meetupBadges}
          // badge={badge}
          // onBadgePress={props.onBadgePress}
          />
        </BadgeContext.Provider>
      );
    });

    return <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10 }}>{badgesList}</View>;
  };

  if (queriedBadges.length) {
    return <ScrollView contentContainerStyle={{ paddingBottom: 300 }}>{renderBadges()}</ScrollView>;
  } else {
    return <Text style={{ color: baseTextColor }}>Now loading badges...</Text>;
  }
};

export default Container;
