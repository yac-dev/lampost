// main libraries
import React from 'react';
import { connect } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// components
import UserHome from '../User/Home/Container';

const UserPageNavigator = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Welcome' component={UserHome} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(UserPageNavigator);
