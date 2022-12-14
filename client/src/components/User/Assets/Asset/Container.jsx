import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import AssetContext from '../AssetContext';
import lampostAPI from '../../../../apis/lampost';
import FastImage from 'react-native-fast-image';
import { baseBackgroundColor } from '../../../../utils/colorsTable';

import AppMenuBottomSheet from './AppMenuBottomSheet/Container';

const Asset = (props) => {
  const { auth } = useContext(GlobalContext);
  const [asset, setAsset] = useState(null);
  const [isMyPage, setIsMyPage] = useState(null);
  const appMenuBottomSheetRef = useRef(null);

  useEffect(() => {
    if (auth.data && props.route.params.userId === auth.data._id) {
      setIsMyPage(true);
    } else {
      setIsMyPage(false);
    }
  }, []);

  const getAsset = async () => {
    const result = await lampostAPI.get(
      `/assetanduserrelationships/${props.route.params.assetId}/${props.route.params.userId}`
    );
    const { asset } = result.data;

    setAsset(asset);
  };
  useEffect(() => {
    getAsset();
  }, []);

  console.log(asset);

  const renderAsset = () => {
    if (asset) {
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
    } else {
      return (
        <View>
          <Text>Now loading...</Text>
        </View>
      );
    }
  };

  return (
    <AssetContext.Provider value={{ appMenuBottomSheetRef, isMyPage, asset }}>
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        {renderAsset()}
        <AppMenuBottomSheet />
        <Text>Add reaction</Text>
      </View>
    </AssetContext.Provider>
  );
};

export default Asset;
