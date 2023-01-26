import React from 'react';
import { View, Text } from 'react-native';
import { iconColorsTable } from '../../../../../utils/colorsTable';
import { MaterialIcons } from '@expo/vector-icons';

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
        <MaterialIcons name='groups' size={25} color='white' />
      </View>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 15, color: 'white' }}>People</Text>
    </View>
  );
};

export default Header;
