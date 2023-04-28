import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { iconColorsTable, screenSectionBackgroundColor } from '../../../utils/colorsTable';

const BadgeGenre = (props) => {
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        backgroundColor: selectedFilterOption === props.value ? iconColorsTable['blue1'] : screenSectionBackgroundColor,
        justifyContent: 'center',
        borderRadius: 10,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={() => props.onFilterOptionPress()}
    >
      {props.icon}
      {/* <MaterialCommunityIcons name='food' size={25} color={'white'} style={{ marginRight: 10 }} /> */}
      <Text style={{ color: 'white' }}>{props.label}</Text>
    </TouchableOpacity>
  );
};

export default BadgeGenre;
