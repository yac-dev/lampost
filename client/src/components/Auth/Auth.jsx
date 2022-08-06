// main libraries
import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// components
import UserPage from './UserPage';
import LogInOrSignUp from './LogInOrSignUp';
import SignUp from './SignUp';
import LogIn from './LogIn';

const Auth = (props) => {
  if (props.auth.data) {
    return <UserPage />;
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen name='LogInOrSignUp' component={LogInOrSignUp} options={{ headerShown: false }} />
        <Stack.Screen name='SignUp' component={SignUp} />
        {/* <Stack.Screen name='LogIn' component={LogIn} /> */}
        <Stack.Screen name='LogIn' component={LogIn} />
      </Stack.Navigator>
    );
  }
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Auth);
