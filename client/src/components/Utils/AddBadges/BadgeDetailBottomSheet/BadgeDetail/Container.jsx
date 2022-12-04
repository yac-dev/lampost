import React, { useContext } from 'react';
import AddBadgesContext from '../../AddBadgesContext';
import { View, Text } from 'react-native';
import Header from './Header';
import BadgeHolders from './BadgeHolders';

const Container = () => {
  return (
    <View>
      <Header />
      <BadgeHolders />
    </View>
  );
};

export default Container;
