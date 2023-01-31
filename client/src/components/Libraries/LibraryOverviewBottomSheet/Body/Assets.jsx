import React, { useContext } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ScrollView, Platform } from 'react-native';
import LibrariesContext from '../../LibrariesContext';
import { baseTextColor } from '../../../../utils/colorsTable';
import FastImage from 'react-native-fast-image';

const Assets = () => {
  const { selectedLibrary, libraryAssets } = useContext(LibrariesContext);
  const isIpad = Platform.OS === 'ios' && (Platform.isPad || Platform.isTVOS);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 4 : Dimensions.get('window').width / 2;

  const renderAssets = () => {
    if (libraryAssets.length) {
      const assetsList = libraryAssets.map((asset, index) => {
        return (
          <TouchableOpacity key={index} style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}>
            <FastImage
              style={{ width: '100%', height: '100%', borderRadius: 7 }}
              source={{
                uri: asset.data,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.stretch}
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
