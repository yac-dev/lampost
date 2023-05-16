import React, { useContext } from 'react';
import IconPickerContext from './IconPickerContext';
import { View, Text, TouchableOpacity } from 'react-native';
import { iconColorsTable, screenSectionBackgroundColor } from '../../../utils/colorsTable';

const FilterOptionTab = (props) => {
  const { selectedFilterOption } = useContext(IconPickerContext);
  return (
    <TouchableOpacity
      style={{
        // padding: 5,
        backgroundColor: selectedFilterOption === props.value ? iconColorsTable['blue1'] : null,
        borderRadius: 7,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
      }}
      onPress={() => props.onFilterOptionPress()}
    >
      {props.icon}
      {/* <MaterialCommunityIcons name='food' size={25} color={'white'} style={{ marginRight: 10 }} /> */}
      <Text numberOfLines={2} style={{ color: 'white', fontSize: 10, marginTop: 3 }}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};

export default FilterOptionTab;
