import React, { useContext } from 'react';
import UserContext from '../../Context';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  baseTextColor,
  rnDefaultBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
} from '../../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActionButton from '../../../Utils/ActionButton';

const Header = () => {
  const { pressedBadgeData, isMyPage } = useContext(UserContext);

  const renderActionButtons = () => {
    if (isMyPage) {
      return (
        <View style={{ justifyContent: 'flex-start' }}>
          <ActionButton
            icon={<MaterialCommunityIcons name='plus' size={20} color={'white'} />}
            backgroundColor={iconColorsTable['blue1']}
            onActionButtonPress={() => console.log('selectiong')}
            label='Add url'
          />
          <ActionButton
            icon={<MaterialCommunityIcons name='plus' size={20} color={'white'} />}
            backgroundColor={iconColorsTable['blue1']}
            onActionButtonPress={() => console.log('selectiong')}
            label='Add tags'
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text>Hello</Text>
        </View>
      );
    }
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <View
        style={{
          width: 120, // さらにbadgeを覆う必要がある。textも含めた守備範囲が必要だ。
          height: 120,
          // backgroundColor: 'red',
          alignItems: 'center',
          // justifyContent: 'center', // これで、verticallyにもcenterにする。
        }}
      >
        <View
          style={{
            backgroundColor: rnDefaultBackgroundColor,
            width: 85,
            height: 85,
            borderRadius: 10,
            marginBottom: 5,
          }}
        >
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center', // これと
              justifyContent: 'center', // これで中のimageを上下左右真ん中にする
              borderRadius: 10,
              backgroundColor: backgroundColorsTable[pressedBadgeData.badge.color],
              borderColor: backgroundColorsTable[pressedBadgeData.badge.color],
              borderWidth: 0.3,
            }}
          >
            <FastImage
              style={{ width: 65, height: 65 }}
              source={{
                uri: pressedBadgeData.badge.icon,
                priority: FastImage.priority.normal,
              }}
              tintColor={iconColorsTable[pressedBadgeData.badge.color]}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontWeight: 'bold',
            // alignSelf: 'center',
            fontSize: 12,
            textAlign: 'center',
            color: baseTextColor,
          }}
        >
          {pressedBadgeData.badge.name}
        </Text>
      </View>
      {renderActionButtons()}
    </View>
  );
};

export default Header;
