import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import AssetContext from '../AssetContext';
import lampostAPI from '../../../../apis/lampost';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';
import { baseBackgroundColor } from '../../../../utils/colorsTable';

import AppMenuBottomSheet from './AppMenuBottomSheet/Container';

const Asset = (props) => {
  const { auth } = useContext(GlobalContext);
  const [asset, setAsset] = useState(null);
  const [isMyPage, setIsMyPage] = useState(null);
  const appMenuBottomSheetRef = useRef(null);

  // useEffect(() => {
  //   if (auth.data && props.route.params.userId === auth.data._id) {
  //     setIsMyPage(true);
  //   } else {
  //     setIsMyPage(false);
  //   }
  // }, []);

  // const getAsset = async () => {
  //   const result = await lampostAPI.get(`/assets/${props.route.params.assetId}`);
  //   const { asset } = result.data;

  //   setAsset(asset);
  // };
  // useEffect(() => {
  //   getAsset();
  // }, []);

  const renderAsset = () => {
    // if()
    return (
      <View
        style={{ width: '100%', height: undefined, aspectRatio: 1 }}
        // onPress={() => props.onPressAsset(asset._id)}
      >
        <FastImage
          style={{ width: '100%', height: '100%' }}
          source={{
            uri: asset.data,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    );
  };

  return <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>{renderAsset()}</View>;
};

export default Asset;
