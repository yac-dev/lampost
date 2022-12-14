import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { rnDefaultBackgroundColor } from '../../utils/colorsTable';
import FastImage from 'react-native-fast-image';

const BadgeLabel = (props) => {
  return (
    <View style={{ backgroundColor: rnDefaultBackgroundColor, marginRight: 10, borderRadius: 10 }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 2,
          paddingBottom: 2,
          paddingRight: 10,
          paddingLeft: 5,
          backgroundColor: props.badgeLableBackgroundColor,
          borderRadius: 10,
        }}
      >
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            alignItems: 'center', // これと
            justifyContent: 'center', // これで中のimageを上下左右真ん中にする
          }}
        >
          <FastImage
            style={{ width: 20, height: 20 }}
            source={{
              uri: props.badgeIcon,
              priority: FastImage.priority.normal,
            }}
            tintColor={props.badgeIconColor}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
        <Text style={{ color: props.labelTextColor }}>{props.labelText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BadgeLabel;
