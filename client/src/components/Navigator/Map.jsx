// main libraries
import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native-paper';
const Stack = createNativeStackNavigator();

// components
import Map from '../Map/Map';
import Camera from '../Camera/Container';
import CalendarTemp from '../Calendar/ContainerTemp';
import Meetup from '../Meetup/Container';
import Crew from '../Meetup/Crew/Container';
import AddComment from '../GroupChat/AddComment';
import Dummy from '../Dummy/Dummy';
import Dummy2 from '../Dummy/Dummy2';
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
        <Stack.Screen name='Calendar' component={CalendarTemp} />
        {/* <Stack.Screen name='Meetup' component={Calendar} options={{ headerShown: false }} /> */}
        <Stack.Screen
          name='Meetup'
          component={Meetup}
          options={({ navigation }) => ({
            headerRight: () => <Button onPress={() => navigation.navigate('Add comment')}>Add comment</Button>,
          })}
        />
        <Stack.Screen name='Crew' component={Crew} />
        <Stack.Screen name='Dummy' component={Dummy} options={{ headerShown: false }} />
        <Stack.Screen name='Dummy2' component={Dummy2} options={{ headerShown: false }} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Stack.Screen
          name='My page'
          component={AuthNavigator}
          options={({ navigation }) => ({
            headerLeft: () => <Button onPress={() => navigation.goBack()}>Close</Button>,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MapNavigator;
