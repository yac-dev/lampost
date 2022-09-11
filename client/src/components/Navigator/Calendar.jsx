// main libraries
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// components
import CalendarContainer from '../Calendar/Container';

const CalendarNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Calendar' component={CalendarContainer} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default CalendarNavigator;
