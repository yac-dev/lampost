import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { baseTextColor } from '../../utils/colorsTable';

const Stat = (props) => {
  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', padding: 5, marginRight: 10, alignItems: 'center' }}
      onPress={() => props.onStatPress()}
    >
      {/* <MaterialCommunityIcons name='history' color={baseTextColor} size={25} style={{ marginRight: 10 }} /> */}
      {props.icon}
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: baseTextColor }}>{props.label}</Text>
        <Text style={{ color: baseTextColor }}>{props.value}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Stat;
