import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, ActivityIndicator, ScrollView, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import { baseBackgroundColor, iconColorsTable } from '../../../../utils/colorsTable';
import lampostAPI from '../../../../apis/lampost';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';
import Thumbnail from '../../../Utils/Thumbnail';
import { iconsTable } from '../../../../utils/icons';

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

const Container = (props) => {
  const { Ionicons, MaterialCommunityIcons } = iconsTable;
  const { auth, isIpad } = useContext(GlobalContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 4 : Dimensions.get('window').width / 2;
  const [assets, setAssets] = useState([]);
  const [isFetchedAssets, setIsFetchedAssets] = useState(false);

  const getMeetupAssets = async () => {
    const result = await lampostAPI.get(`/assets/meetup/${props.route.params.meetupId}`);
    const { assets } = result.data;
    setAssets(assets);
    setIsFetchedAssets(true);
  };
  useEffect(() => {
    getMeetupAssets();
  }, []);

  const onAssetPress = (asset) => {
    if (asset.type === 'photo') {
      props.navigation.navigate('Asset', { assetData: asset.data, assetType: asset.type, assetId: asset._id });
    } else if (asset.type === 'video') {
      props.navigation.navigate('Asset', { assetData: asset.data, assetType: asset.type, assetId: asset._id });
    }
  };

  const renderItem = useCallback((asset) => {
    if (asset.type === 'photo') {
      return (
        <TouchableOpacity
          style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
          onPress={() => {
            // props.navigation.navigate('Asset', {
            //   asset: asset,
            //   libraryId: props.route.params.libraryId,
            //   assetType: asset.type,
            // });
            onAssetPress(asset);
          }}
        >
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
        </TouchableOpacity>
      );
    } else if (asset.type === 'video') {
      return (
        <TouchableOpacity
          style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
          onPress={() => {
            // props.navigation.navigate('Asset', {
            //   asset: asset,
            //   libraryId: props.route.params.libraryId,
            //   assetType: asset.type,
            // });
            onAssetPress(asset);
          }}
        >
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
        </TouchableOpacity>
      );
    }
  }, []);

  const renderMeetupAssets = () => {
    if (assets.length) {
      return (
        <FlatList
          data={assets}
          numColumns={2}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          renderItem={({ item }) => {
            return renderItem(item);
          }}
        />
      );
    } else {
      return <Text style={{ color: 'white', textAlign: 'center' }}>You'll see all the assets of this meetup.</Text>;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
      {isFetchedAssets ? renderMeetupAssets() : <ActivityIndicator />}
    </View>
  );
};

export default Container;
