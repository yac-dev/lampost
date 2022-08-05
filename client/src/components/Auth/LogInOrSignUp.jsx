// main libraries
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// components
import SignUp from './SignUp';
import LogIn from './LogIn';
const Stack = createNativeStackNavigator();

const LogInOrSignUp = () => {
  return (
    // <View>
    //   <Text>LogIn or SignUp</Text>
    // </View>
    <SafeAreaView>
      <Text>Lampost</Text>
      <Stack.Navigator>
        <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name='LogIn' component={LogIn} />
        {/* <Stack.Screen name='LogIn' component={LogIn} options={{ headerShown: false }} /> */}
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default LogInOrSignUp;
