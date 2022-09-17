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
import Ex from './ex';

// asset
import timeMachine from '../../../assets/app/timeMachine.png';

const Tab = createBottomTabNavigator();

const TempBottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Ex1'
        component={Ex}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => <MCIcon name={'routes'} color={color} size={size} />,
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      <Tab.Screen
        name='Ex2'
        component={Ex}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => <FontAwesome name='feed' color={color} size={size} />,
          tabBarLabel: () => {
            return null;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TempBottomTabs;
