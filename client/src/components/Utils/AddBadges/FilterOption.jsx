import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { screenSectionBackgroundColor, iconColorsTable } from '../../../utils/colorsTable';
import AddBadgesContext from './AddBadgesContext';

const FilterOption = (props) => {
  const { selectedFilterOption, setSelectedFilterOption } = useContext(AddBadgesContext);
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        backgroundColor: selectedFilterOption === props.value ? iconColorsTable['blue1'] : screenSectionBackgroundColor,
        justifyContent: 'center',
        borderRadius: 7,
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

export default FilterOption;
