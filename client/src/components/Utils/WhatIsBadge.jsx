import React from 'react';
import { View, Text } from 'react-native';
import { baseBackgroundColor, baseTextColor } from '../../utils/colorsTable';

const WhatIsBadge = () => {
  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 23, marginBottom: 20 }}>About badge</Text>
      <Text style={{ color: 'white' }}>
        You can think Badge as #tag of today's social medias. You are gonna add tag yourself such as your hobbies, jobs,
        skills, favorite songs, foods etc and can connect like-minded people easily. Instaed of using thousand of #
        marks, you use an icon to represent your topic. You can enjoy expressing yourself and also seeing other people's
        profile😎
      </Text>
    </View>
  );
};

export default WhatIsBadge;
