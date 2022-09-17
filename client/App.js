// main libraries
// import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import BottomTabs from './src/components/Tabs/BottomTabs';
import LogInOrSignUp from './src/components/Auth/LogInOrSignUp';
import AppStack from './src/AppStack';

// ac
import { loadMe } from './src/redux/actionCreators/auth';

const Stack = createNativeStackNavigator();

const App = () => {
  // useEffect(() => {
  //   const getJWTToken = async () => {
  //     const jwtToken = await SecureStore.getItemAsync('secure_token');
  //     if (jwtToken) {
  //       props.loadMe(jwtToken);
  //     }
  //   };
  //   getJWTToken();
  // }, []);

  return (
    <Provider store={store}>
      <PaperProvider>
        <StatusBar hidden={false} translucent={true} />
        {/* <NavigationContainer> */}
        {/* <Stack.Navigator>
          <Stack.Screen name='Map' component={Map} options={{ headerShown: false }} />
          <Stack.Screen name='Post' component={Post} options={{ headerShown: false }} />
          <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name='LogIn' component={LogIn} options={{ headerShown: false }} />
        </Stack.Navigator> */}
        {/* <BottomTabs /> */}
        {/* <Stack.Navigator>
          <Stack.Screen name='SignUp' component={SignUp} />
          <Stack.Screen name='LogIn' component={LogIn} />

        </Stack.Navigator> */}
        {/* </NavigationContainer> */}
        <AppStack />
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
