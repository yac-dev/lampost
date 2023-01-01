import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { baseTextColor } from '../../utils/colorsTable';

const Stat = (props) => {
  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', marginRight: 15, alignItems: 'center' }}
      onPress={() => props.onStatPress()}
    >
      {props.icon}
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: baseTextColor }}>{props.label}</Text>
        <Text style={{ color: baseTextColor }}>{props.value}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Stat;
