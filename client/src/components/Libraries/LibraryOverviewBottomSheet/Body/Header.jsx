import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import LibrariesContext from '../../LibrariesContext';
import { baseTextColor } from '../../../../utils/colorsTable';
import { Ionicons } from '@expo/vector-icons';
import { iconColorsTable, rnDefaultBackgroundColor, backgroundColorsTable } from '../../../../utils/colorsTable';

import BadgeLabels from './BadgeLabels';

const Header = () => {
  const { isIpad } = useContext(GlobalContext);
  const { selectedLibrary } = useContext(LibrariesContext);
  return (
    <View style={{ marginBottom: 5 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>{selectedLibrary.title}</Text>
    </View>
  );
};

export default Header;
