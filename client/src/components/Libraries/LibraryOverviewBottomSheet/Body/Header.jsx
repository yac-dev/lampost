import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import LibrariesContext from '../../LibrariesContext';
import { baseTextColor } from '../../../../utils/colorsTable';

const Header = () => {
  const { selectedLibrary } = useContext(LibrariesContext);
  return (
    <View style={{ marginBottom: 25 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 15, color: 'white' }}>{selectedLibrary.name}</Text>
      <Text style={{ color: baseTextColor }}>{selectedLibrary.description}</Text>
    </View>
  );
};

export default Header;
