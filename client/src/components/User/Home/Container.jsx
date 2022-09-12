// main libraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// components
import Header from './Header';
import Badges from './Badges';
import Bio from './Bio';
import FABMenu from '../../Auth/Utils/FABMenu';

const Container = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Badges />
      <Bio />
      <FABMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default Container;
