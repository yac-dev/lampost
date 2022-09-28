// main libraries
import React from 'react';
import { connect } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// components
import LogInOrSignUp from '../Auth/LogInOrSignUp';
import SignUp from '../Auth/SignUp';
import LogIn from '../Auth/LogIn';

import UserHome from '../User/Container';

const Auth = (props) => {
  // ここ注目ね。sighup後、page遷移する感じになる。
  if (props.auth.isAuthenticated) {
    // ここも、多分user pageにかんするnavigatorを使うことになるだろう。今はこれで置いておくけど。
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='My page'
          component={UserHome}
          initialParams={{ userId: props.auth.data._id }}
          options={{ headerShown: false }}
        >
          {/* {(props) => <UserHome {...props} user={props.auth.data} />} */}
        </Stack.Screen>
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
