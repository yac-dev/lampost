import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import lampostAPI from '../../../apis/lampost';
import FastImage from 'react-native-fast-image';
import { baseBackgroundColor, baseTextColor } from '../../../utils/colorsTable';
import Asset from './Asset';
import { AntDesign } from '@expo/vector-icons';

const Container = (props) => {
  const { auth } = useContext(GlobalContext);
  const [assets, setAssets] = useState([]);
  const [addedAssets, setAddedAssets] = useState({});
  const oneAssetWidth = Dimensions.get('window').width / 2;

  const onPostPress = async () => {
    // postを押したらapi requestで、ここのrollにassetのobjectをpostする感じか。
    // assetsだけのdataを作って、propsで送る感じか。
    const assets = Object.values(addedAssets);
    const payload = {
      assets,
    };
    // const result = await lampostAPI.post(`/libraryandassetrelationships/${props.route.params.libraryId}`, payload);
    props.navigation.navigate('Library', { addedAssets: assets });
  };

  useEffect(() => {
    if (props.route.params.fromComponent === 'ADD_ASSETS_FOR_POSTING') {
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => onPostPress()}>
            <Text style={{ color: 'white' }}>Add</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [addedAssets]);

  useEffect(() => {
    if (props.route.params.fromComponent === 'ADD_ASSETS_FOR_LAUNCHING_LIBRARY') {
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => onDoneAddAssetsPress()}>
            <Text style={{ color: 'white' }}>Done</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [addedAssets]);
  const onDoneAddAssetsPress = () => {
    props.navigation.navigate('Libraries', { addedAssets });
  };

  useEffect(() => {
    if (props.route.params?.addedAssets) {
      setAddedAssets((previous) => {
        return {
          ...previous,
          ...props.route.params.addedAssets,
        };
      });
    }
  }, []);

  const getAssetsByUserId = async () => {
    const result = await lampostAPI.post('/assets/', { userId: auth.data._id });
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
    if (assets.length) {
      const assetsList = assets.map((asset, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
            onPress={() => onAssetPress(asset)}
          >
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={{
                uri: asset.data,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.stretch}
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
      return <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 5 }}>{assetsList}</View>;
    } else {
      return <Text style={{ color: baseTextColor, textAlign: 'center' }}>Fetching datas now ...</Text>;
    }
  };

  return <ScrollView style={{ flex: 1, backgroundColor: baseBackgroundColor }}>{renderUserAssets()}</ScrollView>;
};

export default Container;
