import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

const Asset = (props) => {
  return (
    <TouchableOpacity
      key={index}
      style={{ width: '50%', height: undefined, aspectRatio: 1, paddingRight: 5, paddingBottom: 5 }}
    >
      <FastImage
        style={{ width: '100%', height: '100%' }}
        source={{
          uri: props.asset.data,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </TouchableOpacity>
  );
};

export default Asset;
