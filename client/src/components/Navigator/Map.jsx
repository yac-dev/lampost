// main libraries
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native-paper';
const Stack = createNativeStackNavigator();
import * as SecureStore from 'expo-secure-store';
import { io } from 'socket.io-client';

// components
import Map from '../Map/Container';
import Camera from '../Camera/Container';
import Schedule from '../Schedule/Container';
import Meetup from '../Meetup/Container';
import Crew from '../Crew/Container';
import QandA from '../Map/SelectedMeetup/QandA/Container';
import Lounge from '../Map/SelectedMeetup/Lounge/Container';
import User from '../User/Container';
import SendChat from '../Meetup/SendChat';
import AddBadges from '../Utils/AddBadges/Container';

import AuthNavigator from './Auth';

// ac
import { loadMe } from '../../redux/actionCreators/auth';
import { getSocket } from '../../redux/actionCreators/auth';

const MapNavigator = (props) => {
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
            title: '',
            headerTransparent: true,
            // headerLeft: () => <Button onPress={() => navigation.navigate('My page')}>User page</Button>,
            // headerRight: () => <Button onPress={() => navigation.navigate('My page')}>User page</Button>,
          })}
        />
        <Stack.Screen name='Camera' component={Camera} options={{ headerShown: false }} />
        <Stack.Screen name='Schedule' component={Schedule} />
        <Stack.Screen
          name='Meetup'
          component={Meetup}
          options={({ navigation }) => ({
            // headerRight: () => (<Button icon='camera' onPress={() => navigation.navigate('SendChat')}>Send</Button>),
          })}
        />
        <Stack.Screen name='Crew' component={Crew} />
        <Stack.Screen name='QandA' component={QandA} />
        <Stack.Screen name='Lounge' component={Lounge} />
        <Stack.Screen
          name='User'
          component={User}
          options={({ navigation }) => ({
            headerShown: true,
            // title: '',
            // headerTransparent: true,
            // headerLeft: () => <Button onPress={() => navigation.navigate('My page')}>User page</Button>,
            // headerRight: () => <Button onPress={() => navigation.navigate('My page')}>User page</Button>,
          })}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Stack.Screen
          name='My page'
          component={AuthNavigator}
          options={({ navigation }) => ({
            headerLeft: () => <Button onPress={() => navigation.goBack()}>Close</Button>,
          })}
        />
        <Stack.Screen
          name='SendChat'
          component={SendChat}
          options={({ navigation }) => ({
            headerLeft: () => <Button onPress={() => navigation.goBack()}>Close</Button>,
            headerRight: () => <Button onPress={() => navigation.goBack()}>Send</Button>,
          })}
        />
        <Stack.Screen
          name='Add badges'
          component={AddBadges}
          options={({ navigation }) => ({
            headerLeft: () => <Button onPress={() => navigation.goBack()}>Close</Button>,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MapNavigator;
