// main libraries
// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import store from './src/redux/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

// components
import AppBottomTabsNavigator from './src/AppBottomTabsNavigator';
import MapNavigator from './src/components/Navigator/Map';
import Map from './src/components/Map/Container';

// ac
// import { loadMe } from './src/redux/actionCreators/auth'; // いや、やっぱここでは使えない。redux appはこっからprovideされるから。だから、appbottomでこれやっている。

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <StatusBar hidden={false} translucent={true} backgroundColor='blue' barStyle='light-content' />
        <AppBottomTabsNavigator />
      </PaperProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
