import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import LibrariesContext from '../../LibrariesContext';

import Header from './Header';

const Container = () => {
  const { selectedLibrary } = useContext(LibrariesContext);

  if (selectedLibrary) {
    return <Header />;
  } else {
    return (
      <View>
        <Text>Now loading...</Text>
      </View>
    );
  }
};

export default Container;
