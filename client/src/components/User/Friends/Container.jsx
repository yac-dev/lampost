import React from 'react';
import { View, Text } from 'react-native';
import { baseBackgroundColor } from '../../../utils/colorsTable';
const Container = () => {
  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
      <Text>Container</Text>
    </View>
  );
};

export default Container;
