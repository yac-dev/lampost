import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import LogContext from '../LogContext';
import Header from './Header';
import Body from './Body';
import { baseTextColor } from '../../../../utils/colorsTable';

const Container = () => {
  return (
    <View style={{ borderBottomWidth: 0.3, padding: 10, borderBottomColor: baseTextColor }}>
      <Header />
      <Body />
      <View style={{ flexDirection: 'row', marginBottom: 15 }}>
        <Text style={{ color: baseTextColor, marginRight: 10 }}>👍 21</Text>
        <Text style={{ color: baseTextColor, marginRight: 10 }}>🤔 3</Text>
        <Text style={{ color: baseTextColor }}>😂 10</Text>
      </View>
    </View>
  );
};

export default Container;
