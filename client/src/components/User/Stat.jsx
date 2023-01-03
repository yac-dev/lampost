import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { baseTextColor, iconColorsTable, rnDefaultBackgroundColor } from '../../utils/colorsTable';

const Stat = (props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: rnDefaultBackgroundColor,
        marginRight: 20,
        width: 35,
        height: 35,
        borderRadius: 10,
      }}
      onPress={() => props.onStatPress()}
    >
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: props.backgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}
      >
        {props.icon}
      </View>
      <View
        style={{
          top: -8,
          right: -8,
          position: 'absolute',
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: rnDefaultBackgroundColor,
        }}
      >
        <View
          style={{
            backgroundColor: props.backgroundColor,
            width: '100%',
            height: '100%',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: 'white' }}>{props.total}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Stat;
