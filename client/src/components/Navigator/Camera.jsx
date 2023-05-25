import React, { useState, useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import { Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Camera from '../Camera/Container';
import TagMembers from '../Camera/TagMembers/Container';

const CameraNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name='Camera'
          component={Camera}
          options={({ navigation }) => ({
            // headerShown: true,
            // headerTransparent: true,
            // headerLeft: () => <Button onPress={() => navigation.navigate('My page/Memoirs')}>User page</Button>,
          })}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}></Stack.Group>
    </Stack.Navigator>
  );
};

export default CameraNavigator;
