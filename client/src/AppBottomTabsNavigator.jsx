import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Platform, AppState } from 'react-native';
import lampostAPI from './apis/lampost';
import GlobalContext from './GlobalContext';
import { connect } from 'react-redux';
import { io } from 'socket.io-client';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { createNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { appBottomSheetBackgroundColor, iconColorsTable } from './utils/colorsTable';

import MapNavigator from './components/Navigator/Map';
import LibraryNavigator from './components/Navigator/Library';
import AuthNavigator from './components/Navigator/Auth';
import LoadingSpinner from './components/Utils/LoadingSpinner';
import NotAvailableModal from './components/Utils/NotAvailableModal';
import PleaseLoginModal from './components/Utils/PleaseLoginModal';
import SnackBar from './components/Utils/SnackBar';
import Camera from './components/Camera/Container';
import DummyCamera from './components/DummyCamera';

const ref = createNavigationContainerRef();
const Tab = createBottomTabNavigator();
// ac
import { loadMe } from './redux/actionCreators/auth';
import { getSocket } from './redux/actionCreators/auth';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: false, shouldSetBadge: false }),
});

const schedulePushNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { message: 'goes here' },
    },
    trigger: { seconds: 10 },
  });
};

const registerForPushNotificationsAsync = async () => {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      // alert('Failed to get push token for push notification!');
      console.log('not gained push token');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({ experienceId: '@yosuke_kojima/Lampost' })).data;
    console.log('this is a token', token);
    // console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
};

const AppStack = (props) => {
  const isIpad = Platform.OS === 'ios' && (Platform.isPad || Platform.isTVOS);
  const [auth, setAuth] = useState({
    data: null,
    socket: null,
    isAuthenticated: false,
    currentLocation: null,
    isInMeetup: false,
  });
  const [appState, setAppState] = useState(AppState.currentState);
  const [loading, setLoading] = useState(false);
  const [snackBar, setSnackBar] = useState({ isVisible: false, message: '', barType: '', duration: null });
  const [isNotAvailableModalOpen, setIsNotAvailableModalOpen] = useState(false);
  const [isPleaseLoginModalOpen, setIsPleaseLoginModalOpen] = useState(false);
  const [isLoggedOutModalOpen, setIsLoggedOutModalOpen] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [routeName, setRouteName] = useState('');
  const [totalUnreadChatsCount, setTotalUnreadChatsCount] = useState(0);
  const [myUpcomingMeetupAndChatsTable, setMyUpcomingMeetupAndChatsTable] = useState({});
  const hide = routeName === 'Dummy2' || routeName === 'Q&A';
  // { 111: { _id: 111, title: 'Meetup1' , chats: [{content: '', createdAt: '2022/9/1'}], viewedChats: '2022/9/22' },
  //   222: { _id: 222, title: 'Meetup2' , chats: [{content: '', createdAt: '2022/8/1'}], viewedChats: '2022/7/22' },
  //}
  // [{ _id: 111, title: 'Meetup1' , chats: [{content: '', createdAt: '2022/9/1'}], viewedChats: '2022/9/22' },
  //    { _id: 222, title: 'Meetup2' , chats: [{content: '', createdAt: '2022/8/1'}], viewedChats: '2022/7/22' }
  //]
  // console.log(myUpcomingMeetupAndChatsTable);
  useEffect(() => {
    if (auth.data) {
      if (!auth.data.pushToken) {
        registerForPushNotificationsAsync().then(async (token) => {
          setExpoPushToken(token);
          const result = await lampostAPI.patch(`/users/${auth.data._id}/pushToken`, { pushToken: token });
          const { pushToken } = result.data;
          setAuth((previous) => {
            return {
              ...previous,
              pushToken,
            };
          });
        });
      }
    }
    // 多分、ここでdeviceのtokenを取得して、stateに保存してくれるんだろう。
  }, [auth.data]);

  useEffect(() => {
    if (auth.data) {
      if (auth.data.pushToken) {
        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
          if (notification.request.content.data.notificationType === 'loungeChat') {
            setMyUpcomingMeetupAndChatsTable((previous) => {
              const updating = { ...previous };
              updating[notification.request.content.data.meetupId].unreadChatsCount =
                updating[notification.request.content.data.meetupId].unreadChatsCount + 1;
              return updating;
            });
            setTotalUnreadChatsCount((previous) => previous + 1);
          }
          setNotification(notification);
          // console.log(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
        });

        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };
      }
    }
  }, [auth.data]);

  // const onAppStateChange = (nextAppState) => {
  //   if (appState.match(/inactive|background/) && nextAppState === 'active') {
  //     console.log('App has come to the foreground!');
  //   }
  //   setAppState(nextAppState);
  // };

  const getMyUpcomingMeetupsAndLoungeChatsByMeetupIds = async () => {
    const result = await lampostAPI.post(`/loungechats`, { myUpcomingMeetups: auth.data.upcomingMeetups });
    const { myUpcomingMeetupAndChatsTable } = result.data;
    setMyUpcomingMeetupAndChatsTable(myUpcomingMeetupAndChatsTable);
    console.log('is this?????');
    const countTotalUnreads = Object.values(myUpcomingMeetupAndChatsTable).forEach((e) => {
      setTotalUnreadChatsCount((previous) => previous + e.unreadChatsCount);
    });
  };

  useEffect(() => {
    // 最初のrenderで、このsubscription functionが登録される。
    if (auth.isAuthenticated && auth.socket) {
      const appStateListener = AppState.addEventListener('change', (nextAppState) => {
        if (appState.match(/inactive|background/) && nextAppState === 'active') {
          console.log('App has come to the foreground! Socket connected again.');
          //ここで再度connectして、server のconnectのlogする。
          getSocket();
          getMyUpcomingMeetupsAndLoungeChatsByMeetupIds();
        } else if (appState === 'active' && nextAppState === 'inactive') {
          // socket disconnect する。ここで。serverでdisconnectのlogを確認する。
          auth.socket.disconnect();
          console.log('disconnected');
        }
        console.log('Next AppState is: ', nextAppState);
        // auth.socket.disconnect();
        setAppState(nextAppState); // backgroundになる。
      });

      // subscriptionを発生させる。
      return () => {
        appStateListener.remove();
      };
    }
  }, [auth.isAuthenticated, auth.socket, appState]);
  // useEffect(() => {
  //   if (appState === 'background') {
  //     console.log('background');
  //   }
  // }, [appState]); // こういう使い方はできないいんだ。上の、applistennerでしか多分使えない。

  // const getJWTToken = async () => {
  //   const jwtToken = await SecureStore.getItemAsync('secure_token');
  //   if (jwtToken) {
  //     props.loadMe(jwtToken);
  //   }
  // };
  // useEffect(() => {
  //   getJWTToken();
  // }, []);

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

  // あー。このapiのendpointが。。。
  const getSocket = () => {
    // 'https://lampost-server-production.onrender.com/api'
    //
    // console.log(Constants.manifest.extra.socketEndpoint);
    // const { socketEndpoint } = Constants.manifest.extra.socketEndpoint;
    // 'http://192.168.11.5:3500'
    // const socket = io('https://lampost-server-production.onrender.com', {
    const socket = io('http://192.168.11.5:3500', {
      path: '/mysocket',
    });
    setAuth((previous) => {
      return { ...previous, socket: socket };
    });
  };
  // loginされたら、socketを取る。
  useEffect(() => {
    if (auth.isAuthenticated) {
      getSocket();
    }
  }, [auth.isAuthenticated]);

  // これ、なんでこんなに動いている？そもそも.
  useEffect(() => {
    if (auth.isAuthenticated) {
      getMyUpcomingMeetupsAndLoungeChatsByMeetupIds();
      // ここも、appStateが変わるたびに動かさなきゃいけない。→  app stateごとに動かすのは上で。
    }
  }, [auth.isAuthenticated]);
  // [auth.isAuthenticated, auth.data?.ongoingMeetup] dependencyがこれだと、毎回動いていた。つまり、多分auth.dataのupdateにつれて動いていたんだろうね。。。これまた発見。

  // socketが接続されたら、loungeに入る。
  useEffect(() => {
    if (auth.socket) {
      const meetupIds = auth.data.upcomingMeetups.map((meetupObject) => meetupObject.meetup);
      auth.socket.emit('JOIN_LOUNGES', { meetupIds });

      return () => {
        auth.socket.off('JOIN_LOUNGES');
        // console.log('hello');
      };
    }
  }, [auth.socket]);
  // console.log(myUpcomingMeetupAndChatsTable);

  // useEffect(() => {
  //   if (auth.socket && routeName !== 'Lounge') {
  //     auth.socket.on('I_GOT_A_CHAT_OUT_OF_THE_ROOM.GO_CHECK_OUT_THE_LOUNGE', (data) => {
  //       // lounge以外のscreenにいる時でこのsocket eventを受けたら、chatのstateを変える。
  //       // if (routeName !== 'Lounge') {
  //       // }
  //       // console.log(routeName);
  //       if (data.user._id !== auth.data._id) {
  //         setMyUpcomingMeetupAndChatsTable((previous) => {
  //           const updating = { ...previous };
  //           if (routeName !== 'Lounge') {
  //             updating[data.meetup].unreadChatsCount = updating[data.meetup].unreadChatsCount + 1;
  //           }
  //           return updating;
  //         });
  //         if (routeName !== 'Lounge') {
  //           setTotalUnreadChatsCount((previous) => previous + 1);
  //         }
  //       }
  //     });

  //     return () => {
  //       auth.socket.off('I_GOT_A_CHAT_OUT_OF_THE_ROOM.GO_CHECK_OUT_THE_LOUNGE');
  //     };
  //   }
  // }, [auth.socket, routeName]);

  return (
    <GlobalContext.Provider
      value={{
        isIpad,
        auth,
        setAuth,
        loading,
        setLoading,
        snackBar,
        setSnackBar,
        isNotAvailableModalOpen,
        setIsNotAvailableModalOpen,
        isPleaseLoginModalOpen,
        setIsPleaseLoginModalOpen,
        routeName,
        setRouteName,
        myUpcomingMeetupAndChatsTable,
        setMyUpcomingMeetupAndChatsTable,
        totalUnreadChatsCount,
        setTotalUnreadChatsCount,
        schedulePushNotification,
        expoPushToken,
        setExpoPushToken,
        notification,
        setNotification,
        isLoggedOutModalOpen,
        setIsLoggedOutModalOpen,
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
                <MaterialCommunityIcons
                  name={'rocket-launch'}
                  color={focused ? 'white' : 'rgb(102, 104, 109)'}
                  size={size}
                />
              ),
              tabBarLabel: 'Meetups',
              // tabBarLabelStyle: { padding: 5 },
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
              tabBarLabel: 'Libraries',
              tabBarIcon: ({ size, color, focused }) => (
                <Ionicons name='ios-library-sharp' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={size} />
              ),
            }}
          />
          {/* <Tab.Screen
            name='DummyCamera'
            component={DummyCamera}
            options={{
              headerShown: false,
              tabBarLabel: 'Dummycam',
              tabBarIcon: ({ size, color, focused }) => (
                <Ionicons name='ios-library-sharp' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={size} />
              ),
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
      <NotAvailableModal />
      <PleaseLoginModal />
    </GlobalContext.Provider>
  );
};

export default connect(null, { loadMe, getSocket })(AppStack);
