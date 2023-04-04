import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { baseBackgroundColor, rnDefaultBackgroundColor } from '../../../utils/colorsTable';
import FastImage from 'react-native-fast-image';

const images = ['https://lampost-dev.s3.us-east-2.amazonaws.com/icons/animes.png'];

const Icons = () => {
  return (
    <View style={{ backgroundColor: baseBackgroundColor, flex: 1, padding: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            width: 65,
            height: 65,
            backgroundColor: rnDefaultBackgroundColor,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FastImage
            source={{ uri: 'https://lampost-dev.s3.us-east-2.amazonaws.com/icons/animes.png' }}
            style={{ width: 50, height: 50, color: 'black' }}
          />
        </TouchableOpacity>
        <Text style={{ color: 'white' }}>Dragon ball</Text>
      </View>
    </View>
  );
};

export default Icons;
