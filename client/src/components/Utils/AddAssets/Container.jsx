import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import lampostAPI from '../../../apis/lampost';
import FastImage from 'react-native-fast-image';
import { baseBackgroundColor } from '../../../utils/colorsTable';
import Asset from './Asset';
import { AntDesign } from '@expo/vector-icons';

const Container = (props) => {
  const { auth } = useContext(GlobalContext);
  const [assets, setAssets] = useState([]);
  const [addedAssets, setAddedAssets] = useState({});

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => onPostPress()}>
          <Text style={{ color: 'white' }}>Post</Text>
        </TouchableOpacity>
      ),
    });
  }, [addedAssets]);
  const onPostPress = () => {
    // postを押したらapi requestで、ここのrollにassetのobjectをpostする感じか。
    // assetsだけのdataを作って、propsで送る感じか。
    const addedAssetsData = Object.values(addedAssets);
    props.navigation.navigate('Library', { addedAssetsData });
  };

  const getAssetsByUserId = async () => {
    const result = await lampostAPI.get(`/assetanduserrelationships/${auth.data._id}`);
    const { assets } = result.data;
    setAssets(assets);
  };
  useEffect(() => {
    getAssetsByUserId();
  }, []);

  const onAssetPress = (asset) => {
    if (addedAssets[asset._id]) {
      setAddedAssets((previous) => {
        const updating = { ...previous };
        delete updating[asset._id];
        return updating;
      });
    } else {
      setAddedAssets((previous) => {
        return { ...previous, [asset._id]: asset };
      });
    }
  };

  const renderUserAssets = () => {
    const assetsList = assets.map((asset, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={{ width: '50%', height: undefined, aspectRatio: 1, paddingRight: 5, paddingBottom: 5 }}
          onPress={() => onAssetPress(asset)}
        >
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={{
              uri: asset.data,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          {addedAssets[asset._id] ? (
            <View
              style={{
                top: -10,
                right: 0,
                position: 'absolute',
                color: '#989898',
              }}
            >
              <AntDesign name='check' size={25} color='#49CF13' />
            </View>
          ) : null}
        </TouchableOpacity>
      );
    });
    return <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: 5, paddingTop: 5 }}>{assetsList}</View>;
  };

  return <ScrollView style={{ flex: 1, backgroundColor: baseBackgroundColor }}>{renderUserAssets()}</ScrollView>;
};

export default Container;
