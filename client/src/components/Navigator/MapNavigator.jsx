// main libraries
import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// components
import Map from '../Map/Map';
import Camera from '../Camera/Container';

const MapNavigator = () => {
  // mapの画面から、どんなcomponentへの遷移があるか、それが重要なのかもな。mainのmapはもちろん、そっからカメラのcomponent, 各userのpage, chat component、、、ここは色々多くなるはず。
  return (
    <Stack.Navigator>
      <Stack.Screen name='Map' component={Map} options={{ headerShown: false }} />
      <Stack.Screen name='Camera' component={Camera} options={{ headerShown: false }} />
      {/* <Stack.Screen name='LogIn' component={LogIn} /> */}
    </Stack.Navigator>
  );
};

export default MapNavigator;
