// main libraries
import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native-paper';
const Stack = createNativeStackNavigator();

// components
import Map from '../Map/Map';
import Camera from '../Camera/Container';
import Schedule from '../Schedule/Container';
import Meetup from '../Meetup/Container';
import Crew from '../Crew/Container';
import Comments from '../Map/SelectedMeetup/Comments';
import User from '../User/Container';
import SendChat from '../Meetup/SendChat';

import AuthNavigator from './Auth';

const MapNavigator = () => {
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
            // reduxのdata._idを使えばいいだけか。
            headerLeft: () => <Button onPress={() => navigation.navigate('My page')}>User page</Button>,
          })}
        />
        <Stack.Screen name='Camera' component={Camera} options={{ headerShown: false }} />
        {/* <Stack.Screen name='CalendarNavigator' component={CalendarNavigator} options={{ headerShown: false }} /> */}
        <Stack.Screen name='Schedule' component={Schedule} />
        {/* <Stack.Screen name='Meetup' component={Calendar} options={{ headerShown: false }} /> */}
        <Stack.Screen
          name='Meetup'
          component={Meetup}
          options={({ navigation }) => ({
            headerRight: () => (
              <Button icon='camera' onPress={() => navigation.navigate('SendChat')}>
                Send
              </Button>
            ),
          })}
        />
        <Stack.Screen name='Crew' component={Crew} />
        <Stack.Screen name='Q&A' component={Comments} />
        <Stack.Screen name='User' component={User} />
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
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MapNavigator;
