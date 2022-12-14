import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import LibrariesContext from '../../LibrariesContext';
import { baseTextColor } from '../../../../utils/colorsTable';

import Header from './Header';
import ActionButtons from './ActionButtons';
import Menus from './Menus/Container';
import Assets from './Assets';
import Rolls from './Rolls/Container';

const Container = () => {
  const { selectedLibrary } = useContext(LibrariesContext);

  if (selectedLibrary) {
    return (
      <View>
        <Header />
        {/* <ActionButtons /> */}
        <Menus />
        <Assets />
        {/* <Rolls /> */}
      </View>
    );
  } else {
    return (
      <View>
        <Text style={{ color: baseTextColor }}>Now loading...</Text>
      </View>
    );
  }
};

export default Container;
