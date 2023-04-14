import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import LibraryAssetContext from './LibraryAssetContext';
import Header from './Header';
import Asset from './Asset';
import Reactions from './Reactions';

const LibraryAssetContainer = () => {
  return (
    <View style={{}}>
      <Header />
      <Asset />
      <Reactions />
    </View>
  );
};

export default LibraryAssetContainer;
