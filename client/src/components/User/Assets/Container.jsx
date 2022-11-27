import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import UserContext from '../Context';
import lampostAPI from '../../../apis/lampost';
import FastImage from 'react-native-fast-image';

import Assets from '../../Assets/Container';

const Container = (props) => {
  const [assets, setAssets] = useState([]);

  const getUserAssets = async () => {
    const result = await lampostAPI.get(`/users/${props.route.params.userId}/assets`);
    const { assets } = result.data;
    setAssets(assets);
  };
  useEffect(() => {
    getUserAssets();
  }, []);

  const onPressAsset = (assetId) => {
    props.navigation.navigate('Asset', { assetId });
  };

  return (
    <View style={{ flex: 1 }}>
      <Assets assets={assets} onPressAsset={onPressAsset} />
    </View>
  );
};

export default Container;
