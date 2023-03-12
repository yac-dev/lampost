import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { baseBackgroundColor } from '../../../../utils/colorsTable';
import lampostAPI from '../../../../apis/lampost';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';
import Thumbnail from '../../../Utils/Thumbnail';

const Container = (props) => {
  const [assets, setAssets] = useState([]);
  const [isFetchedAssets, setIsFetchedAssets] = useState(false);

  const getMeetupAssets = async () => {
    const result = await lampostAPI.get(`/assets/meetup/${props.route.params.meetupId}`);
    const { assets } = result.data;
    setAssets(assets);
    setIsFetchedAssets(true);
  };
  useEffect(() => {
    getMeetupAssets();
  }, []);

  const onAssetPress = (asset) => {
    if (asset.type === 'photo') {
      props.navigation.navigate('Asset', { assetData: asset.data, assetType: asset.type, assetId: asset._id });
    } else if (asset.type === 'video') {
      props.navigation.navigate('Asset', { assetData: asset.data, assetType: asset.type, assetId: asset._id });
    }
  };

  const renderMeetupAssets = () => {
    if (assets.length) {
      // const assetsList = assets.map((asset, index) => {
      //   return <Thumbnail key={index} asset={asset} onAssetPress={() => onAssetPress(asset)} />;
      // });
      // return (
      //   <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      //     <ScrollView horizontal={true}>{assetsList}</ScrollView>
      //   </View>
      // );
      return (
        <FlatList
          data={assets}
          numColumns={2}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          renderItem={({ item }) => {
            return <Thumbnail asset={item} onAssetPress={() => onAssetPress(item)} />;
          }}
        />
      );
    } else {
      return <Text style={{ color: 'white', textAlign: 'center' }}>You'll see all the assets of this meetup.</Text>;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
      {isFetchedAssets ? renderMeetupAssets() : <ActivityIndicator />}
    </View>
  );
};

export default Container;
