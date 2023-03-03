import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import AssetContext from './AssetContext';
import lampostAPI from '../../../../apis/lampost';
import FastImage from 'react-native-fast-image';
import {
  baseBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
  screenSectionBackgroundColor,
  rnDefaultBackgroundColor,
} from '../../../../utils/colorsTable';
import ActionButton from '../../../Utils/ActionButton';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import AssetMenuBottomSheet from './AssetMenuBottomSheet';

const Asset = (props) => {
  const { auth, setSnackBar } = useContext(GlobalContext);
  const win = Dimensions.get('window');
  const assetMenuBottomSheetRef = useRef(null);
  const [asset, setAsset] = useState(props.route.params.asset);
  const [badgeLikes, setBadgeLikes] = useState(null);

  // data structure
  //  {
  //    { reaction1: {_id: reaction1, content: 'Nice e', totalCounts: 3,
  //    users: {user1: {_id: user1, name: 'a'}, {user2: {_id: user2, name: 'b'}}} },
  //    { reaction2: {_id: reaction2, content: 'Great e', totalCounts: 5,
  //     users: {user3: {_id: user3, name: 'c'}}
  //    ,}
  //   }

  // const getAssetAndBadgeAndUserRelationships = async () => {
  //   const result = await lampostAPI.get(`/assetandbadgeanduserrelationships/${props.route.params.asset._id}`);
  //   const { table, asset } = result.data;
  //   setBadgeLikes(table);
  //   setAsset(asset);
  // };
  // useEffect(() => {
  //   getAssetAndBadgeAndUserRelationships();
  // }, []);

  // <FastImage
  //       style={{ flex: 1, alignSelf: 'stretch', width: win.width, height: win.height, borderRadius: 10 }}
  //       source={{ uri: selectedAsset.data }}
  //       resizeMode={FastImage.resizeMode.contain}
  //     />

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const dateElements = d.split('/');

    return (
      <Text
        style={{
          fontSize: 17,
          color: 'orange',
          fontStyle: 'italic',
        }}
      >
        {dateElements[2]}&nbsp;&nbsp;{dateElements[0]}&nbsp;&nbsp;{dateElements[1]}
      </Text>
    );
  };

  return (
    <AssetContext.Provider value={{ assetMenuBottomSheetRef, asset, navigation: props.navigation }}>
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        <FastImage
          style={{ width: '100%', height: '100%', borderRadius: 10 }}
          source={{ uri: asset.data }}
          // resizeMode={FastImage.resizeMode.contain}
        />
        {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
          {asset.createdBy.photo ? (
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Image
                source={{ uri: asset.createdBy.photo }}
                style={{ width: 35, height: 35, borderRadius: 7, marginRight: 10 }}
              />
              <Text style={{ color: 'white' }}>{asset.createdBy.name}</Text>
            </View>
          ) : (
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <FontAwesome5 name='user-astronaut' size={25} style={{ width: 35, height: 35, borderRadius: 7 }} />
              <Text style={{ color: 'white' }}>{asset.createdBy.name}</Text>
            </View>
          )}
          {renderDate(asset.createdAt)}
        </View> */}
        {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => assetMenuBottomSheetRef.current.snapToIndex(0)}
            style={{
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: screenSectionBackgroundColor,
              borderRadius: 15,
            }}
          >
            <MaterialCommunityIcons name='chevron-down' color={baseTextColor} size={25} />
          </TouchableOpacity>
        </View>
        <AssetMenuBottomSheet /> */}
      </View>
    </AssetContext.Provider>
  );
};

export default Asset;
