import React from 'react';
import { View, Text } from 'react-native';
import { iconColorsTable } from '../../../../../utils/colorsTable';
import { FontAwesome5 } from '@expo/vector-icons';

const Header = () => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
      <View
        style={{
          backgroundColor: iconColorsTable['violet1'],
          padding: 5,
          borderRadius: 7,
          width: 35,
          height: 35,
          alignItems: 'center',
        }}
      >
        <FontAwesome5 name='user-astronaut' size={25} color='white' />
      </View>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 15 }}>People</Text>
    </View>
  );
};

export default Header;
