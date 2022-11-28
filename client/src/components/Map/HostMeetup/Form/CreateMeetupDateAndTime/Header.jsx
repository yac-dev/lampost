import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { iconColorsTable } from '../../../../../utils/colorsTable';

const Header = () => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
      <View
        style={{
          backgroundColor: iconColorsTable['blue1'],
          padding: 5,
          borderRadius: 7,
          width: 35,
          height: 35,
          alignItems: 'center',
        }}
      >
        <MaterialCommunityIcons name='calendar-clock' size={25} color='white' />
      </View>
      <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 15, color: 'white' }}>Date and Time</Text>
    </View>
  );
};

export default Header;
