import React, { useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Container from '../Libraries/Container';
import LibraryContainer from '../Libraries/Library/Container';
import AuthNavigator from './Auth';
import User from '../User/Container';
import Logs from '../User/Logs/Container';
import Asset from '../Libraries/Library/Asset/Container';
import { baseBackgroundColor, appBottomSheetBackgroundColor } from '../../utils/colorsTable';
import AddBadges from '../Utils/AddBadges/Container';
import AddAssets from '../Utils/AddAssets/Container';

const LibraryNavigator = () => {
  const { auth } = useContext(GlobalContext);

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name='Libraries'
          component={Container}
          options={({ navigation }) => ({
            headerShown: true,
            title: 'Libraries',
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            // headerRight: () => {
            //   if (auth?.data) {
            //     return (
            //       <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            //         <Image source={{ uri: auth.data.photo }} style={{ width: 35, height: 35, borderRadius: 10 }} />
            //       </TouchableOpacity>
            //     );
            //   } else {
            //     return null; // login用のあれを出す感じ。
            //   }
            // },
            // headerTransparent: true,
            // headerTransparent: true,
            // reduxのdata._idを使えばいいだけか。
            // headerLeft: () => <Button onPress={() => navigation.navigate('My page/Memoirs')}>User page</Button>,
            // headerLeft: () => <Button onPress={() => console.log('hi')}>User page</Button>,
          })}
        />
        <Stack.Screen
          name='Library'
          component={LibraryContainer}
          options={({ navigation }) => ({
            headerShown: true,
            title: 'Library',
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
        <Stack.Screen
          name='Asset'
          component={Asset}
          options={({ navigation }) => ({
            headerShown: true,
            title: 'Asset',
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
        <Stack.Screen
          name='User'
          component={User}
          options={({ navigation }) => ({
            headerShown: true,
            title: 'User',
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            headerTintColor: 'white',
          })}
        />
        <Stack.Screen
          name='Logs'
          component={Logs}
          options={{
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            headerTintColor: 'white',
          }}
        />
        {/* <Stack.Screen
          name='Roll'
          component={RollContainer}
          options={({ navigation }) => ({
            headerShown: true,
            title: 'Roll',
          })}
        /> */}
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Stack.Screen
          name='Profile'
          component={AuthNavigator}
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name='Add badges'
          component={AddBadges}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', fontSize: 20 }}>Cancel</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'Badges for library',
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
        <Stack.Screen // assetsのfull screen
          name='Add assets'
          component={AddAssets}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', fontSize: 20 }}>Cancel</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'Add assets',
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default LibraryNavigator;
