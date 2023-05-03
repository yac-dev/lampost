import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { appBottomSheetBackgroundColor } from '../../../utils/colorsTable';
const Stack = createNativeStackNavigator();
import Inbox from '../../Inbox/Container';
import User from '../../User/Container';
import LibraryMembers from '../../Libraries/LibraryOverviewBottomSheet/Members';
import LibrarySnaps from '../../Libraries/LibraryOverviewBottomSheet/Assets';

const InboxTopLevelNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name='Inbox'
          component={Inbox}
          options={({ navigation }) => ({
            headerShown: true,
            // headerTransparent: true,
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
              borderBottomWidth: 0,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            headerTintColor: 'white',
            // headerLeft: () => <Button onPress={() => navigation.navigate('My page/Memoirs')}>User page</Button>,
          })}
        />
        <Stack.Screen
          name='User'
          component={User}
          options={({ navigation }) => ({
            headerShown: true,
            // headerTransparent: true,
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
              borderBottomWidth: 0,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            headerTintColor: 'white',
            // headerLeft: () => <Button onPress={() => navigation.navigate('My page/Memoirs')}>User page</Button>,
          })}
        />
        <Stack.Screen
          name='Library members'
          component={LibraryMembers}
          options={({ navigation }) => ({
            headerShown: true,
            // headerTransparent: true,
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
              borderBottomWidth: 0,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            headerTintColor: 'white',
            // headerLeft: () => <Button onPress={() => navigation.navigate('My page/Memoirs')}>User page</Button>,
          })}
        />
        <Stack.Screen
          name='Library snaps'
          component={LibrarySnaps}
          options={({ navigation }) => ({
            headerShown: true,
            // headerTransparent: true,
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
              borderBottomWidth: 0,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            headerTintColor: 'white',
            // headerLeft: () => <Button onPress={() => navigation.navigate('My page/Memoirs')}>User page</Button>,
          })}
        />
      </Stack.Group>
      {/* <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Stack.Screen
          name='My page/Memoirs'
          component={AuthNavigator}
          options={({ navigation }) => ({
            title: 'My page',
            headerLeft: () => <Button onPress={() => navigation.goBack()}>Close</Button>,
            // titleだけ変えるようにしよう。基本、screenの名前は必ずuniqueにしないといかん。
          })}
        />
      </Stack.Group> */}
    </Stack.Navigator>
  );
};

export default InboxTopLevelNavigator;
