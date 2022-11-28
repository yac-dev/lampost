// main libraries
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import {
  iconColorsTable,
  backgroundColorsTable,
  rnDefaultBackgroundColor,
  baseTextColor,
} from '../../../../../../utils/colorsTable';

// icon
import { AntDesign } from '@expo/vector-icons';

// ac
import { removeBadge } from '../../../../../../redux/actionCreators/selectItem';

const Badge = (props) => {
  return (
    <View
      style={{
        width: 90, // さらにbadgeを覆う必要がある。textも含めた守備範囲が必要だ。
        height: 110,
        // backgroundColor: 'red',
        alignItems: 'center',
        // justifyContent: 'center', // これで、verticallyにもcenterにする。
      }}
    >
      <View
        style={{
          backgroundColor: rnDefaultBackgroundColor,
          width: 65,
          height: 65,
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
            backgroundColor: backgroundColorsTable[props.badge.color],
            borderColor: backgroundColorsTable[props.badge.color],
            borderWidth: 0.3,
          }}
        >
          <FastImage
            style={{ width: 45, height: 45 }}
            source={{
              uri: props.badge.icon,
              priority: FastImage.priority.normal,
            }}
            tintColor={iconColorsTable[props.badge.color]}
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
        {props.badge.name}
      </Text>
    </View>
  );
};

export default connect(null, { removeBadge })(Badge);
