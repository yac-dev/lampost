import React, { useEffect, useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import { Text, TouchableOpacity, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native-paper';
const Stack = createNativeStackNavigator();
import * as SecureStore from 'expo-secure-store';
import { io } from 'socket.io-client';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

import Map from '../Map/Container';
import Camera from '../Camera/Container';
import Schedule from '../Schedule/Container';
import QandA from '../Map/SelectedMeetup/QandA/Container';
import Lounge from '../Map/SelectedMeetup/Lounge/Container';
import User from '../User/Container';
import AddBadges from '../Utils/AddBadges/Container';

import AuthNavigator from './Auth';
import { appBottomSheetBackgroundColor, iconColorsTable } from '../../utils/colorsTable';

// ac
import { loadMe } from '../../redux/actionCreators/auth';
import { getSocket } from '../../redux/actionCreators/auth';

const MapNavigator = (props) => {
  const { auth } = useContext(GlobalContext);
  // mapの画面から、どんなcomponentへの遷移があるか、それが重要なのかもな。mainのmapはもちろん、そっからカメラのcomponent, 各userのpage, chat component、、、ここは色々多くなるはず。
  // 基本、map画面における全てのroutingをここに登録しておく。

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name='Map'
          component={Map}
          options={({ navigation }) => ({
            headerShown: true,
            title: 'Meetups',
            headerTransparent: true,
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            // headerLeft: () => {
            //   return (
            //     <TouchableOpacity onPress={() => navigation.navigate('About lampost')}>
            //       <MaterialCommunityIcons name='information' size={20} color={'white'} />
            //     </TouchableOpacity>
            //   );
            // },
            headerRight: () => {
              if (auth?.data) {
                if (auth?.data.photo) {
                  return (
                    // あとは、photoがあるかないかのチェックね。
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                      <Image source={{ uri: auth.data.photo }} style={{ width: 35, height: 35, borderRadius: 10 }} />
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    // user icon
                    <Text>User</Text>
                  );
                }
              } else {
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                  >
                    <MaterialCommunityIcons name='login' size={15} color={'white'} style={{ marginRight: 5 }} />
                    <Text style={{ color: 'white', fontSize: 17 }}>Login</Text>
                  </TouchableOpacity>
                );
              }
            },
          })}
        />
        <Stack.Screen name='Camera' component={Camera} options={{ headerShown: false }} />
        <Stack.Screen name='Schedule' component={Schedule} />
        <Stack.Screen name='QandA' component={QandA} />
        <Stack.Screen
          name='Lounge'
          component={Lounge}
          options={{
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            // headerTintColor: iconColorsTable['blue1'],
          }}
        />
        <Stack.Screen
          name='User'
          component={User}
          options={({ navigation }) => ({
            headerShown: true,
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            headerTintColor: 'white',
            // title: '',
            // headerTransparent: true,
            // headerLeft: () => <Button onPress={() => navigation.navigate('My page')}>User page</Button>,
            // headerRight: () => <Button onPress={() => navigation.navigate('My page')}>User page</Button>,
          })}
        />
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

export default MapNavigator;
