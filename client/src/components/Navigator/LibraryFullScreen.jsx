import React, { useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();
import LibraryContainer from '../Home/Libraries/Library/Container';
import Page1 from '../Home/Libraries/Library/Page1';

const HomeMyMeetupsNavigator = () => {
  const { auth } = useContext(GlobalContext);

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name='Library'
          component={LibraryContainer}
          options={({ navigation }) => ({
            headerShown: false,
            // title: 'Basecamp',

            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            headerTintColor: 'white',
          })}
        />
        <Stack.Screen
          name='Page1'
          component={Page1}
          options={({ navigation }) => ({
            headerShown: true,
            // title: 'Basecamp',

            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            // headerTintColor: 'white',
          })}
        />
        {/* <Stack.Screen
          name='Library'
          component={Library}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
              borderBottomWidth: 0,
            },
            // title: 'Basecamp',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            headerTintColor: 'white',
            // headerTintColor: {
            //   color: 'white',
            // },
          })}
        /> */}
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeMyMeetupsNavigator;
