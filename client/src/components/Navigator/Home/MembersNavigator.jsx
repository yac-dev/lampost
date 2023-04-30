import React, { useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();
import Members from '../../Home/MyMeetups/Members';
import User from '../../User/Container';

import { iconsTable } from '../../../utils/icons';
const { Ionicons } = iconsTable;

const MembersNavigator = () => {
  const { auth } = useContext(GlobalContext);

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name='Members'
          component={Members}
          options={({ navigation }) => ({
            headerShown: false,
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            headerTintColor: 'white',
          })}
        />
        <Stack.Screen
          name='User'
          component={User}
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='chevron-back' size={20} color={'white'} />
              </TouchableOpacity>
            ),
            headerTransparent: true,
            title: '',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            // headerTintColor: 'white',
          })}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}></Stack.Group>
    </Stack.Navigator>
  );
};
// あとは、user infoをここに載せていく。

export default MembersNavigator;
