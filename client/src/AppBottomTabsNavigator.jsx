// main libraries
import React, { useEffect, useState } from 'react';
// import GlobalContext from './GlobalContext';
import { connect } from 'react-redux';
import { io } from 'socket.io-client';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image } from 'react-native';
import { Button } from 'react-native-paper';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { createNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MapNavigator from './components/Navigator/Map';
import MemoirsNavigator from './components/Navigator/Memoirs';
import LibraryNavigator from './components/Navigator/Library';
import AuthNavigator from './components/Navigator/Auth';

const ref = createNavigationContainerRef();
const Tab = createBottomTabNavigator();

// components

// ac
import { loadMe } from './redux/actionCreators/auth';
import { getSocket } from './redux/actionCreators/auth';
// const theme = {
//   colors: {
//     background: 'transparent',
//   },
// };

const AppStack = (props) => {
  // const [auth, setAuth] = useState({ data: null, socket: null });
  const [routeName, setRouteName] = useState();
  const hide = routeName === 'Camera' || routeName === 'Meetup' || routeName === 'Dummy2' || routeName === 'Q&A';

  const getJWTToken = async () => {
    const jwtToken = await SecureStore.getItemAsync('secure_token');
    if (jwtToken) {
      props.loadMe(jwtToken);
    }
  };
  useEffect(() => {
    getJWTToken();
  }, []);

  useEffect(() => {
    const socket = io('http://192.168.11.17:3500', {
      path: '/mysocket',
    });
    props.getSocket(socket);
  }, []);

  // これも、contextを使っていた方がいいな。reduxのstateよりも。refactoringは後でやろうか。authDataみたいな感じで渡して、app全体で使う感じがいいだろう。
  return (
    // <GlobalContext.Provider value={{auth: {data: }}}>

    <NavigationContainer
      ref={ref}
      onReady={() => {
        setRouteName(ref.getCurrentRoute().name);
      }}
      onStateChange={async () => {
        const previousRouteName = routeName;
        const currentRouteName = ref.getCurrentRoute().name;
        setRouteName(currentRouteName);
      }}
    >
      <Tab.Navigator
        screenOptions={{
          activeTintColor: 'red',
          tabBarStyle: {
            display: hide ? 'none' : 'flex',
            backgroundColor: '#0B1673',
            // borderTopColor: 'transparent',
          },
        }}
      >
        <Tab.Screen
          name='Meetups'
          component={MapNavigator}
          options={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ size, color }) => <MCIcon name={'map'} color={color} size={size} />,
            tabBarLabel: 'Meetups',
            // () => {
            //   return null;
            // },
            // tabBarStyle: { display: hide ? 'none' : 'flex' },
            // tabBarVisible: ((route) => {
            //   const routeName = getFocusedRouteNameFromRoute(route) ?? '';

            //   if (routeName === 'Camera') {
            //     return false;
            //   }

            //   return true;
            // })(route),
          })}
        />
        {/* <Tab.Screen
          name='Feed'
          component={Feed}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => <FontAwesome name='feed' color={color} size={size} />,
            tabBarLabel: () => {
              return null;
            },
          }}
        /> */}
        {/* <Tab.Screen
          name='LibraryNavigator'
          component={LibraryNavigator}
          options={{
            headerShown: false,
            tabBarLabel: 'Library',
            tabBarIcon: ({ size, color }) => <MaterialIcons name='photo-library' color={color} size={size} />,
          }}
        /> */}
        {/* 全てのcomponent、navigatorを足さないといけないわ。Mapと全く同じように。この状態だと。mapの方のuser page routeに行く。*/}
        <Tab.Screen
          name='Auth'
          component={AuthNavigator}
          options={
            ({ navigation }) => ({
              headerShown: false,
              // headerTransparent: true,
              // headerLeft: () => <Button onPress={() => navigation.navigate('Add comment')}>User page</Button>,
              tabBarIcon: ({ size, color }) => (
                // <Image
                //   color={color}
                //   style={{ width: 24, height: 24 }}
                //   source={require('../../../assets/app/timeMachine.png')}
                // />
                <FontAwesome5 name='user-astronaut' color={color} size={size} />
                // 本当はtime machineのiconにしたい。
              ),
              tabBarLabel: 'Home',
              // () => {
              //   return null;
              // },
            })
            //   {
            //   tabBarIcon: ({ size, color }) => (
            //     // <Image
            //     //   color={color}
            //     //   style={{ width: 24, height: 24 }}
            //     //   source={require('../../../assets/app/timeMachine.png')}
            //     // />
            //     <MaterialCommunityIcons name='newspaper' color={color} size={size} />
            //     // 本当はtime machineのiconにしたい。
            //   ),
            //   tabBarLabel: () => {
            //     return null;
            //   },
            // }
          }
        />

        {/* <Tab.Screen
          name='Notifications'
          component={NotificationsNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => <FontAwesome5 name='user-astronaut' color={color} size={size} />,
            tabBarLabel: 'Profile',
            // () => {
            //   return null;
            // },
          }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
    // </GlobalContext.Provider>
  );
};

export default connect(null, { loadMe, getSocket })(AppStack);
