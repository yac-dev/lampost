// main libraries
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// react native elements
import { Button as RNEButton } from '@rneui/themed';

// components
import SignUp from './SignUp';
import LogIn from './LogIn';
const Stack = createNativeStackNavigator();

const LogInOrSignUp = (props) => {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerText}>Lampost</Text>
      </View>

      <Text style={styles.title}>Let's get right into new world!</Text>
      <View style={styles.buttons}>
        <RNEButton
          title={'Sign up'}
          containerStyle={{
            width: 300,
            borderRadius: 20,
          }}
          onPress={() => props.navigation.navigate('SignUp')}
        />
        <Text>Or</Text>
        <RNEButton
          title={'Login'}
          containerStyle={{
            width: 300,
            borderRadius: 20,
          }}
          onPress={() => props.navigation.navigate('LogIn')}
        />
      </View>
      {/* <Stack.Navigator>
        <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name='LogIn' component={LogIn} />
        <Stack.Screen name='LogIn' component={LogIn} options={{ headerShown: false }} />
      </Stack.Navigator> */}
    </SafeAreaView>
  );
};

export default LogInOrSignUp;

const styles = StyleSheet.create({
  header: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // position: 'absolute',
    // top: 80,
    // width: '100%',
    marginTop: 150,
  },
  headerText: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'Cochin',
  },
  title: {
    marginTop: 10,
    textAlign: 'center',
  },
  buttons: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
