import React, { useContext, useMemo } from 'react';
import UserContext from '../../UserContext';
import { View } from 'react-native';
import Header from './Header';
import Links from './Links';
import BadgeTags from './BadgeTags';
import Communities from './Communities';

const Container = (props) => {
  return (
    <View>
      <Header />
      <Links />
      <BadgeTags />
      <Communities />
    </View>
  );
};

export default Container;
