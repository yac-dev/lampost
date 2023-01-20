import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';

const PostAssets = (props) => {
  const win = Dimensions.get('window');
  const [selectedAsset, setSelectedAsset] = useState(props.assets[0]);

  const renderAssetOptions = () => {
    const list = props.assets.map((asset, index) => {
      return (
        <TouchableOpacity key={index} onPress={() => setSelectedAsset(asset)}>
          <FastImage
            style={{ width: 100, aspectRatio: 1, borderRadius: 7, marginRight: 10 }}
            source={{ uri: asset.data }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>
      );
    });

    return <View style={{ flexDirection: 'row' }}>{list}</View>;
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <FastImage
        style={{ flex: 1, alignSelf: 'stretch', width: win.width, height: win.height, borderRadius: 10 }}
        source={{ uri: selectedAsset.data }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 50 }}>
        {renderAssetOptions()}
      </ScrollView>
    </View>
  );
};

export default PostAssets;
