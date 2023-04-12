import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import GlobalContext from './GlobalContext';
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapNavigator from './components/Navigator/Map';
import LibraryNavigator from './components/Navigator/Library';
import AuthNavigator from './components/Navigator/Auth';
import LoadingSpinner from './components/Utils/LoadingSpinner';
import NotAvailableModal from './components/Utils/NotAvailableModal';
import PleaseLoginModal from './components/Utils/PleaseLoginModal';
import SnackBar from './components/Utils/SnackBar';
import Camera from './components/Camera/Container';
import { iconsTable } from './utils/icons';
import { appBottomSheetBackgroundColor, iconColorsTable, backgroundColorsTable } from './utils/colorsTable';
import Cal from './components/Schedule/Container';

// const ref = createNavigationContainerRef();
const Tab = createBottomTabNavigator();

const CameraBase = () => <View style={{ flex: 1, backgroundColor: 'red' }} />;

const RootNavigator = () => {
  const { MaterialCommunityIcons, Ionicons, FontAwesome5, MaterialIcons } = iconsTable;
  const { chatsNotificationCount, friendChatsNotificationCount } = useContext(GlobalContext);

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
        name='Camera'
        component={CameraBase}
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
            navigation.navigate('CameraNew'); // <-- Here you put the name where the chat component is declared
          },
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
      />

      {/* 全てのcomponent、navigatorを足さないといけないわ。Mapと全く同じように。この状態だと。mapの方のuser page routeに行く。*/}
      <Tab.Screen
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
          tabBarBadge: friendChatsNotificationCount ? friendChatsNotificationCount : null,
          tabBarBadgeStyle: { backgroundColor: iconColorsTable['blue1'] },
        })}
      />
      <Tab.Screen
        name='Cal'
        component={Cal}
        options={({ navigation }) => ({
          headerShown: false,
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
      />
    </Tab.Navigator>
  );
};

export default RootNavigator;
