import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import LibrariesContext from '../../LibrariesContext';

const Header = () => {
  const { selectedLibrary } = useContext(LibrariesContext);
  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 15 }}>{selectedLibrary.name}</Text>
      <Text>{selectedLibrary.description}</Text>
    </View>
  );
};

export default Header;
