// main libraries
// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNavigationContainerRef } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import store from './src/redux/store';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// components
import Map from './src/components/Map/Map';
import Post from './src/components/Post/Post';
import SignUp from './src/components/Auth/SignUp';
import LogIn from './src/components/Auth/LogIn';
import LogInOrSignUp from './src/components/Auth/LogInOrSignUp';
import AppBottomTabsNavigator from './src/AppBottomTabsNavigator';

// ac
import { loadMe } from './src/redux/actionCreators/auth';

const Stack = createNativeStackNavigator();
const ref = createNavigationContainerRef();

const App = () => {
  const [routeName, setRouteName] = useState();

  const getJWTToken = async () => {
    const jwtToken = await SecureStore.getItemAsync('secure_token');
    if (jwtToken) {
      console.log(jwtToken);
      props.loadMe(jwtToken);
    }
  };

  useEffect(() => {
    // getJWTToken();
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider>
        <StatusBar hidden={false} translucent={true} />
        <AppBottomTabsNavigator />
      </PaperProvider>
    </Provider>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
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
