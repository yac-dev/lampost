// main libraries
import React, { useEffect, useState, useRef } from 'react';
import lampostAPI from './apis/lampost';
import GlobalContext from './GlobalContext';
import { connect } from 'react-redux';
import { io } from 'socket.io-client';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image } from 'react-native';
import { Button } from 'react-native-paper';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { createNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { appBottomSheetBackgroundColor, iconColorsTable } from './utils/colorsTable';

import MapNavigator from './components/Navigator/Map';
import LibraryNavigator from './components/Navigator/Library';
import AuthNavigator from './components/Navigator/Auth';
import LoadingSpinner from './components/Utils/LoadingSpinner';
import SnackBar from './components/Utils/SnackBar';
import Camera from './components/Camera/Container';

const ref = createNavigationContainerRef();
const Tab = createBottomTabNavigator();
// ac
import { loadMe } from './redux/actionCreators/auth';
import { getSocket } from './redux/actionCreators/auth';
// const theme = {
//   colors: {
//     background: 'transparent',
//   },
// };

const AppStack = (props) => {
  const [auth, setAuth] = useState({
    data: null,
    socket: null,
    isAuthenticated: false,
    currentLocation: null,
    isInMeetup: false,
  });
  const [loading, setLoading] = useState(false);
  const [snackBar, setSnackBar] = useState({ isVisible: false, message: '', barType: '', duration: null });
  const [routeName, setRouteName] = useState();
  const [myUpcomingMeetups, setMyUpcomingMeetups] = useState({});
  const [unreadLoungeChats, setUnreadLoungeChats] = useState(null);
  const hide = routeName === 'Meetup' || routeName === 'Dummy2' || routeName === 'Q&A';

  const getJWTToken = async () => {
    const jwtToken = await SecureStore.getItemAsync('secure_token');
    if (jwtToken) {
      props.loadMe(jwtToken);
    }
  };
  useEffect(() => {
    getJWTToken();
  }, []);

  const loadMe = async () => {
    const jwtToken = await SecureStore.getItemAsync('secure_token');
    if (jwtToken) {
      const result = await lampostAPI.get('/auth/loadMe', { headers: { authorization: `Bearer ${jwtToken}` } });
      const { user } = result.data;
      setAuth((previous) => {
        return { ...previous, data: user, isAuthenticated: true };
      });
    }
  };
  useEffect(() => {
    loadMe();
  }, []);

  const getSocket = () => {
    const socket = io('http://localhost:3500', {
      path: '/mysocket',
    });
    setAuth((previous) => {
      return { ...previous, socket: socket };
    });
  };
  useEffect(() => {
    if (auth.isAuthenticated) {
      getSocket();
    }
  }, [auth.isAuthenticated]);

  const getMyUpcomingMeetupsByMeetupIds = async () => {
    const upcomingMeetupIds = auth.data.upcomingMeetups.map((meetupObject) => {
      return meetupObject.meetup;
    });
    const result = await lampostAPI.post(`/loungechats`, { upcomingMeetupIds });
    const { myUpcomingMeetupsTable } = result.data;
    const m = { ...myUpcomingMeetupsTable };
    let totalUnreadLoungeChats = 0;
    auth.data.upcomingMeetups.forEach((meetupObject) => {
      m[meetupObject.meetup].viewedChatsLastTime = meetupObject.viewedChatsLastTime;
      for (let i = 0; i < m[meetupObject.meetup].chats.length; i++) {
        if (m[meetupObject.meetup].chats[i].createdAt > meetupObject.viewedChatsLastTime) {
          totalUnreadLoungeChats++;
        }
      }
    });
    setMyUpcomingMeetups(m);
    setUnreadLoungeChats(totalUnreadLoungeChats);
  };
  useEffect(() => {
    if (auth.data) {
      getMyUpcomingMeetupsByMeetupIds();
    }
  }, [auth.data]);

  // useEffect(() => {
  //   // const socket = io('http://192.168.11.17:3500', {
  //   //   path: '/mysocket',
  //   // });
  //   const socket = io('http://localhost:3500', {
  //     path: '/mysocket',
  //   });
  //   props.getSocket(socket);
  // }, []);

  // これも、contextを使っていた方がいいな。reduxのstateよりも。refactoringは後でやろうか。authDataみたいな感じで渡して、app全体で使う感じがいいだろう。
  return (
    <GlobalContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        setLoading,
        snackBar,
        setSnackBar,
        myUpcomingMeetups,
        setMyUpcomingMeetups,
        unreadLoungeChats,
        setUnreadLoungeChats,
      }}
    >
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
            tabBarStyle: {
              display: hide ? 'none' : 'flex',
              backgroundColor: appBottomSheetBackgroundColor,
            },
            tabBarLabelStyle: {
              fontSize: 12,
            },
          }}
          // tabBarOptions={{
          //   showLabel: false,
          //   activeBackgroundColor: iconColorsTable['blue1'],
          //   inactiveBackgroundColor: 'yellow',
          //   style:{
          //       position:'absolute',
          //       bottom:0,
          //       right:0,
          //       left:0,
          //       elevation:0,
          //       height:55,
          //       borderTopRightRadius: 20,
          //       borderTopLeftRadius: 20,

          //   },
          // }}
        >
          <Tab.Screen
            name='Meetups'
            component={MapNavigator}
            options={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ size, color }) => <MCIcon name={'map'} color={color} size={size} />,
              tabBarLabel: 'Meetups',
              tabBarBadge: unreadLoungeChats ? unreadLoungeChats : null,
              tabBarBadgeStyle: { backgroundColor: iconColorsTable['blue1'] },
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
          <Tab.Screen
            name='Camera'
            component={Camera}
            options={{
              headerShown: false,
              tabBarLabel: 'Camera',
              tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name='camera' color={color} size={size} />,
            }}
          />
          <Tab.Screen
            name='LibraryNavigator'
            component={LibraryNavigator}
            options={{
              headerShown: false,
              tabBarLabel: 'Library',
              tabBarIcon: ({ size, color }) => <Ionicons name='ios-library-sharp' color={color} size={size} />,
            }}
          />

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
                tabBarLabel: 'Profile',
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
      <LoadingSpinner />
      <SnackBar />
    </GlobalContext.Provider>
  );
};

export default connect(null, { loadMe, getSocket })(AppStack);
