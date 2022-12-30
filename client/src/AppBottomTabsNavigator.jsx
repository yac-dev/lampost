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
  const [totalUnreadChatsCount, setTotalUnreadChatsCount] = useState(0);
  const [myUpcomingMeetupAndChatsTable, setMyUpcomingMeetupAndChatsTable] = useState({});
  const hide = routeName === 'Meetup' || routeName === 'Dummy2' || routeName === 'Q&A';

  // { 111: { _id: 111, title: 'Meetup1' , chats: [{content: '', createdAt: '2022/9/1'}], viewedChats: '2022/9/22' },
  //   222: { _id: 222, title: 'Meetup2' , chats: [{content: '', createdAt: '2022/8/1'}], viewedChats: '2022/7/22' },
  //}
  // [{ _id: 111, title: 'Meetup1' , chats: [{content: '', createdAt: '2022/9/1'}], viewedChats: '2022/9/22' },
  //    { _id: 222, title: 'Meetup2' , chats: [{content: '', createdAt: '2022/8/1'}], viewedChats: '2022/7/22' }
  //]

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
    const result = await lampostAPI.post(`/loungechats`, { myUpcomingMeetups: auth.data.upcomingMeetups });
    const { myUpcomingMeetupAndChatsTable } = result.data;
    console.log(myUpcomingMeetupAndChatsTable);
    console.log('running');
    setMyUpcomingMeetupAndChatsTable(myUpcomingMeetupAndChatsTable);
    const countTotalUnreads = Object.values(myUpcomingMeetupAndChatsTable).forEach((e) => {
      setTotalUnreadChatsCount((previous) => previous + e.unreadChatsCount);
    });
  };
  useEffect(() => {
    if (auth.isAuthenticated) {
      getMyUpcomingMeetupsByMeetupIds();
    }
  }, [auth.isAuthenticated]);

  // loungeでroom joinする必要はないわ。ただ、chatをlist化したものを並べて見せる、ただそれだけ。
  useEffect(() => {
    if (auth.socket) {
      const meetupIds = auth.data.upcomingMeetups.map((meetupObject) => meetupObject.meetup);
      auth.socket.emit('JOIN_LOUNGES', { meetupIds });

      return () => {
        auth.socket.off('JOIN_LOUNGES');
      };
    }
  }, [auth.socket]);

  // あー、これで入っているわ。ok
  useEffect(() => {
    if (auth.socket) {
      auth.socket.on('SOMEONE_SENT_A_CHAT', (data) => {
        // { meetup: 123, content: '', type: 'general', createdAt: 2022/9/22 }
        if (routeName !== 'Lounge') {
          console.log(data.meetup);
          console.log('not Lounge navigation');
          setMyUpcomingMeetups((previous) => {
            const updating = { ...previous };
            updating[data.meetup].unreadChatsCount++;
            return updating;
            // return {
            //   ...previous,
            //   [data.meetup]: {
            //     ...previous[data.meetup],
            //   },
            // };
          });
          setTotalUnreadChatsCount((previous) => previous + 1);
        }
      });

      return () => {
        auth.socket.off('SOMEONE_SENT_A_CHAT');
      };
    }
  }, [auth.socket]);

  return (
    <GlobalContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        setLoading,
        snackBar,
        setSnackBar,
        routeName,
        myUpcomingMeetupAndChatsTable,
        setMyUpcomingMeetupAndChatsTable,
        totalUnreadChatsCount,
        setTotalUnreadChatsCount,
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
            tabBarActiveTintColor: 'white',
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
              tabBarIcon: ({ size, color, focused }) => (
                <MCIcon name={'map'} color={focused ? 'white' : 'rgb(102, 104, 109)'} size={size} />
              ),
              tabBarLabel: 'Meetups',
              tabBarBadge: totalUnreadChatsCount ? totalUnreadChatsCount : null,
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
              tabBarIcon: ({ size, color, focused }) => (
                <MaterialCommunityIcons name='camera' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name='LibraryNavigator'
            component={LibraryNavigator}
            options={{
              headerShown: false,
              tabBarLabel: 'Library',
              tabBarIcon: ({ size, color, focused }) => (
                <Ionicons name='ios-library-sharp' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={size} />
              ),
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
                tabBarIcon: ({ size, color, focused }) => (
                  <FontAwesome5 name='user-astronaut' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={size} />
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
