import React, { useContext, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import LogContext from '../../LogContext';
import MeetupContext from './MeetupContext';
import { backgroundColorsTable, iconColorsTable, rnDefaultBackgroundColor } from '../../../../../utils/colorsTable';
import FastImage from 'react-native-fast-image';
import BadgeLabel from '../../../../Utils/BadgeLabel';

const Header = () => {
  const { selectedDate } = useContext(LogContext);
  const { meetupObject } = useContext(MeetupContext);

  const renderBadge = useCallback((badge) => {
    return (
      // <View style={{ width: 50, height: 60, backgroundColor: 'red' }}>
      //   <TouchableOpacity style={{ width: 35, height: 35, backgroundColor: rnDefaultBackgroundColor, borderRadius: 7 }}>
      //     <View
      //       style={{
      //         width: '100%',
      //         height: '100%',
      //         justifyContent: 'center',
      //         alignItems: 'center',
      //         borderRadius: 7,
      //         backgroundColor: backgroundColorsTable[badge.color],
      //       }}
      //     >
      //       <FastImage
      //         style={{ width: 30, height: 30 }}
      //         source={{ uri: badge.icon }}
      //         tintColor={iconColorsTable[badge.color]}
      //       />
      //     </View>
      //   </TouchableOpacity>
      // </View>
      <BadgeLabel badge={badge} />
    );
  }, []);

  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        {meetupObject.meetup.title}
      </Text>
      <View>
        <FlatList
          horizontal={true}
          data={meetupObject.meetup.badges}
          renderItem={({ item }) => renderBadge(item)}
          keyExtractor={(item, index) => `${item._id}-${index}`}
        />
      </View>
    </View>
  );
};

export default Header;
