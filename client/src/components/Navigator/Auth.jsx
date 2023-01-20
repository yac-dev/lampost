// main libraries
import React, { useState, useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// components
import LogInOrSignUp from '../Auth/Container';
import SignUp from '../Auth/SignUp';
import LogIn from '../Auth/LogIn';

import UserHome from '../User/Container';
import Launched from '../User/LaunchedMeetups/Container';
import LaunchedMeetup from '../User/LaunchedMeetups/LaunchedMeetup/Container';
import Patrons from '../User/Patrons/Container';
import Friends from '../User/Friends/Container';
import Logs from '../User/Logs/Container';
import Assets from '../User/Assets/Container';
import Asset from '../User/Assets/Asset/Container';
import AddBadges from '../Utils/AddBadges/Container';
import { baseBackgroundColor, appBottomSheetBackgroundColor } from '../../utils/colorsTable';

const Auth = (props) => {
  // ここらへん、一つにできるね。まあ、後で。
  const { auth } = useContext(GlobalContext);
  if (auth.data) {
    return (
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name='Profile'
            component={UserHome}
            initialParams={{ userId: auth.data._id }}
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
            name='Launched'
            component={Launched}
            options={{
              headerStyle: {
                backgroundColor: appBottomSheetBackgroundColor,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
              // headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name='Launched meetup'
            component={LaunchedMeetup}
            options={{
              headerStyle: {
                backgroundColor: appBottomSheetBackgroundColor,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
              // headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name='Patrons'
            component={Patrons}
            options={{
              headerStyle: {
                backgroundColor: appBottomSheetBackgroundColor,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
              // headerTintColor: 'white',
            }}
          />
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
              // headerTintColor: 'white',
            }}
          ></Stack.Screen>
          <Stack.Screen
            name='Assets'
            component={Assets}
            options={{
              headerStyle: {
                backgroundColor: appBottomSheetBackgroundColor,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
              // headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name='Asset'
            component={Asset}
            options={{
              headerStyle: {
                backgroundColor: appBottomSheetBackgroundColor,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
              // headerTintColor: 'white',
            }}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
          <Stack.Screen
            name='Add badges'
            component={AddBadges}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={{ color: 'white', fontSize: 20 }}>Cancel</Text>
                </TouchableOpacity>
              ),
              headerStyle: {
                backgroundColor: appBottomSheetBackgroundColor,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
              headerTintColor: 'white',
            })}
          />
        </Stack.Group>
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='LogInOrSignUp'
          component={LogInOrSignUp}
          options={{
            headerShown: true,
            title: 'Welcome to Lampost',
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name='Login'
          component={LogIn}
          options={{
            headerShown: true,
            title: 'Login',
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          }}
        />
        <Stack.Screen
          name='Signup'
          component={SignUp}
          options={{
            headerShown: true,
            title: 'Welcome to Lampost',
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          }}
        />
      </Stack.Navigator>
    );
  }
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Auth);
