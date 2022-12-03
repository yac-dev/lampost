import React, { useContext } from 'react';
import LibraryContext from './LibraryContext';
import { View, Text, Image } from 'react-native';

const Assets = () => {
  const { assets } = useContext(LibraryContext);
  console.log(assets);

  const renderAssets = () => {
    if (assets.length) {
      const assetsList = assets.map((asset, index) => {
        return (
          <View key={index}>
            <Image source={{ uri: asset.data }} style={{ width: 50, height: 50 }} />
            <Text>{asset.type}</Text>
            <Text>{asset.data}</Text>
          </View>
        );
      });

      return <View>{assetsList}</View>;
    } else {
      return (
        <View>
          <Text>Now loading...</Text>
        </View>
      );
    }
  };

  return <View>{renderAssets()}</View>;
};

export default Assets;
