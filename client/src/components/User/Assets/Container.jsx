import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import AssetsContext from './AssetsContext';
import lampostAPI from '../../../apis/lampost';
import FastImage from 'react-native-fast-image';
import { baseBackgroundColor } from '../../../utils/colorsTable';

const Container = (props) => {
  const { auth } = useContext(GlobalContext);
  const [isMyPage, setIsMyPage] = useState(null);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    if (auth.data && props.route.params.userId === auth.data._id) {
      setIsMyPage(true);
    } else {
      setIsMyPage(false);
    }
  }, []);

  const getAssetsByUserId = async () => {
    const result = await lampostAPI.get(`/assetanduserrelationships/${props.route.params.userId}`);
    const { assets } = result.data;
    setAssets(assets);
  };
  useEffect(() => {
    getAssetsByUserId();
  }, []);

  const onAssetPress = (assetId) => {
    props.navigation.navigate('Asset', { assetId, userId: props.route.params.userId });
  };

  const renderUserAssets = () => {
    const assetsList = assets.map((asset, index) => {
      return (
        // このheight undefinedが効く。なぜか分からんが。
        <TouchableOpacity
          key={index}
          style={{ width: '50%', height: undefined, aspectRatio: 1, paddingRight: 5, paddingBottom: 5 }}
          onPress={() => onAssetPress(asset._id)}
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

  return (
    <AssetsContext.Provider value={{ assets }}>
      <ScrollView style={{ flex: 1, backgroundColor: baseBackgroundColor }}>{renderUserAssets()}</ScrollView>
    </AssetsContext.Provider>
  );
};

export default Container;
