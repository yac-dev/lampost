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
import Log from '../User/Log/Container';

const Auth = (props) => {
  if (props.auth.isAuthenticated) {
    // ここも、多分user pageにかんするnavigatorを使うことになるだろう。今はこれで置いておくけど。
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='Personal page'
          component={UserHome}
          initialParams={{ userId: props.auth.data._id }}
          // options={{ headerShown: false }}
        >
          {/*  これまた、別でuserhomeのcomponentがひちようだわな。connectionなりで、違うuser pageに飛んでいくから。*/}
        </Stack.Screen>
        <Stack.Screen name='Log' component={Log}></Stack.Screen>
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
