// main libraries
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Explore'
        component={MapNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => <MCIcon name={'routes'} color={color} size={size} />,
          tabBarLabel: () => {
            return null;
          },
        }}
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
