import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Video } from 'expo-av';

const VideoAsset = (props) => {
  const [asset, setAsset] = useState(null);
  const [isFetchedAsset, setIsFetchedAsset] = useState(false);
  return (
    <View>
      <Video
        style={{ width: '100%', height: '100%' }}
        source={{
          uri: props.assetData,
        }}
        useNativeControls={true}
        resizeMode='stretch'
        isLooping={true}
      />
    </View>
  );
};

export default VideoAsset;
