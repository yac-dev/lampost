import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import lampostAPI from '../../../apis/lampost';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';
import { baseBackgroundColor, iconColorsTable } from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';

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

const Assets = (props) => {
  const { Ionicons } = iconsTable;
  const { isIpad } = useContext(GlobalContext);
  const [assets, setAssets] = useState([]);
  const [isFetchedAssets, setIsFetchedAssets] = useState(false);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 4 : Dimensions.get('window').width / 2;

  const getAssetsByLibraryId = async () => {
    const result = await lampostAPI.get(`/libraryandassetrelationships/${props.route.params.libraryId}/assets`);
    const { assets } = result.data;
    setAssets(assets);
    setIsFetchedAssets(true);
  };
  useEffect(() => {
    getAssetsByLibraryId();
  }, []);

  const renderItem = useCallback((asset) => {
    if (asset.type === 'photo') {
      return (
        <View style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}>
          <FastImage
            style={{ width: '100%', height: '100%', borderRadius: 7 }}
            source={{
              uri: asset.data,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.stretch}
          />
          <View style={{ position: 'absolute', top: 10, right: 10 }}>
            <Ionicons name='camera' size={25} color={'white'} />
          </View>
        </View>
      );
    } else if (asset.type === 'video') {
      return (
        <View style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}>
          <Video
            style={{ width: '100%', height: '100%', borderRadius: 7 }}
            source={{
              uri: asset.data,
            }}
            useNativeControls={false}
            resizeMode='stretch'
            isLooping={false}
          />
          <View style={{ position: 'absolute', top: 10, right: 10 }}>
            <Ionicons name='videocam' size={25} color={iconColorsTable[videoTypesTable[asset.effect]]} />
          </View>
        </View>
      );
    }
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
      {!isFetchedAssets ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          numColumns={2}
          data={assets}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
};

export default Assets;
