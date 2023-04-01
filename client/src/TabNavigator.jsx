import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapNavigator from './components/Navigator/Map';
import LibraryNavigator from './components/Navigator/Library';
import AuthNavigator from './components/Navigator/Auth';
import LoadingSpinner from './components/Utils/LoadingSpinner';
import NotAvailableModal from './components/Utils/NotAvailableModal';
import PleaseLoginModal from './components/Utils/PleaseLoginModal';
import SnackBar from './components/Utils/SnackBar';
import Camera from './components/Camera/Container';
// import DummyCamera from './components/DummyCamera';
import Video from './components/Video';

const ref = createNavigationContainerRef();
const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  return (
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
        <Tab.Group>
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
            component={ChatBase}
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
                <FontAwesome5 name='user-astronaut' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={size} />
              ),
              tabBarLabel: 'Profile',
              tabBarBadge: friendChatsNotificationCount ? friendChatsNotificationCount : null,
              tabBarBadgeStyle: { backgroundColor: iconColorsTable['blue1'] },
            })}
          />
        </Tab.Group>
        <Tab.Group screenOptions={{ presentation: 'fullScreenModal' }}>
          <Tab.Screen
            name='CameraNew'
            component={Camera}
            options={{
              headerShown: false,
            }}
          />
        </Tab.Group>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
