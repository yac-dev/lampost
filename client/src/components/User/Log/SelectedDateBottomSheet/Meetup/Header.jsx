import React, { useContext, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import LogContext from '../../LogContext';
import MeetupContext from './MeetupContext';
import {
  backgroundColorsTable,
  iconColorsTable,
  rnDefaultBackgroundColor,
  inputBackgroundColorNew,
} from '../../../../../utils/colorsTable';
import FastImage from 'react-native-fast-image';
import BadgeLabel from '../../../../Utils/BadgeLabel';

const Header = () => {
  const { selectedDate } = useContext(LogContext);
  const { meetupObject } = useContext(MeetupContext);
  console.log(meetupObject);
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

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
    });
    const dateElements = d.split(' ');

    return (
      <View
        style={{
          flexDirection: 'column',
          width: 50,
          height: 50,
          backgroundColor: inputBackgroundColorNew,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 15,
              color: 'white',
            }}
          >
            {dateElements[0]}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 22,
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {dateElements[1]}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        {renderDate(meetupObject.createdAt)}
        <View>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>
            {meetupObject.meetup.title}
          </Text>
          <FlatList
            horizontal={true}
            data={meetupObject.meetup.badges}
            renderItem={({ item }) => renderBadge(item)}
            keyExtractor={(item, index) => `${item._id}-${index}`}
          />
        </View>
      </View>
      <View></View>
    </View>
  );
};

export default Header;
