import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AssetsContext from './AssetsContext';
import FastImage from 'react-native-fast-image';
import ImageView from 'react-native-image-viewing';
import { baseBackgroundColor } from '../../utils/colorsTable';

const Container = (props) => {
  const [images, setImages] = useState();
  // useEffect(() => {
  //   setImages
  // },[])
  const renderUserAssets = () => {
    const assetsList = props.assets.map((asset, index) => {
      return (
        // このheight undefinedが効く。なぜか分からんが。
        <TouchableOpacity
          key={index}
          style={{ width: '50%', height: undefined, aspectRatio: 1, paddingRight: 5, paddingBottom: 5 }}
          onPress={() => props.onPressAsset(asset._id)}
        >
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
    return <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: 5, paddingTop: 5 }}>{assetsList}</View>;
  };

  return <ScrollView style={{ flex: 1, backgroundColor: baseBackgroundColor }}>{renderUserAssets()}</ScrollView>;
};

export default Container;
