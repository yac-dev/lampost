// main libraries
import React from 'react';
import { View, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// components
import CalendarContainer from '../Calendar/Container';

const CalendarNavigator = (props) => {
  return (
    // options={{ headerShown: false }}
    <Stack.Navigator>
      <Stack.Screen
        name='Calendar'
        component={CalendarContainer}
        options={{
          headerTitle: 'Meetup Schedule',
          headerLeft: () => <Button onPress={() => props.navigation.navigate('Map')} title='Back' color='blue' />,
        }}
        // options={{
        //   headerLeft: () => (
        //     <Button
        //       // onPress={() =>navigation.navigate("FirstScreen",{//stuff//})}
        //       title='Info'
        //       color='#fff'
        //     />
        //   ),
        // }}
      />
    </Stack.Navigator>
  );
};

export default CalendarNavigator;
