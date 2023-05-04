import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import GlobalContext from '../../GlobalContext';
import { iconsTable } from '../../utils/icons';
import FastImage from 'react-native-fast-image';
import { Video, AVPlaybackStatus } from 'expo-av';
import { backgroundColorsTable, iconColorsTable } from '../../utils/colorsTable';

const videoTypesTable = {
  normal: 'none',
  olive: 'green1',
  ocean: 'blue1',
  camel: 'red1',
  sepia: 'yellow1',
};

const cameraTypesTable = {
  normal: '',
};

const Thumbnail = (props) => {
  const { Ionicons } = iconsTable;
  const { auth, isIpad } = useContext(GlobalContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 4 : Dimensions.get('window').width / 2;
  const [isLoadingAsset, setIsLoadingAsset] = useState(false);

  if (props.asset.type === 'photo') {
    return (
      <View
        style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
        // onPress={() => props.onAssetPress()}
      >
        <FastImage
          style={{ width: '100%', height: '100%', borderRadius: 7 }}
          source={{
            uri: props.asset.data,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.stretch}
          onLoadStart={(e) => setIsLoadingAsset(true)}
          // onLoad={(e) => alert('onLoad')}
          onLoadEnd={(e) => setIsLoadingAsset(false)}
        />
        <View style={{ position: 'absolute', top: 10, right: 10 }}>
          <Ionicons name='camera' size={25} color={'white'} />
        </View>
      </View>
    );
  } else if (props.asset.type === 'video') {
    return (
      <View
        style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
        // onPress={() => props.onAssetPress()}
      >
        <Video
          style={{ width: '100%', height: '100%', borderRadius: 7 }}
          source={{
            uri: props.asset.data,
          }}
          useNativeControls={false}
          resizeMode='stretch'
          isLooping={false}
          onLoadStart={() => setIsLoadingAsset(true)}
          onLoadEnd={() => setIsLoadingAsset(false)}
        />
        <View style={{ position: 'absolute', top: 10, right: 10 }}>
          <Ionicons name='videocam' size={25} color={iconColorsTable[videoTypesTable[props.asset.effect]]} />
        </View>
      </View>
    );
  }
};

export default Thumbnail;
