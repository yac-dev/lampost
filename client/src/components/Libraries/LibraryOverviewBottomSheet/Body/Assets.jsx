import React, { useContext } from 'react';
import { View, Text, Dimensions } from 'react-native';
import LibrariesContext from '../../LibrariesContext';
import { baseTextColor } from '../../../../utils/colorsTable';

const Assets = () => {
  const { selectedLibrary, libraryAssets } = useContext(LibrariesContext);
  const oneAssetWidth = Dimensions.get('window').width / 3;

  const renderAssets = () => {
    if (libraryAssets.length) {
      const assetsList = selectedLibrary.assets.map((asset, index) => {
        return (
          <View key={index}>
            <Text style={{ color: 'white' }}>Hello world</Text>
          </View>
        );
      });
      return <View>{assetsList}</View>;
    } else {
      return (
        <View>
          <Text style={{ color: 'white' }}>No assets here...</Text>
        </View>
      );
    }
  };

  return <View>{renderAssets()}</View>;
};

export default Assets;
