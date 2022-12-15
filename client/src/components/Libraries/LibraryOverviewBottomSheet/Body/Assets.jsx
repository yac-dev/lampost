import React, { useContext } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import LibrariesContext from '../../LibrariesContext';
import { baseTextColor } from '../../../../utils/colorsTable';
import FastImage from 'react-native-fast-image';

const Assets = () => {
  const { selectedLibrary, libraryAssets } = useContext(LibrariesContext);
  const oneAssetWidth = Dimensions.get('window').width / 2;

  const renderAssets = () => {
    if (libraryAssets.length) {
      const assetsList = libraryAssets.map((asset, index) => {
        return (
          <TouchableOpacity key={index} style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={{
                uri: asset.data,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        );
      });
      return <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{assetsList}</View>;
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
