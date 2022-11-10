import React from 'react';
import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { iconColorsTable } from '../../../../../utils/colorsTable';

const Header = () => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
      <View
        style={{
          backgroundColor: iconColorsTable['red1'],
          padding: 5,
          borderRadius: 7,
          width: 35,
          height: 35,
          alignItems: 'center',
        }}
      >
        <AntDesign name='edit' size={25} color='white' />
      </View>
      <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 15 }}>Date and Time</Text>
    </View>
  );
};

export default Header;
