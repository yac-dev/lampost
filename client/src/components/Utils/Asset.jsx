import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';
import { baseBackgroundColor } from '../../utils/colorsTable';

const Asset = (props) => {
  const renderAsset = () => {
    if (props.route.params.assetType === 'photo') {
      return (
        <FastImage
          style={{ width: '100%', height: '100%' }}
          source={{
            uri: props.route.params.assetData,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.stretch}
        />
      );
    } else if (props.route.params.assetType === 'video') {
      return (
        <Video
          style={{ width: '100%', height: '100%' }}
          source={{
            uri: props.route.params.assetData,
          }}
          // useNativeControls
          shouldPlay={true}
          resizeMode='stretch'
          isLooping={true}
        />
      );
    }
  };

  return <View style={{ backgroundColor: baseBackgroundColor, flex: 1 }}>{renderAsset()}</View>;
};

export default Asset;
