import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import LibrariesContext from '../../LibrariesContext';

const Header = () => {
  const { selectedLibrary } = useContext(LibrariesContext);
  return (
    <View>
      <Text>{selectedLibrary.name}</Text>
    </View>
  );
};

export default Header;
