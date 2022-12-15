import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import LibrariesContext from '../../LibrariesContext';
import { baseTextColor } from '../../../../utils/colorsTable';

import Header from './Header';
import ActionButtons from './ActionButtons';
import Menus from './Menus';
import Assets from './Assets';

const Container = () => {
  const { selectedLibrary } = useContext(LibrariesContext);

  if (selectedLibrary) {
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <Header />
        <ActionButtons />
        <Menus />
        <Assets />
      </ScrollView>
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
