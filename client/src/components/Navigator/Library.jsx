// main libraries
import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native-paper';
const Stack = createNativeStackNavigator();

import Container from '../Library/Container';
import RollContainer from '../Library/Roll/Container';
import AuthNavigator from './Auth';

const LibraryNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name='Library'
          component={Container}
          options={({ navigation }) => ({
            headerShown: true,
            title: 'Library',
            // headerTransparent: true,
            // reduxのdata._idを使えばいいだけか。
            // headerLeft: () => <Button onPress={() => navigation.navigate('My page/Memoirs')}>User page</Button>,
            headerLeft: () => <Button onPress={() => console.log('hi')}>User page</Button>,
          })}
        />
        <Stack.Screen
          name='Roll'
          component={RollContainer}
          options={({ navigation }) => ({
            headerShown: true,
            title: 'Roll',
            // headerTransparent: true,
            // headerLeft: () => <Button onPress={() => navigation.navigate('My page/Memoirs')}>User page</Button>,
            // headerLeft: () => <Button onPress={() => console.log('hi')}>User page</Button>,
          })}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Stack.Screen
          name='My page/Rolls'
          component={AuthNavigator}
          options={({ navigation }) => ({
            title: 'My page',
            headerLeft: () => <Button onPress={() => navigation.goBack()}>Close</Button>,
            // titleだけ変えるようにしよう。基本、screenの名前は必ずuniqueにしないといかん。
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default LibraryNavigator;
