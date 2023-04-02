import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import AssetsContext from './AssetsContext';
import lampostAPI from '../../../apis/lampost';
import FastImage from 'react-native-fast-image';
import { Video, AVPlaybackStatus } from 'expo-av';
import { baseBackgroundColor, baseTextColor, iconColorsTable } from '../../../utils/colorsTable';
import Thumbnail from '../../Utils/Thumbnail';
import { iconsTable } from '../../../utils/icons';

const Container = (props) => {
  const { Ionicons } = iconsTable;
  const { auth, isIpad } = useContext(GlobalContext);
  const [isMyPage, setIsMyPage] = useState(null);
  const [assets, setAssets] = useState([]);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 4 : Dimensions.get('window').width / 2;

  useEffect(() => {
    if (auth.data && props.route.params.userId === auth.data._id) {
      setIsMyPage(true);
    } else {
      setIsMyPage(false);
    }
  }, []);

  const getAssetsByUserId = async () => {
    const result = await lampostAPI.get(`/assets/createdby/${props.route.params.userId}`);
    const { assets } = result.data;
    setAssets(assets);
  };
  useEffect(() => {
    getAssetsByUserId();
  }, []);

  const onAssetPress = (asset) => {
    if (asset.type === 'photo') {
      props.navigation.navigate('Asset', { assetData: asset.data, assetType: asset.type });
    } else if (asset.type === 'video') {
      props.navigation.navigate('Asset', { assetData: asset.data, assetType: asset.type });
    }
  };

  const renderUserAssets = () => {
    if (assets.length) {
      const assetsList = assets.map((asset, index) => {
        return <Thumbnail key={index} asset={asset} onAssetPress={() => onAssetPress(asset)} />;
      });
      return <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{assetsList}</View>;
    } else {
      return (
        <Text style={{ color: baseTextColor, textAlign: 'center', paddingTop: 30 }}>
          You'll see all the assets of this user😀
        </Text>
      );
    }
  };

  return (
    <AssetsContext.Provider value={{ assets }}>
      <ScrollView style={{ flex: 1, backgroundColor: baseBackgroundColor }}>{renderUserAssets()}</ScrollView>
    </AssetsContext.Provider>
  );
};

export default Container;
