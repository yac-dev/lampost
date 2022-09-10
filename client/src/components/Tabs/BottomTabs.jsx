// main libraries
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

// components
import Map from '../Map/Map';
import SignUp from '../Auth/SignUp';
import Post from '../Post/Post';
import Auth from '../Auth/Auth';
import Feed from '../Feed/Container';
import TimeMachine from '../TimeMachine/Container';
// import LogInOrSignUp from '../Auth/LogInOrSignUp';

// asset
import timeMachine from '../../../assets/app/timeMachine.png';

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
          ),
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
          tabBarIcon: ({ size, color }) => <FontAwesome name='user' color={color} size={size} />,
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
