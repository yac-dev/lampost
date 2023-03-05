import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import AssetsContext from './AssetsContext';
import lampostAPI from '../../../apis/lampost';
import FastImage from 'react-native-fast-image';
import { Video, AVPlaybackStatus } from 'expo-av';
import { baseBackgroundColor, baseTextColor } from '../../../utils/colorsTable';

const Container = (props) => {
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

  const onAssetPress = (assetId) => {
    props.navigation.navigate('Asset', { assetId, userId: props.route.params.userId });
  };

  const renderUserAssets = () => {
    if (assets.length) {
      const assetsList = assets.map((asset, index) => {
        if (asset.type === 'photo') {
          return (
            // このheight undefinedが効く。なぜか分からんが。
            // <TouchableOpacity
            //   key={index}
            //   style={{ width: '50%', height: undefined, aspectRatio: 1, paddingRight: 5, paddingBottom: 5 }}
            //   onPress={() => onAssetPress(asset._id)}
            // >
            <TouchableOpacity
              key={index}
              style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
              // onPress={() => onAssetPress(asset._id)}
              // ここ、直さないとな。。。
            >
              <FastImage
                style={{ width: '100%', height: '100%', borderRadius: 7 }}
                source={{
                  uri: asset.data,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.stretch}
              />
            </TouchableOpacity>
          );
        } else if (asset.type === 'video') {
          return (
            <TouchableOpacity
              key={index}
              style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
              // onPress={() => onAssetPress(asset._id)}
              // ここ、直さないとな。。。
            >
              <Video
                style={{ width: '100%', height: '100%', borderRadius: 7 }}
                source={{
                  uri: asset.data,
                }}
                useNativeControls
                resizeMode='stretch'
                isLooping
              />
            </TouchableOpacity>
          );
        }
      });
      return <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{assetsList}</View>;
    } else {
      return (
        <Text style={{ color: baseTextColor, textAlign: 'center', paddingTop: 30 }}>
          You'll all the assets of this user.
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
