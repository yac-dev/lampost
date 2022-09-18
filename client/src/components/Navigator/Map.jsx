// main libraries
import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// components
import Map from '../Map/Map';
import Camera from '../Camera/Container';
import CalendarTemp from '../Calendar/ContainerTemp';
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
        <Stack.Screen name='Dummy' component={Dummy} options={{ headerShown: false }} />
        <Stack.Screen name='Dummy2' component={Dummy2} options={{ headerShown: false }} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name='ModalExample' component={Dummy} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MapNavigator;
