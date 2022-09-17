// main libraries
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

// components
import MapNavigator from '../Navigator/Map';
import AuthNavigator from '../Navigator/Auth';
import Feed from '../Feed/Container';
import TimeMachine from '../TimeMachine/Container';

// asset
import timeMachine from '../../../assets/app/timeMachine.png';

const Tab = createBottomTabNavigator();

const BottomTabs = (props) => {
  // const getTabBarVisibility = (route) => {
  //   const routeName = route.state ? route.state.routes[route.state.index].name : '';
  //   if (routeName === 'Dummy') {
  //     return false;
  //   }
  //   return true;
  // };

  console.log(props.routeName);
  const hide = props.routeName === 'Camera' || props.routeName === 'Dummy' || props.routeName === 'Dummy2';

  const kk = () => {
    switch (props.routeName) {
      case 'Camera':
        return { display: 'none' };
      case 'Dummy':
        return { display: 'none' };
      default:
        return { display: 'flex' };
    }
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Explore'
        component={MapNavigator}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ size, color }) => <MCIcon name={'routes'} color={color} size={size} />,
          tabBarLabel: () => {
            return null;
          },
          tabBarStyle: { display: hide ? 'none' : 'flex' },
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
        name='Feed'
        component={Feed}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => <FontAwesome name='feed' color={color} size={size} />,
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      <Tab.Screen
        name='Time Machine'
        component={TimeMachine}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            // <Image
            //   color={color}
            //   style={{ width: 24, height: 24 }}
            //   source={require('../../../assets/app/timeMachine.png')}
            // />
            <MaterialIcons name='video-library' color={color} size={size} />
            // 本当はtime machineのiconにしたい。
          ),
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      <Tab.Screen
        name='Notifications'
        component={TimeMachine}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => <Entypo name='bell' color={color} size={size} />,
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      <Tab.Screen
        name='Chat'
        component={TimeMachine}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => <MaterialIcons name='chat' color={color} size={size} />,
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      <Tab.Screen
        name='User'
        component={AuthNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => <FontAwesome name='user' color={color} size={size} />,
          tabBarLabel: () => {
            return null;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
