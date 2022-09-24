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

const MapNavigator = () => {
  // mapの画面から、どんなcomponentへの遷移があるか、それが重要なのかもな。mainのmapはもちろん、そっからカメラのcomponent, 各userのpage, chat component、、、ここは色々多くなるはず。
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name='Map' component={Map} options={{ headerShown: false }} />
        <Stack.Screen name='Camera' component={Camera} options={{ headerShown: false }} />
        {/* <Stack.Screen name='CalendarNavigator' component={CalendarNavigator} options={{ headerShown: false }} /> */}
        <Stack.Screen name='Calendar' component={CalendarTemp} options={{ headerShown: false }} />
        {/* <Stack.Screen name='Meetup' component={Calendar} options={{ headerShown: false }} /> */}
        <Stack.Screen name='Meetup' component={Meetup} />
        <Stack.Screen name='Crew' component={Crew} />

        <Stack.Screen name='Dummy' component={Dummy} options={{ headerShown: false }} />
        <Stack.Screen name='Dummy2' component={Dummy2} options={{ headerShown: false }} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name='Add comment'
          component={AddComment}
          options={{
            headerRight: () => (
              <Button onPress={() => alert('This is a button!')} va title='Info' color='blue'>
                red
              </Button>
            ),
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MapNavigator;
