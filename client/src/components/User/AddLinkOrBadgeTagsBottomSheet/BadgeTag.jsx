import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { baseTextColor, iconColorsTable } from '../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BadgeTag = (props) => {
  const [selected, setSelected] = useState(false);
  console.log(props.selectedBadgeTags);

  if (selected) {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: iconColorsTable['green1'],
          borderWidth: 0.3,
          borderColor: iconColorsTable['green1'],
          padding: 5,
          marginRight: 10,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
        }}
        onPress={() => {
          props.setSelectedBadgeTags((previous) => {
            const updating = { ...previous };
            delete updating[props.badgeTag._id];
            return updating;
          });
          setSelected((previous) => !previous);
        }}
      >
        <MaterialCommunityIcons name='tag' size={25} color='white' style={{ marginRight: 10 }} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontWeight: 'bold', marginRight: 5 }}>{props.badgeTag.name}</Text>
          <Text style={{ color: baseTextColor }}>&#40;{props.badgeTag.totalHolders}&#41;</Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          borderWidth: 0.3,
          borderColor: baseTextColor,
          padding: 5,
          marginRight: 10,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          // marginBottom: 15,
          marginBottom: 10,
        }}
        onPress={() => {
          props.setSelectedBadgeTags((previous) => {
            return {
              ...previous,
              [props.badgeTag._id]: props.badgeTag,
            };
          });
          setSelected((previous) => !previous);
        }}
      >
        <MaterialCommunityIcons name='tag' size={25} color='white' style={{ marginRight: 10 }} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontWeight: 'bold', marginRight: 5 }}>{props.badgeTag.name}</Text>
          <Text style={{ color: baseTextColor }}>&#40;{props.badgeTag.totalHolders}&#41;</Text>
        </View>
      </TouchableOpacity>
    );
  }
};

export default BadgeTag;
