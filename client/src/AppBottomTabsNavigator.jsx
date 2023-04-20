import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Platform, AppState, TouchableOpacity } from 'react-native';
import lampostAPI from './apis/lampost';
import GlobalContext from './GlobalContext';
// import { io } from 'socket.io-client';
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
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import MapNavigator from './components/Navigator/Map';
import LibraryNavigator from './components/Navigator/Library';
import AuthNavigator from './components/Navigator/Auth';
import LoadingSpinner from './components/Utils/LoadingSpinner';
import NotAvailableModal from './components/Utils/NotAvailableModal';
import PleaseLoginModal from './components/Utils/PleaseLoginModal';
import SnackBar from './components/Utils/SnackBar';
import Camera from './components/Camera/Container';
import TabNavigator from './TabNavigator';

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

const ChatBase = () => <View style={{ flex: 1, backgroundColor: 'red' }} />;

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
  const [chatsNotificationCount, setChatsNotificationCount] = useState(0);
  const hide = routeName === 'Dummy2' || routeName === 'Q&A';
  const [myUpcomingMeetups, setMyUpcomingMeetups] = useState({});
  const [isFetchedMyUpcomingMeetups, setIsFetchedMyUpcomingMeetups] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [unreadFriendChats, setUnreadFriendChats] = useState({});
  const [friendChatsNotificationCount, setFriendChatsNotificationCount] = useState(0);

  useEffect(() => {
    if (auth.data) {
      // if (!auth.data.pushToken) {
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
      // }
    }
    // 多分、ここでdeviceのtokenを取得して、stateに保存してくれるんだろう。
  }, [auth.data]);

  useEffect(() => {
    if (auth.data) {
      // if (auth.data.pushToken) {
      notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
        if (notification.request.content.data.notificationType === 'loungeChat') {
          setChatsNotificationCount((previous) => previous + 1);
          setMyUpcomingMeetups((previous) => {
            const updating = { ...previous };
            updating[notification.request.content.data.meetupId].unreadChatsTable[
              notification.request.content.data.type
            ] =
              updating[notification.request.content.data.meetupId].unreadChatsTable[
                notification.request.content.data.type
              ] + 1;
            return updating;
          });
        } else if (notification.request.content.data.notificationType === 'sentImpression') {
          console.log(notification.request.content.data.notificationType);
        } else if (notification.request.content.data.notificationType === 'friendChat') {
          setUnreadFriendChats((previous) => {
            const updating = { ...previous };
            if (updating[notification.request.content.data.sender._id]) {
              updating[notification.request.content.data.sender._id].chats.push(notification.request.content.data.chat);
              return updating;
            } else {
              // updating[notification.request.content.data.sender._id]['friend'] = notification.request.content.data.sender;
              // updating[notification.request.content.data.sender._id]['count'] = 1
              // return updating // これダメ。。そもそもupdating[notification.request.content.data.sender._id]がundefinedだからね。
              const obj = {
                friend: notification.request.content.data.sender,
                chats: [notification.request.content.data.chat],
                friendChatRoomId: notification.request.content.data.friendChatRoomId,
              };
              updating[notification.request.content.data.sender._id] = obj;
              return updating;
            }
          });
          setFriendChatsNotificationCount((previous) => previous + 1);
        } else if (notification.request.content.data.notificationType === 'meetupHasEnded') {
          setMyUpcomingMeetups((previous) => {
            const updating = { ...previous };
            delete updating[notification.request.content.data.meetupId];
            return updating;
          });
        }
        // if (notification.request.content.data.notificationType === 'loungeChat') {
        //   setMyUpcomingMeetupAndChatsTable((previous) => {
        //     const updating = { ...previous };
        //     updating[notification.request.content.data.meetupId].unreadChatsCount =
        //       updating[notification.request.content.data.meetupId].unreadChatsCount + 1;
        //     return updating;
        //   });
        //   setTotalUnreadChatsCount((previous) => previous + 1);
        // }
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
      // }
    }
  }, [auth.data]);

  // const onAppStateChange = (nextAppState) => {
  //   if (appState.match(/inactive|background/) && nextAppState === 'active') {
  //     console.log('App has come to the foreground!');
  //   }
  //   setAppState(nextAppState);
  // };

  // const getMyUpcomingMeetupsAndLoungeChatsByMeetupIds = async () => {
  //   const result = await lampostAPI.post(`/loungechats`, { myUpcomingMeetups: auth.data.upcomingMeetups });
  //   const { myUpcomingMeetupAndChatsTable } = result.data;
  //   setMyUpcomingMeetupAndChatsTable(myUpcomingMeetupAndChatsTable);
  //   console.log('getting messages status');
  //   const countTotalUnreads = Object.values(myUpcomingMeetupAndChatsTable).forEach((e) => {
  //     setTotalUnreadChatsCount((previous) => previous + e.unreadChatsCount);
  //   });
  // };

  // upcomingのmeetupをgetしてくる
  const getMyUpcomingMeetupStates = async () => {
    if (auth.data.upcomingMeetups.length) {
      const result = await lampostAPI.post('/meetups/mymeetupstates', {
        upcomingMeetupIds: auth.data.upcomingMeetups,
        userId: auth.data._id,
      });
      const { myUpcomingMeetups, myUpcomingMeetupIds } = result.data;
      setMyUpcomingMeetups((previous) => {
        const updating = { ...previous };
        for (const meetupId in myUpcomingMeetups) {
          updating[meetupId] = {
            _id: myUpcomingMeetups[meetupId]._id,
            title: myUpcomingMeetups[meetupId].title,
            state: myUpcomingMeetups[meetupId].state,
            startDateAndTime: myUpcomingMeetups[meetupId].startDateAndTime,
            launcher: myUpcomingMeetups[meetupId].launcher,
            duration: myUpcomingMeetups[meetupId].duration,
            isRSVPed: myUpcomingMeetups[meetupId].isRSVPed,
            unreadChatsTable: {
              general: 0,
              reply: 0,
              question: 0,
              help: 0,
              edited: 0,
            },
          };
        }

        return updating;
      });
      // setAuth((previous) => {
      //   return {
      //     ...previous,
      //     data: {
      //       ...previous.data,
      //       upcomingMeetups: myUpcomingMeetupIds,
      //     },
      //   };
      // });
      setIsFetchedMyUpcomingMeetups(true);
      setChatsNotificationCount(0);
    }
  };
  useEffect(() => {
    if (auth.isAuthenticated) {
      getMyUpcomingMeetupStates();
      getUnreadFriendChats();
      // ここも、appStateが変わるたびに動かさなきゃいけない。→  app stateごとに動かすのは上で。
    }
  }, [auth.isAuthenticated]);

  // unreadchatsをgetする。
  const getUnreadChats = async () => {
    const result = await lampostAPI.post('/loungechats/unreadchats', {
      upcomingMeetupIds: Object.keys(myUpcomingMeetups),
      userId: auth.data._id,
    });
    const { chatsTable } = result.data;
    let totalUnread = 0;
    setMyUpcomingMeetups((previous) => {
      const updating = { ...previous };
      for (const meetupId in chatsTable) {
        updating[meetupId].unreadChatsTable = chatsTable[meetupId];
        // for (const chatType in chatsTable[meetupId]) {
        // こんな感じで、setStateのなかで別のsetStateをやろうとすると、なんかbugる。よくわからんことになる。
        //   setChatsNotificationCount((previous) => previous + chatsTable[meetupId][chatType]);
        // }
      }
      return updating;
    });

    setChatsNotificationCount((previous) => {
      for (const meetupId in chatsTable) {
        const chatsTableValueArr = Object.values(chatsTable[meetupId]);
        totalUnread =
          totalUnread + chatsTableValueArr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      }
      return previous + totalUnread;
    });
  };

  const getUnreadFriendChats = async () => {
    setFriendChatsNotificationCount(0);
    // recieverが自分でかつ、isReadがfalseのやつを全部とってくる。
    const result = await lampostAPI.get(`/friendchats/reciever/${auth.data._id}`);
    const { unreadFriendChatsTable, totalUnreads } = result.data;
    setUnreadFriendChats(unreadFriendChatsTable);
    setFriendChatsNotificationCount(totalUnreads);
  };

  useEffect(() => {
    if (isFetchedMyUpcomingMeetups) {
      getUnreadChats();
      setIsFetchedMyUpcomingMeetups(false);
    }
  }, [isFetchedMyUpcomingMeetups]);

  // useEffect(() => {
  //   if(){}

  // },[myUpcomingMeetups])

  useEffect(() => {
    // 最初のrenderで、このsubscription functionが登録される。
    if (auth.isAuthenticated) {
      const appStateListener = AppState.addEventListener('change', (nextAppState) => {
        if (appState.match(/inactive|background/) && nextAppState === 'active') {
          console.log('App has come to the foreground!');
          //ここで再度connectして、server のconnectのlogする。
          // getSocket();
          // getMyUpcomingMeetupsAndLoungeChatsByMeetupIds();
          getMyUpcomingMeetupStates();
          getUnreadFriendChats();
        } else if (appState === 'active' && nextAppState === 'inactive') {
          // socket disconnect する。ここで。serverでdisconnectのlogを確認する。
          // auth.socket.disconnect();
          // console.log('disconnected');
        }
        console.log('Next AppState is: ', nextAppState);
        // auth.socket.disconnect();
        setAppState(nextAppState); // backgroundになる。
      });
      return () => {
        appStateListener.remove();
      };
    }
  }, [auth.isAuthenticated, appState]);

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
  // const getSocket = () => {
  //   // 'https://lampost-server-production.onrender.com/api'
  //   //
  //   // console.log(Constants.manifest.extra.socketEndpoint);
  //   // const { socketEndpoint } = Constants.manifest.extra.socketEndpoint;
  //   // 'http://192.168.11.5:3500'
  //   // const socket = io('https://lampost-server-production.onrender.com', {
  //   const socket = io('http://192.168.11.5:3500', {
  //     path: '/mysocket',
  //   });
  //   setAuth((previous) => {
  //     return { ...previous, socket: socket };
  //   });
  // };
  // // loginされたら、socketを取る。
  // useEffect(() => {
  //   if (auth.isAuthenticated) {
  //     getSocket();
  //   }
  // }, [auth.isAuthenticated]);

  // これ、なんでこんなに動いている？そもそも.

  // [auth.isAuthenticated, auth.data?.ongoingMeetup] dependencyがこれだと、毎回動いていた。つまり、多分auth.dataのupdateにつれて動いていたんだろうね。。。これまた発見。

  // socketが接続されたら、loungeに入る。
  // useEffect(() => {
  //   if (auth.socket) {
  //     const meetupIds = auth.data.upcomingMeetups.map((meetupObject) => meetupObject.meetup);
  //     auth.socket.emit('JOIN_LOUNGES', { meetupIds });

  //     return () => {
  //       auth.socket.off('JOIN_LOUNGES');
  //       // console.log('hello');
  //     };
  //   }
  // }, [auth.socket]);
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
        schedulePushNotification,
        expoPushToken,
        setExpoPushToken,
        notification,
        setNotification,
        isLoggedOutModalOpen,
        setIsLoggedOutModalOpen,
        chatsNotificationCount,
        setChatsNotificationCount,
        myUpcomingMeetups,
        setMyUpcomingMeetups,
        unreadFriendChats,
        setUnreadFriendChats,
        friendChatsNotificationCount,
        setFriendChatsNotificationCount,
      }}
    >
      <NavigationContainer
      // ref={ref}
      // onReady={() => {
      //   setRouteName(ref.getCurrentRoute().name);
      // }}
      // onStateChange={async () => {
      //   const previousRouteName = routeName;
      //   const currentRouteName = ref.getCurrentRoute().name;
      //   setRouteName(currentRouteName);
      // }}
      >
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen
              name='main'
              options={{
                headerShown: false,
              }}
              component={TabNavigator}
            />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
            <Stack.Screen
              name='CameraNew'
              component={Camera}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    {/* <Ionicons name='close-circle-outline' size={30} color={'white'} /> */}
                    <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
                  </TouchableOpacity>
                ),
                headerShown: true,
                title: '',
                headerTransparent: true,
              })}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>

      <LoadingSpinner />
      <SnackBar />
      <NotAvailableModal />
      <PleaseLoginModal />
    </GlobalContext.Provider>
  );
};

export default AppStack;
