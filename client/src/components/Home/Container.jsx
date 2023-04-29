import React from 'react';
import { View, Text } from 'react-native';
import { baseBackgroundColor } from '../../utils/colorsTable';
import MyMeetups from './Meetups/Container';
import MyLibraries from './Libraries/Container';

const Container = () => {
  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
      <MyMeetups />
      <MyLibraries />
    </View>
  );
};

export default Container;
