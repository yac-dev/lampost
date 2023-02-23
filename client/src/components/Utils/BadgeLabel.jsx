import React, { useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import { View, Text, TouchableOpacity } from 'react-native';
import { rnDefaultBackgroundColor, iconColorsTable, backgroundColorsTable } from '../../utils/colorsTable';
import FastImage from 'react-native-fast-image';

const BadgeLabel = (props) => {
  const { isIpad } = useContext(GlobalContext);

  return (
    <View
      style={{
        backgroundColor: rnDefaultBackgroundColor,
        marginRight: 10,
        borderRadius: 5,
        height: 25,
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // paddingTop: 2,
          // paddingBottom: 2,
          paddingRight: 10,
          paddingLeft: 5,
          backgroundColor: backgroundColorsTable[props.badge.color],
          borderRadius: 5,
        }}
      >
        <View
          style={{
            width: 25,
            height: 25,
            alignItems: 'center', // これと
            justifyContent: 'center', // これで中のimageを上下左右真ん中にする
          }}
        >
          <FastImage
            style={{ width: 17, height: 17 }}
            source={{
              uri: props.badge.icon,
              priority: FastImage.priority.normal,
            }}
            tintColor={iconColorsTable[props.badge.color]}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <Text style={{ color: iconColorsTable[props.badge.color], fontSize: 15 }}>{props.badge.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BadgeLabel;
