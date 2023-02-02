import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import lampostAPI from '../../../apis/lampost';
import FastImage from 'react-native-fast-image';
import { baseBackgroundColor, baseTextColor } from '../../../utils/colorsTable';
import Asset from './Asset';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Container = (props) => {
  const { auth } = useContext(GlobalContext);
  const [assets, setAssets] = useState([]);
  const [addedAsset, setAddedAsset] = useState(null);
  const oneAssetWidth = Dimensions.get('window').width / 2;

  console.log(addedAsset);

  const onPostPress = async () => {
    const result = await lampostAPI.post(`/libraryandassetrelationships/${props.route.params.libraryId}`, {
      assetId: addedAsset._id,
    });
    props.navigation.navigate('Library', { addedAsset });
  };

  useEffect(() => {
    if (props.route.params.fromComponent === 'ADD_ASSET_FOR_POSTING') {
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => onPostPress()}>
            <Text style={{ color: 'white', fontSize: 20 }}>Post</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [addedAsset]);

  useEffect(() => {
    if (props.route.params.fromComponent === 'ADD_ASSETS_FOR_LAUNCHING_LIBRARY') {
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => onDoneAddAssetsPress()}>
            <Text style={{ color: 'white', fontSize: 20 }}>Done</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [addedAsset]);
  const onDoneAddAssetsPress = () => {
    props.navigation.navigate('Libraries', { addedAsset });
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

  const renderUserAssets = () => {
    if (assets.length) {
      const assetsList = assets.map((asset, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
            onPress={() => setAddedAsset(asset)}
          >
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={{
                uri: asset.data,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.stretch}
            />
            {renderCheck(asset)}
          </TouchableOpacity>
        );
      });
      return <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 5 }}>{assetsList}</View>;
    } else {
      return <Text style={{ color: baseTextColor, textAlign: 'center' }}>Fetching datas now ...</Text>;
    }
  };

  return <ScrollView style={{ flex: 1, backgroundColor: baseBackgroundColor }}>{renderUserAssets()}</ScrollView>;
};

export default Container;
