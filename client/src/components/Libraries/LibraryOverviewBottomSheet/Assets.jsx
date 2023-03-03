import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import lampostAPI from '../../../apis/lampost';
import FastImage from 'react-native-fast-image';
import { baseBackgroundColor } from '../../../utils/colorsTable';

const Assets = (props) => {
  const { isIpad } = useContext(GlobalContext);
  const [assets, setAssets] = useState([]);
  const [isFetchedAssets, setIsFetchedAssets] = useState(false);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 4 : Dimensions.get('window').width / 2;

  const getAssetsByLibraryId = async () => {
    const result = await lampostAPI.get(`/libraryandassetrelationships/${props.route.params.libraryId}`);
    const { assets } = result.data;
    setAssets(assets);
    setIsFetchedAssets(true);
  };
  useEffect(() => {
    getAssetsByLibraryId();
  }, []);

  const renderItem = useCallback((asset) => {
    return (
      <View style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}>
        <FastImage
          style={{ width: '100%', height: '100%', borderRadius: 7 }}
          source={{
            uri: asset.data,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.stretch}
        />
      </View>
    );
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
      {!isFetchedAssets ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          numColumns={2}
          data={assets}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
};

export default Assets;
