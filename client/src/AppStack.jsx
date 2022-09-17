// main libraries
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { createNavigationContainerRef } from '@react-navigation/native';

const ref = createNavigationContainerRef();

// components
import BottomTabs from './components/Tabs/BottomTabs';

// ac
import { loadMe } from './redux/actionCreators/auth';

const AppStack = (props) => {
  const [routeName, setRouteName] = useState();
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
    // navigation containerに、どのrouteでどのcomponentを表示するかを書くのね。
    <NavigationContainer
      ref={ref}
      onReady={() => {
        setRouteName(ref.getCurrentRoute().name);
      }}
      onStateChange={async () => {
        const previousRouteName = routeName;
        const currentRouteName = ref.getCurrentRoute().name;
        setRouteName(currentRouteName);
      }}
    >
      {/* <Stack.Navigator>
          <Stack.Screen name='Map' component={Map} options={{ headerShown: false }} />
          <Stack.Screen name='Post' component={Post} options={{ headerShown: false }} />
          <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name='LogIn' component={LogIn} options={{ headerShown: false }} />
        </Stack.Navigator> */}
      <BottomTabs routeName={routeName} />
      {/* <Stack.Navigator>
          <Stack.Screen name='SignUp' component={SignUp} />
          <Stack.Screen name='LogIn' component={LogIn} />

        </Stack.Navigator> */}
    </NavigationContainer>
  );
};

export default connect(null, { loadMe })(AppStack);
