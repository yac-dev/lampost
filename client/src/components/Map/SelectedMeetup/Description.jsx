import React from 'react';
import { View, Text } from 'react-native';
import { baseBackgroundColor } from '../../../utils/colorsTable';

const Description = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
      <Text style={{ color: 'white', fontSize: 17 }}>{props.route.params.description}</Text>
    </View>
  );
};

export default Description;
