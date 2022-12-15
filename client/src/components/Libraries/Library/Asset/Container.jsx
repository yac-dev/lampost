import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import lampostAPI from '../../../../apis/lampost';
import FastImage from 'react-native-fast-image';
import { baseBackgroundColor, backgroundColorsTable, iconColorsTable } from '../../../../utils/colorsTable';
import ActionButton from '../../../Utils/ActionButton';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Asset = (props) => {
  const { auth } = useContext(GlobalContext);
  const [asset, setAsset] = useState(null);
  const [isMyPage, setIsMyPage] = useState(null);

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
    // <AssetContext.Provider value={{ appMenuBottomSheetRef, isMyPage, asset }}>
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
      <View style={{ width: '100%', height: undefined, aspectRatio: 1, marginBottom: 25 }}>
        <FastImage
          style={{ width: '100%', height: '100%' }}
          source={{
            uri: props.route.params.asset.data,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingRight: 20 }}>
        <ActionButton
          label='Add new reaction'
          backgroundColor={iconColorsTable['blue1']}
          icon={<Entypo name='emoji-happy' color={'white'} size={20} />}
          onActionButtonPress={() => console.log('add reaction')}
        />
      </View>
    </View>
  );
};

export default Asset;
