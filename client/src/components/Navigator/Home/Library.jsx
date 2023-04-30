import React, { useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();
import LibraryContainer from '../../Home/Library/Container';
import Page1 from '../../Home/Library/Page1';
import AddAssets from '../../Utils/AddAssets/Container';
import DateAssets from '../../Home/Library/DateAssets/Container';
import { appBottomSheetBackgroundColor } from '../../../utils/colorsTable';

const LibraryNavigator = () => {
  const { auth } = useContext(GlobalContext);

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name='Library'
          component={LibraryContainer}
          options={({ navigation }) => ({
            headerShown: false,
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            headerTintColor: 'white',
          })}
        />
        <Stack.Screen
          name='Date assets'
          component={DateAssets}
          options={({ navigation }) => ({
            title: '',
            headerTransparent: true,
            headerShown: true,
            // headerStyle: {
            //   backgroundColor: appBottomSheetBackgroundColor,
            // },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
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
      <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
        <Stack.Screen
          name='Post my snap'
          component={AddAssets}
          options={({ navigation }) => ({
            title: 'Post my snaps',
            headerShown: true,
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
              borderBottomWidth: 0,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            headerTintColor: 'white',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default LibraryNavigator;
