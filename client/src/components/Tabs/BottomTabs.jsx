// main libraries
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';

// components
import Map from '../Map/Map';
import SignUp from '../Auth/SignUp';
import Post from '../Post/Post';
import Auth from '../Auth/Auth';
// import LogInOrSignUp from '../Auth/LogInOrSignUp';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Explore'
        component={Map}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => <MCIcon name={'routes'} color={color} size={size} />,
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      <Tab.Screen
        name='Auth'
        component={Auth}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => <FA5Icon name={'user-ninja'} color={color} size={size} />,
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      <Tab.Screen
        name='Hot'
        component={Post}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => <AntIcon name={'setting'} color={color} size={size} />,
          tabBarLabel: () => {
            return null;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
