import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { backgroundColorsTable, iconColorsTable, baseTextColor } from '../../../../utils/colorsTable';
import LogContext from '../LogContext';

import BadgeLabel from '../../../Utils/BadgeLabel';

const Header = () => {
  const { pastMeetup } = useContext(LogContext);

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    const dateElements = d.split(',').join('').split(' ');
    return (
      <View
        style={{
          padding: 10,
          borderRadius: 10,
          borderWidth: 0.3,
          marginRight: 15,
          borderColor: baseTextColor,
        }}
      >
        <Text style={{ fontSize: 13, textAlign: 'center', color: baseTextColor }}>{dateElements[0]}</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: baseTextColor }}>
          {dateElements[1]}&nbsp;{dateElements[2]}
        </Text>
      </View>
    );
  };

  const renderBadges = () => {
    const badgesList = pastMeetup.badges.map((badge, index) => {
      return (
        <BadgeLabel
          key={index}
          badgeLableBackgroundColor={backgroundColorsTable[badge.color]}
          badgeIcon={badge.icon}
          badgeIconColor={iconColorsTable[badge.color]}
          labelTextColor={iconColorsTable[badge.color]}
          labelText={badge.name}
        />
      );
    });

    return <View>{badgesList}</View>;
  };

  return (
    <View style={{ marginBottom: 25 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        {renderDate(pastMeetup.startDateAndTime)}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10, color: 'white' }}>{pastMeetup.title}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>{renderBadges()}</View>
      <View style={{ alignSelf: 'flex-end', marginBottom: 10 }}>
        <Text style={{ color: baseTextColor }}>Launched by&nbsp;{pastMeetup.launcher.name}</Text>
      </View>
    </View>
  );
};

export default Header;
