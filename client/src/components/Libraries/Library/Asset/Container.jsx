import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import AssetContext from './AssetContext';
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
import AssetMenuBottomSheet from './AssetMenuBottomSheet';

const Asset = (props) => {
  const { auth, setSnackBar } = useContext(GlobalContext);
  const win = Dimensions.get('window');
  const assetMenuBottomSheetRef = useRef(null);
  const [asset, setAsset] = useState(props.route.params.asset);

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

  const renderAsset = () => {
    if (props.route.params.assetType === 'photo') {
      return <FastImage style={{ width: '100%', height: '100%', borderRadius: 10 }} source={{ uri: asset.data }} />;
    } else if (props.route.params.assetType === 'video') {
      return (
        <Video
          style={{ width: '100%', height: '100%' }}
          source={{
            uri: asset.data,
          }}
          useNativeControls={true}
          resizeMode='stretch'
          isLooping={true}
        />
      );
    }
  };

  return (
    <AssetContext.Provider value={{ assetMenuBottomSheetRef, asset, navigation: props.navigation }}>
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>{renderAsset()}</View>
    </AssetContext.Provider>
  );
};

export default Asset;
