import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import lampostAPI from '../../../../apis/lampost';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';
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
import { iconsTable } from '../../../../utils/icons';

const Asset = (props) => {
  const { MaterialCommunityIcons, Ionicons } = iconsTable;
  const { auth, setSnackBar } = useContext(GlobalContext);
  const win = Dimensions.get('window');
  const [asset, setAsset] = useState(null);

  // const getAsset = async () => {
  //   const result = await lampostAPI.get(`/assets/${props.route.params.assetId}`);
  //   const { asset } = result.data;
  //   setAsset(asset);
  // };
  // useEffect(() => {
  //   getAsset();
  // }, []);
  // console.log(asset);

  const renderTaggedPeople = () => {
    if (asset.taggedPeople.length) {
      const list = asset.taggedPeople.map((user, index) => {
        return (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 5 }}>
            <FastImage
              style={{ width: 40, height: 40, borderRadius: 5, marginRight: 10 }}
              source={{ uri: user.photo }}
            />
            <Ionicons name='pricetag' size={15} color={'white'} style={{ position: 'absolute', top: -8, right: 3 }} />
            {/* <Text style={{ color: 'white' }}>{user.name}</Text> */}
          </View>
        );
      });

      return <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>;
    } else {
      return null;
    }
  };
  console.log(asset);

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
          // color: 'orange',
          color: 'white',
          fontStyle: 'italic',
        }}
      >
        {dateElements[2]}&nbsp;&nbsp;{dateElements[0]}&nbsp;&nbsp;{dateElements[1]}
      </Text>
    );
  };

  const renderAsset = () => {
    if (props.route.params.assetType === 'photo') {
      return (
        <View>
          <FastImage
            style={{ width: '100%', height: '100%', borderRadius: 10 }}
            source={{ uri: props.route.params.assetData }}
          />
        </View>
      );
    } else if (props.route.params.assetType === 'video') {
      return (
        <View>
          <Video
            style={{ width: '100%', height: '100%' }}
            source={{
              uri: props.route.params.assetData,
            }}
            useNativeControls={true}
            resizeMode='stretch'
            isLooping={true}
          />
        </View>
      );
    }
  };

  return <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>{renderAsset()}</View>;
};

export default Asset;
