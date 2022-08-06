// main libraries
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

// components
import BottomTabs from './components/Tabs/BottomTabs';

// ac
import { loadMe } from './redux/actionCreators/auth';

const AppStack = (props) => {
  useEffect(() => {
    const getJWTToken = async () => {
      const jwtToken = await SecureStore.getItemAsync('secure_token');
      if (jwtToken) {
        console.log(jwtToken);
        props.loadMe(jwtToken);
      }
    };
    getJWTToken();
  }, []);

  return (
    <NavigationContainer>
      {/* <Stack.Navigator>
          <Stack.Screen name='Map' component={Map} options={{ headerShown: false }} />
          <Stack.Screen name='Post' component={Post} options={{ headerShown: false }} />
          <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name='LogIn' component={LogIn} options={{ headerShown: false }} />
        </Stack.Navigator> */}
      <BottomTabs />
      {/* <Stack.Navigator>
          <Stack.Screen name='SignUp' component={SignUp} />
          <Stack.Screen name='LogIn' component={LogIn} />

        </Stack.Navigator> */}
    </NavigationContainer>
  );
};

export default connect(null, { loadMe })(AppStack);
