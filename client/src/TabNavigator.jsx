import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GlobalContext from './GlobalContext';
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapNavigator from './components/Navigator/Discover/Map';
import LibraryNavigator from './components/Navigator/Discover/Libraries';
import HomeTopTabsNavigator from './components/Navigator/Home/TopTabsNavigator';
import HomeTopLevel from './components/Navigator/Home/TopLevel';
import DiscoverTopLevel from './components/Navigator/Discover/TopLevel';
import InboxTopLevel from './components/Navigator/Inbox/TopLevel';
import CameraNavigator from './components/Navigator/Camera';
// import HomeTopTab from './components/Navigator/HomeTopTab';
// import HomeNavigator from './components/Navigator/Home';
import AuthNavigator from './components/Navigator/Auth';
// import DiscoverNavigatorContainer from './components/Navigator/Discover/Container';
// import DiscoverTopTab from './components/Navigator/DiscoverTopTab';
import LoadingSpinner from './components/Utils/LoadingSpinner';
import SnackBar from './components/Utils/SnackBar';
import { iconsTable } from './utils/icons';
import { appBottomSheetBackgroundColor, iconColorsTable, backgroundColorsTable } from './utils/colorsTable';

// const ref = createNavigationContainerRef();
const Tab = createBottomTabNavigator();

const CameraBase = () => <View style={{ flex: 1, backgroundColor: 'red' }} />;

const RootNavigator = () => {
  const { auth } = useContext(GlobalContext);
  const { MaterialCommunityIcons, Ionicons, FontAwesome5, MaterialIcons, Entypo } = iconsTable;
  const { chatsNotificationCount } = useContext(GlobalContext);

  // tabBarStyle: { display: 'none' }
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          // display: hide ? 'none' : 'flex',
          backgroundColor: appBottomSheetBackgroundColor,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: 'white',
      }}
    >
      <Tab.Screen
        name='HomeTopLevel'
        component={HomeTopLevel}
        options={({ navigation }) => ({
          headerShown: true,
          headerRight: () => {
            if (auth.isAuthenticated) {
              return (
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('Profile Top')}>
                  {/* <Ionicons name='close-circle-outline' size={30} color={'white'} /> */}
                  {/* <Text style={{ color: 'white', fontSize: 20 }}>pro</Text> */}
                  <MaterialCommunityIcons name='account-circle' size={30} color={'white'} />
                </TouchableOpacity>
              );
            } else {
              return null;
            }
          },
          headerLeft: () => {
            return (
              <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate('About Lampost')}>
                {/* <Ionicons name='close-circle-outline' size={30} color={'white'} /> */}
                {/* <Text style={{ color: 'white', fontSize: 20 }}>pro</Text> */}
                <MaterialCommunityIcons name='information' size={25} color={'white'} />
              </TouchableOpacity>
            );
          },
          title: 'Home',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: appBottomSheetBackgroundColor,
            borderBottomWidth: 0,
          },
          tabBarLabel: 'Home',
          tabBarBadge: chatsNotificationCount ? chatsNotificationCount : null,
          tabBarStyle: {
            // display: hide ? 'none' : 'flex',
            backgroundColor: appBottomSheetBackgroundColor,
            borderTopWidth: 0,
          },
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons name='list' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={size} />
          ),
        })}
      />

      <Tab.Screen
        name='DiscoverTopLevel'
        component={DiscoverTopLevel}
        options={({ navigation }) => ({
          headerShown: true,
          headerRight: () => {
            if (auth.isAuthenticated) {
              return (
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('Profile Top')}>
                  {/* <Ionicons name='close-circle-outline' size={30} color={'white'} /> */}
                  {/* <Text style={{ color: 'white', fontSize: 20 }}>pro</Text> */}
                  <MaterialCommunityIcons name='account-circle' size={30} color={'white'} />
                </TouchableOpacity>
              );
            } else {
              return null;
            }
          },
          title: 'Discover',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: appBottomSheetBackgroundColor,
            borderBottomWidth: 0,
          },
          // headerTransparent: true,
          // headerLeft: () => <Button onPress={() => navigation.navigate('Add comment')}>User page</Button>,
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons name='compass' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={size} />
          ),
          showLabel: false,
          tabBarLabel: 'Find',
          // tabBarBadge: friendChatsNotificationCount ? friendChatsNotificationCount : null,
          // tabBarBadgeStyle: { backgroundColor: iconColorsTable['blue1'] },
        })}
      />

      <Tab.Screen
        name='Camera'
        component={CameraNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Camera',
          tabBarIcon: ({ size, color, focused }) => (
            <MaterialCommunityIcons name='camera' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={size} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate('CameraNew');
          },
        })}
      />

      <Tab.Screen
        name='InboxTopLevel'
        component={InboxTopLevel}
        options={({ navigation }) => ({
          headerShown: true,
          headerRight: () => {
            if (auth.isAuthenticated) {
              return (
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('Profile Top')}>
                  {/* <Ionicons name='close-circle-outline' size={30} color={'white'} /> */}
                  {/* <Text style={{ color: 'white', fontSize: 20 }}>pro</Text> */}
                  <MaterialCommunityIcons name='account-circle' size={30} color={'white'} />
                </TouchableOpacity>
              );
            } else {
              return null;
            }
          },
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: appBottomSheetBackgroundColor,
            borderBottomWidth: 0,
          },
          title: 'Inbox',
          // headerTransparent: true,
          // headerLeft: () => <Button onPress={() => navigation.navigate('Add comment')}>User page</Button>,
          tabBarIcon: ({ size, color, focused }) => (
            <MaterialCommunityIcons name='mailbox' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={size} />
          ),
          showLabel: false,
          tabBarLabel: 'Inbox',
          // tabBarBadge: friendChatsNotificationCount ? friendChatsNotificationCount : null,
          // tabBarBadgeStyle: { backgroundColor: iconColorsTable['blue1'] },
        })}
      />

      {/* <Tab.Screen
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
          tabBarBadge: chatsNotificationCount ? chatsNotificationCount : null,
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
        name='LibraryNavigator'
        component={LibraryNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Libraries',
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons name='ios-library-sharp' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={size} />
          ),
          showLabel: false,
        }}
      /> */}

      {/* 全てのcomponent、navigatorを足さないといけないわ。Mapと全く同じように。この状態だと。mapの方のuser page routeに行く。*/}
      {/* <Tab.Screen
        name='Auth'
        component={AuthNavigator}
        options={({ navigation }) => ({
          headerShown: false,
          // headerTransparent: true,
          // headerLeft: () => <Button onPress={() => navigation.navigate('Add comment')}>User page</Button>,
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons name='person' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={size} />
          ),
          showLabel: false,
          tabBarLabel: 'Profile',
          tabBarBadgeStyle: { backgroundColor: iconColorsTable['blue1'] },
        })}
      /> */}

      {/* <Tab.Screen
        name='Cal'
        component={Cal}
        options={({ navigation }) => ({
          headerShown: true,
          // headerTransparent: true,
          // headerLeft: () => <Button onPress={() => navigation.navigate('Add comment')}>User page</Button>,
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons name='person' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={size} />
          ),
          showLabel: false,
          tabBarLabel: 'Cal',
          tabBarBadge: friendChatsNotificationCount ? friendChatsNotificationCount : null,
          tabBarBadgeStyle: { backgroundColor: iconColorsTable['blue1'] },
        })}
      /> */}
    </Tab.Navigator>
  );
};

export default RootNavigator;
