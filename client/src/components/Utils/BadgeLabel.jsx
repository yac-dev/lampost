import React, { useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import { View, Text, TouchableOpacity } from 'react-native';
import { rnDefaultBackgroundColor, iconColorsTable, backgroundColorsTable } from '../../utils/colorsTable';
import FastImage from 'react-native-fast-image';

const BadgeLabel = (props) => {
  const { isIpad } = useContext(GlobalContext);

  return (
    <View style={{ backgroundColor: rnDefaultBackgroundColor, marginRight: 10, borderRadius: isIpad ? 20 : 10 }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: isIpad ? 7 : 2,
          paddingBottom: isIpad ? 7 : 2,
          paddingRight: isIpad ? 20 : 10,
          paddingLeft: isIpad ? 10 : 5,
          backgroundColor: backgroundColorsTable[props.badge.color],
          borderRadius: isIpad ? 20 : 10,
        }}
      >
        <View
          style={{
            width: isIpad ? 60 : 30,
            height: isIpad ? 60 : 30,
            alignItems: 'center', // これと
            justifyContent: 'center', // これで中のimageを上下左右真ん中にする
          }}
        >
          <FastImage
            style={{ width: isIpad ? 50 : 20, height: isIpad ? 50 : 20 }}
            source={{
              uri: props.badge.icon,
              priority: FastImage.priority.normal,
            }}
            tintColor={iconColorsTable[props.badge.color]}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <Text style={{ color: iconColorsTable[props.badge.color], fontSize: isIpad ? 25 : 15 }}>
          {props.badge.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BadgeLabel;
