import React, { useContext } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import LibrariesContext from '../../LibrariesContext';
import { baseTextColor } from '../../../../utils/colorsTable';

import Header from './Header';
import ActionButtons from './ActionButtons';
import BadgeLabels from './BadgeLabels';
import Menus from './Menus';
import Assets from './Assets';

const Container = () => {
  const { selectedLibrary } = useContext(LibrariesContext);

  if (selectedLibrary) {
    return (
      // <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
      <>
        <Header />
        <BadgeLabels />
        <ActionButtons />
        <Menus />
        {/* <Assets /> */}
      </>
      // </ScrollView>
    );
  } else {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
};

export default Container;
