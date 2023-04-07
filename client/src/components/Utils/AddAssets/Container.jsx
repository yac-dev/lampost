import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import lampostAPI from '../../../apis/lampost';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';
import {
  baseBackgroundColor,
  baseTextColor,
  screenSectionBackgroundColor,
  iconColorsTable,
} from '../../../utils/colorsTable';
import Asset from './Asset';
import { AntDesign } from '@expo/vector-icons';
import LoadingSpinner from '../../Utils/LoadingSpinner';
import Thumbnail from '../Thumbnail';
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

const Container = (props) => {
  const { Ionicons, MaterialCommunityIcons, Foundation } = iconsTable;
  const { auth, setLoading } = useContext(GlobalContext);
  const [assets, setAssets] = useState([]);
  const [addedAsset, setAddedAsset] = useState(null);
  const oneAssetWidth = Dimensions.get('window').width / 2;

  console.log(addedAsset);

  const onPostPress = async () => {
    setLoading(true);
    const result = await lampostAPI.post(`/libraryandassetrelationships/${props.route.params.libraryId}`, {
      assetId: addedAsset._id,
    });
    setLoading(false);
    props.navigation.navigate('Library', { addedAsset });
  };

  useEffect(() => {
    if (props.route.params.fromComponent === 'ADD_ASSET_FOR_POSTING') {
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => onPostPress()} disabled={addedAsset ? false : true}>
            <Text style={{ color: addedAsset ? 'white' : screenSectionBackgroundColor, fontSize: 20 }}>Post</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [addedAsset]);

  useEffect(() => {
    if (props.route.params.fromComponent === 'ADD_ASSETS_FOR_LAUNCHING_LIBRARY') {
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => onDoneAddAssetsPress()} disabled={addedAsset ? false : true}>
            <Text style={{ color: addedAsset ? 'white' : screenSectionBackgroundColor, fontSize: 20 }}>Done</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [addedAsset]);
  const onDoneAddAssetsPress = () => {
    props.navigation.navigate('Create new library', { addedAsset });
  };

  // これは、libraryをlaunchする時の場合ね。向こうからassetがくるから。
  useEffect(() => {
    if (props.route.params?.addedAsset) {
      setAddedAsset(props.route.params.addedAsset);
    }
  }, []);

  const getAssetsByUserId = async () => {
    const result = await lampostAPI.get(`/assets/createdby/${auth.data._id}`, { userId: auth.data._id });
    const { assets } = result.data;
    setAssets(assets);
  };
  useEffect(() => {
    getAssetsByUserId();
  }, []);

  const renderCheck = (asset) => {
    if (addedAsset && addedAsset._id === asset._id) {
      return (
        <View
          style={{
            top: 0,
            right: 0,
            position: 'absolute',
          }}
        >
          <Ionicons name='checkmark-circle' size={30} color='#49CF13' />
        </View>
      );
    } else {
      null;
    }
  };

  const disableVideo = () => {
    if (props.route.params.assetType === 'photo' || props.route.params.assetType === 'photoAndVideo') {
      return false;
    } else {
      return true;
    }
  };

  const disablePhoto = () => {
    if (props.route.params.assetType === 'video' || props.route.params.assetType === 'photoAndVideo') {
      return false;
    } else return true;
  };

  const renderDisablePhoto = () => {
    if (props.route.params.assetType === 'video') {
      return (
        <View style={{ position: 'absolute', top: 10, right: 10 }}>
          <Foundation name='prohibited' size={25} color={'red'} />
        </View>
      );
    } else {
      return null;
    }
  };

  const renderDisableVideo = () => {
    if (props.route.params.assetType === 'photo') {
      return (
        <View style={{ position: 'absolute', top: 10, right: 10 }}>
          <Foundation name='prohibited' size={25} color={'red'} />
        </View>
      );
    } else {
      return null;
    }
  };

  const renderUserAssets = () => {
    if (assets.length) {
      const assetsList = assets.map((asset, index) => {
        if (asset.type === 'photo') {
          return (
            <TouchableOpacity
              style={{
                width: oneAssetWidth,
                height: oneAssetWidth,
                padding: 2,
              }}
              onPress={() => setAddedAsset(asset)}
              key={index}
              disabled={disableVideo()}
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
              {renderCheck(asset)}
              {renderDisablePhoto()}
            </TouchableOpacity>
          );
        } else if (asset.type === 'video') {
          return (
            <TouchableOpacity
              style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
              onPress={() => setAddedAsset(asset)}
              key={index}
              disabled={disablePhoto()}
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
              {renderCheck(asset)}
              {renderDisableVideo()}
            </TouchableOpacity>
          );
        }
      });
      return <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 5 }}>{assetsList}</View>;
    } else {
      return <Text style={{ color: baseTextColor, textAlign: 'center' }}>Fetching datas now ...</Text>;
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
      {renderUserAssets()}
      <LoadingSpinner />
    </ScrollView>
  );
};

export default Container;
