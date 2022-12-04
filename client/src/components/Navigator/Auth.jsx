// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// components
import LogInOrSignUp from '../Auth/LogInOrSignUp';
import SignUp from '../Auth/SignUp';
import LogIn from '../Auth/LogIn';

import UserHome from '../User/Container';
import Logs from '../User/Logs/Container';
import Assets from '../User/Assets/Container';
import Asset from '../User/Assets/Asset';
import { baseBackgroundColor, appBottomSheetBackgroundColor } from '../../utils/colorsTable';

const Auth = (props) => {
  if (props.auth.isAuthenticated) {
    return (
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name='Personal page'
            component={UserHome}
            initialParams={{ userId: props.auth.data._id }}
            options={{
              // headerShown: false,
              headerStyle: {
                backgroundColor: appBottomSheetBackgroundColor,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
            }}
          >
            {/*  これまた、別でuserhomeのcomponentがひちようだわな。connectionなりで、違うuser pageに飛んでいくから。*/}
          </Stack.Screen>
          <Stack.Screen
            name='Logs'
            component={Logs}
            options={{
              headerStyle: {
                backgroundColor: appBottomSheetBackgroundColor,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
              headerTintColor: 'white',
            }}
          ></Stack.Screen>
          <Stack.Screen name='Assets' component={Assets} />
          <Stack.Screen name='Asset' component={Asset} />
        </Stack.Group>
        <Stack.Group></Stack.Group>
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen name='LogInOrSignUp' component={LogInOrSignUp} options={{ headerShown: false }} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='LogIn' component={LogIn} />
      </Stack.Navigator>
    );
  }
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Auth);
