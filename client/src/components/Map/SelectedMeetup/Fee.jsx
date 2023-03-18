import React from 'react';
import { View, Text } from 'react-native';
import { baseBackgroundColor } from '../../../utils/colorsTable';

const Fee = (props) => {
  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: baseBackgroundColor }}>
      <Text style={{ color: 'white' }}>{props.route.params.isFeeFree}</Text>
    </View>
  );
};

export default Fee;
