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
import AddLink from '../User/AddLink';
// import AddLinks from '../User/AddLink/Container';

import UserHome from '../User/Container';
// import Launched from '../User/LaunchedMeetups/Container';
// import LaunchedMeetup from '../User/LaunchedMeetups/LaunchedMeetup/Container';
import Patrons from '../User/Patrons/Container';
// import Activities from '../User/Activities/Container';
// import Activity from '../User/Meetups/Activity/Container';
import Meetups from '../User/Meetups/Container';
import Attended from '../User/Meetups/Attended/Container';
import ClapFriend from '../User/Meetups/Attended/ClapFriend/Container';
// import Meetup from '../User/Meetups/Meetup/Container';
import Assets from '../User/Assets/Container';
// import Asset from '../Utils/Asset';
import Asset from '../User/Meetups/Assets/Asset';
import MeetupAssets from '../User/Meetups/Assets/Container';
import Impressions from '../User/Meetups/Impressions/Container';
// import Asset from '../User/Assets/Asset/Container';
import AddBadges from '../Utils/AddBadges/Container';
import { baseBackgroundColor, appBottomSheetBackgroundColor } from '../../utils/colorsTable';
import DeleteAccount from '../User/DeleteAccount';
import MyFriends from '../User/MyFriends/Container';
import FriendChatRoom from '../User/MyFriends/FriendChatRoom/Container';

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
              headerTintColor: 'white',
              // headerTintColor: 'white',
            }}
          />
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
              headerTintColor: 'white',
              // headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name='Asset'
            component={Asset}
            options={{
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
            name='Chat room'
            component={FriendChatRoom}
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
          {/* <Stack.Screen
          // attendedとmeetup assetsと、impressions
            name='Meetup'
            component={Meetup}
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
          /> */}
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
        <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
          <Stack.Screen
            name='Add badge tags'
            component={AddBadgeTags}
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
          <Stack.Screen
            name='Add link'
            component={AddLink}
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
          <Stack.Screen
            name='Clap friend'
            component={ClapFriend}
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
