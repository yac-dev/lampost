// main libraries
import React, { useState, useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import { Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// components
import LogInOrSignUp from '../Auth/Container';
import SignUp from '../Auth/SignUp';
import LogIn from '../Auth/LogIn';
import EULA from '../Auth/EULA';
import AddBadgeTags from '../User/AddBadgeTags/Container';
import EmojiPicker from '../User/AddBadgeTags/EmojiPicker';
import IconPicker from '../Utils/IconPicker/Container';
import CreateBadge from '../User/CreateBadge/Container';

import User from '../User/Container';
import Meetups from '../User/Meetups/Container';
import Attended from '../User/Log/Members';
import Assets from '../User/Assets/Container';
// import Asset from '../Utils/Asset';
import Asset from '../User/Meetups/Assets/Asset';
import MeetupAssets from '../User/Log/Snaps';
import Impressions from '../User/Meetups/Impressions/Container';
import AddBadges from '../Utils/AddBadges/Container';
// import WhatIsBadge from '../Utils/WhatIsBadge';
import { baseBackgroundColor, appBottomSheetBackgroundColor } from '../../utils/colorsTable';
import DeleteAccount from '../User/DeleteAccount';
import MyFriends from '../User/MyFriends/Container';
import LogContainer from '../User/Log/Container';

const Auth = (props) => {
  // ここらへん、一つにできるね。まあ、後で。
  const { auth } = useContext(GlobalContext);
  if (auth.data) {
    return (
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name='Profile'
            component={User}
            initialParams={{ userId: auth.data._id }}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: appBottomSheetBackgroundColor,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
              headerTintColor: 'white',
              // headerLeft: () => (
              //   <TouchableOpacity onPress={() => props.navigation.goBack()}>
              //     <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
              //   </TouchableOpacity>
              // ),
            }}
          >
            {/*  これまた、別でuserhomeのcomponentがひちようだわな。connectionなりで、違うuser pageに飛んでいくから。*/}
          </Stack.Screen>
          <Stack.Screen
            name='Assets'
            component={Assets}
            options={{
              title: 'Snaps',
              headerStyle: {
                backgroundColor: appBottomSheetBackgroundColor,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
              headerTintColor: 'white',
              // headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name='Asset'
            component={Asset}
            options={{
              title: 'Snap',
              headerTransparent: true,
              // headerStyle: {
              //   backgroundColor: appBottomSheetBackgroundColor,
              // },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name='Delete my account'
            component={DeleteAccount}
            options={{
              headerStyle: {
                backgroundColor: appBottomSheetBackgroundColor,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
              headerTintColor: 'white',
              // headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name='Meetups'
            component={Meetups}
            options={{
              headerStyle: {
                backgroundColor: appBottomSheetBackgroundColor,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
              headerTintColor: 'white',
              // headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name='My friends'
            component={MyFriends}
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
          />
          <Stack.Screen
            name='User'
            component={User}
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
          />
          <Stack.Screen
            name='Attended'
            component={Attended}
            options={{
              headerStyle: {
                backgroundColor: appBottomSheetBackgroundColor,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
              headerTintColor: 'white',
              // headerTintColor: 'white',
            }}
          />

          <Stack.Screen
            name='Meetup assets'
            component={MeetupAssets}
            options={{
              headerStyle: {
                backgroundColor: appBottomSheetBackgroundColor,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
              headerTintColor: 'white',
              // headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name='My log'
            component={LogContainer}
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
          />
          <Stack.Screen
            name='Impressions'
            component={Impressions}
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
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
          <Stack.Screen
            name='Add badges'
            component={AddBadges}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
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
          <Stack.Screen
            name='Add badge tags'
            component={AddBadgeTags}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
                </TouchableOpacity>
              ),
              headerStyle: {
                backgroundColor: appBottomSheetBackgroundColor,
              },
              headerTitle: '',
              headerTintColor: 'white',
            })}
          />
          <Stack.Screen
            name='Create badge'
            component={CreateBadge}
            options={({ navigation }) => ({
              // headerLeft: () => (
              //   <TouchableOpacity onPress={() => navigation.goBack()}>
              //     <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
              //   </TouchableOpacity>
              // ),
              headerStyle: {
                backgroundColor: appBottomSheetBackgroundColor,
              },
              headerTitle: '',
              headerTintColor: 'white',
            })}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
          <Stack.Screen
            name='Emoji picker'
            component={EmojiPicker}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
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
          <Stack.Screen
            name='Icon picker'
            component={IconPicker}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
                </TouchableOpacity>
              ),
              headerTitle: 'Choose an icon',
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
            // headerLeft: () => (
            //   <TouchableOpacity onPress={() => props.navigation.goBack()}>
            //     <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
            //   </TouchableOpacity>
            // ),
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
            title: 'Signup',
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
          name='EULA'
          component={EULA}
          options={{
            headerShown: true,
            title: 'EULA',
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

export default Auth;
