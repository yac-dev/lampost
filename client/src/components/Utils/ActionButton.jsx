import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { rnDefaultBackgroundColor } from '../../utils/colorsTable';

const ActionButton = (props) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 10,
        // backgroundColor: rnDefaultBackgroundColor,
        width: 200,
        marginRight: 10,
      }}
      onPress={() => props.onActionButtonPress()}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: props.backgroundColor,
          padding: 15,
          borderRadius: 10,
        }}
      >
        {props.icon}
        <Text style={{ color: 'white', marginLeft: 10 }}>{props.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ActionButton;
