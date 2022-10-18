// main libraries
import React from 'react';
import { View, Text, Image } from 'react-native';
import FastImage from 'react-native-fast-image';

const Container = () => {
  return (
    <View>
      <Text>Here is gonna be memoirs</Text>
      <FastImage
        style={{ tintColor: 'blue', width: 25, height: 25 }}
        source={{
          uri: 'https://lampost-dev.s3.us-east-2.amazonaws.com/icons/sports/icons8-soccer-100.png',
          // headers: { Authorization: 'someAuthToken' },
          priority: FastImage.priority.normal,
        }}
        tintColor='red'
        // resizeMode={FastImage.resizeMode.contain}
      />
      <Image
        source={{ uri: 'https://lampost-dev.s3.us-east-2.amazonaws.com/icons/sports/icons8-soccer-100.png' }}
        style={{ tintColor: 'blue', width: 25, height: 25 }}
      />
    </View>
  );
};

export default Container;
