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

// import MapNavigator from './components/Navigator/Discover/Map';
// import LibraryNavigator from './components/Navigator/Discover/Libraries';
import AuthNavigator from './components/Navigator/Auth';
import LoadingSpinner from './components/Utils/LoadingSpinner';
import SnackBar from './components/Utils/SnackBar';
import Camera from './components/Camera/Container';
import TagMembers from './components/Camera/TagMembers';
import TabNavigator from './TabNavigator';
import AboutLampost from './components/Utils/AboutLampost';
const ref = createNavigationContainerRef();
const Tab = createBottomTabNavigator();
// ac
import { loadMe } from './redux/actionCreators/auth';
import { getSocket } from './redux/actionCreators/auth';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: false, shouldSetBadge: false }),
});

const AppStack = (props) => {
  const isIpad = Platform.OS === 'ios' && (Platform.isPad || Platform.isTVOS);
  const [isFetchedAuthData, setIsFetchedAuthData] = useState(false);
  const [auth, setAuth] = useState({
    data: null,
    socket: null,
    isAuthenticated: false,
    currentLocation: null,
    isInMeetup: false,
  });
  const [notificationEnabled, setNotificationEnabled] = useState(false);
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
  const [myJoinedLibraries, setMyJoinedLibraries] = useState([]);
  const [selectedLibraryDetailComponent, setSelectedLibraryDetailComponent] = useState('');
  const [isFetchedMyUpcomingMeetups, setIsFetchedMyUpcomingMeetups] = useState(false);
  const [isFetchedMyJoinedLibraries, setIsFetchedMyJoinedLibraries] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [unreadFriendChats, setUnreadFriendChats] = useState({});
  const [friendChatsNotificationCount, setFriendChatsNotificationCount] = useState(0);
  const userMenuBottomSheetRef = useRef(null);

  const registerForPushNotificationsAsync = async () => {
    let token;
    const data = { token, status: false };
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
        data.status = false;
        return data;
      }
      token = (await Notifications.getExpoPushTokenAsync({ experienceId: '@yosuke_kojima/Lampost' })).data;
      console.log('this is a token', token);
      data.token = token;
      data.status = true;
      // console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
    // return token;
    return data;
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      registerForPushNotificationsAsync().then(async (data) => {
        if (data.status) {
          setNotificationEnabled(true);
          if (!auth.data.pushToken) {
            const result = await lampostAPI.patch(`/users/${auth.data._id}/pushToken`, { pushToken: data.token });
            const { pushToken } = result.data;
            setExpoPushToken(data.token);
            setAuth((previous) => {
              return {
                ...previous,
                pushToken,
              };
            });
          }
        } else {
          setNotificationEnabled(false);
        }
      });
    }
  }, [auth.isAuthenticated]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      if (notificationEnabled) {
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
                updating[notification.request.content.data.sender._id].chats.push(
                  notification.request.content.data.chat
                );
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
      }
      // }
    }
  }, [auth.isAuthenticated, notificationEnabled]);

  const getMyUpcomingMeetupStates = async () => {
    const result = await lampostAPI.get(`/meetupanduserrelationships/upcoming/user/${auth.data._id}`);
    const { myUpcomingMeetups } = result.data;
    // console.log(myUpcomingMeetups);
    setMyUpcomingMeetups((previous) => {
      const updating = { ...previous };
      for (const meetupId in myUpcomingMeetups) {
        updating[meetupId] = {
          _id: myUpcomingMeetups[meetupId]._id,
          title: myUpcomingMeetups[meetupId].title,
          state: myUpcomingMeetups[meetupId].state,
          startDateAndTime: myUpcomingMeetups[meetupId].startDateAndTime,
          launcher: myUpcomingMeetups[meetupId].launcher,
          place: myUpcomingMeetups[meetupId].place,
          duration: myUpcomingMeetups[meetupId].duration,
          fee: myUpcomingMeetups[meetupId].fee,
          isRSVPed: myUpcomingMeetups[meetupId].isRSVPed,
          unreadChatsTable: {
            general: 0,
            reply: 0,
            question: 0,
            help: 0,
            edited: 0,
            image: 0,
          },
        };
      }

      return updating;
    });
    setIsFetchedMyUpcomingMeetups(true);
    setChatsNotificationCount(0);
  };
  useEffect(() => {
    if (auth.isAuthenticated) {
      getMyUpcomingMeetupStates();
      // ここも、appStateが変わるたびに動かさなきゃいけない。→  app stateごとに動かすのは上で。
    }
  }, [auth.isAuthenticated]);

  // unreadchatsをgetする。
  const getUnreadChats = async () => {
    // console.log(myUpcomingMeetups);
    if (Object.keys(myUpcomingMeetups).length) {
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
    }
  };

  useEffect(() => {
    if (isFetchedMyUpcomingMeetups) {
      getUnreadChats();
      // setIsFetchedMyUpcomingMeetups(false);
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
          // getUnreadFriendChats();
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

  return (
    <GlobalContext.Provider
      value={{
        isFetchedAuthData,
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
        // schedulePushNotification,
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
        myJoinedLibraries,
        setMyJoinedLibraries,
        unreadFriendChats,
        setUnreadFriendChats,
        friendChatsNotificationCount,
        setFriendChatsNotificationCount,
        userMenuBottomSheetRef,
        navigation: props.navigation,
        notificationEnabled,
        setNotificationEnabled,
        registerForPushNotificationsAsync,
        isFetchedMyUpcomingMeetups,
        isFetchedMyJoinedLibraries,
        setIsFetchedMyJoinedLibraries,
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
            <Stack.Screen
              name='Profile Top'
              component={AuthNavigator}
              options={({ navigation }) => ({
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: appBottomSheetBackgroundColor,
                  borderBottomWidth: 0,
                },
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
                  </TouchableOpacity>
                ),
                headerShown: true,
                title: 'Profile',
                // headerTransparent: true,
              })}
            />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
            <Stack.Screen
              name='About Lampost'
              component={AboutLampost}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    {/* <Ionicons name='close-circle-outline' size={30} color={'white'} /> */}
                    <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
                  </TouchableOpacity>
                ),
                headerShown: true,
                title: 'About Lampost',
                headerStyle: {
                  backgroundColor: appBottomSheetBackgroundColor,
                  borderBottomWidth: 0,
                },
                // headerTransparent: true,
              })}
            />
            <Stack.Screen
              name='Tag members'
              component={TagMembers}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    {/* <Ionicons name='close-circle-outline' size={30} color={'white'} /> */}
                    <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
                  </TouchableOpacity>
                ),
                headerShown: true,
                title: 'Tag members?',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  color: 'white',
                },
                headerTintColor: 'white',
                headerStyle: {
                  backgroundColor: appBottomSheetBackgroundColor,
                  borderBottomWidth: 0,
                },
                // headerTransparent: true,
              })}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
      {/* <UserMenuBottomSheet /> */}
      <LoadingSpinner />
      <SnackBar />
    </GlobalContext.Provider>
  );
};

export default AppStack;
