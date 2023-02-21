import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import MeetupContext from './MeetupContext';
import {
  baseTextColor,
  backgroundColorsTable,
  iconColorsTable,
  screenSectionBackgroundColor,
} from '../../../../utils/colorsTable';
import BadgeLabel from '../../../Utils/BadgeLabel';

const Header = () => {
  const { fetchedMeetup } = useContext(MeetupContext);

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    const dateElements = d.split(',').join('').split(' ');
    return (
      <View
        style={{
          // padding: 10,
          borderRadius: 7,
          marginRight: 15,
          backgroundColor: screenSectionBackgroundColor,
          width: 60,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: 'bold', textAlign: 'center', color: 'white' }}>
          {dateElements[1]}&nbsp;{dateElements[2]}
        </Text>
        <Text style={{ fontSize: 15, textAlign: 'center', color: 'white' }}>{dateElements[3]}</Text>
      </View>
    );
  };

  const renderBadges = () => {
    const badgesList = fetchedMeetup.badges.map((badge, index) => {
      return <BadgeLabel key={index} badge={badge} />;
    });

    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row' }}>
        {badgesList}
      </ScrollView>
    );
  };

  return (
    <View style={{ marginBottom: 10, paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        {renderDate(fetchedMeetup.startDateAndTime)}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 10, color: 'white' }}>
            {fetchedMeetup.title}
          </Text>
        </View>
      </View>
      {renderBadges()}
    </View>
  );
};

export default Header;
