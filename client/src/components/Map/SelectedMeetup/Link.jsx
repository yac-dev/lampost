import React from 'react';
import { View, Text } from 'react-native';
import { baseBackgroundColor } from '../../../utils/colorsTable';

const Link = () => {
  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
      <Text style={{ color: 'white' }}>link here</Text>
    </View>
  );
};

export default Link;
