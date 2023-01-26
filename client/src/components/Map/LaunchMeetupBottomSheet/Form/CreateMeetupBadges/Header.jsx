import React from 'react';
import { View, Text } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { iconColorsTable } from '../../../../../utils/colorsTable';
const Header = () => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
      <View
        style={{
          backgroundColor: iconColorsTable['lightGreen1'],
          padding: 5,
          borderRadius: 7,
          width: 35,
          height: 35,
          alignItems: 'center',
        }}
      >
        <Foundation name='sheriff-badge' size={25} color='white' />
      </View>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 15, color: 'white' }}>Badges</Text>
    </View>
  );
};

export default Header;
