import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import LibrariesContext from '../../LibrariesContext';
import { baseTextColor } from '../../../../utils/colorsTable';
import { Ionicons } from '@expo/vector-icons';
import { iconColorsTable, rnDefaultBackgroundColor, backgroundColorsTable } from '../../../../utils/colorsTable';

import BadgeLabels from './BadgeLabels';

const Header = () => {
  const { selectedLibrary } = useContext(LibrariesContext);
  return (
    <View style={{ marginBottom: 25, paddingLeft: 20, paddingRight: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <View
          style={{
            backgroundColor: rnDefaultBackgroundColor,
            width: 50,
            height: 50,
            borderRadius: 15,
            marginRight: 10,
          }}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: backgroundColorsTable[selectedLibrary.color],
              borderRadius: 15,
            }}
          >
            <Ionicons name='ios-library' size={30} color={iconColorsTable[selectedLibrary.color]} />
          </View>
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>{selectedLibrary.name}</Text>
      </View>
      <BadgeLabels />
    </View>
  );
};

export default Header;
