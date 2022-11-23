import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import LibrariesContext from '../../LibrariesContext';

import Header from './Header';
import ActionButtons from './ActionButtons';
import Menus from './Menus/Container';
import Rolls from './Rolls/Container';

const Container = () => {
  const { selectedLibrary } = useContext(LibrariesContext);

  if (selectedLibrary) {
    return (
      <View>
        <Header />
        <ActionButtons />
        <Menus />
        <Rolls />
      </View>
    );
  } else {
    return (
      <View>
        <Text>Now loading...</Text>
      </View>
    );
  }
};

export default Container;
