import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Map from '../../Map/Container';
import User from '../../User/Container';
import AddBadges from '../../Utils/AddBadges/Container';
import ReportMeetup from '../../Map/ReportMeetup';
import ReportUser from '../../Utils/ReportUser';
import LaunchNewMeetup from '../../Map/LaunchNewMeetup/Container';
import WriteDescription from '../../Map/LaunchNewMeetup/WriteDescription';
import SelectVenueForLaunch from '../../Map/LaunchNewMeetup/SelectVenueForLaunch';
import { appBottomSheetBackgroundColor } from '../../../utils/colorsTable';
import CreateBadge from '../../User/CreateBadge/Container';
import IconPicker from '../../Utils/IconPicker/Container';

const MapNavigator = (props) => {
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
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            // headerLeft: () => {
            //   return (
            //     <TouchableOpacity onPress={() => navigation.navigate('About Lampost')}>
            //       <Ionicons name='information-circle' size={25} color={'white'} />
            //     </TouchableOpacity>
            //   );
            // },
          })}
        />
        <Stack.Screen
          name='User'
          component={User}
          options={({ navigation }) => ({
            headerShown: true,
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            headerTintColor: 'white',
          })}
        />
        <Stack.Screen
          name='Report meetup'
          component={ReportMeetup}
          options={({ navigation }) => ({
            headerShown: true,
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
        <Stack.Screen
          name='Report user'
          component={ReportUser}
          options={({ navigation }) => ({
            headerShown: true,
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
        <Stack.Screen
          name='Select venue for launch'
          component={SelectVenueForLaunch}
          options={({ navigation }) => ({
            title: 'Select venue',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', fontSize: 20 }}>Cancel</Text>
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
        <Stack.Screen
          name='Write meetup description'
          component={WriteDescription}
          options={({ navigation }) => ({
            title: 'Meetup description',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', fontSize: 20 }}>Cancel</Text>
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
        <Stack.Screen
          name='Icon picker'
          component={IconPicker}
          options={({ navigation }) => ({
            title: 'Icon picker',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', fontSize: 20 }}>Cancel</Text>
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Stack.Screen
          name='Launch new meetup'
          component={LaunchNewMeetup}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', fontSize: 20 }}>Cancel</Text>
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
        <Stack.Screen
          name='Add badges'
          component={AddBadges}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', fontSize: 20 }}>Cancel</Text>
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
        <Stack.Screen
          name='Create badge'
          component={CreateBadge}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', fontSize: 20 }}>Cancel</Text>
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MapNavigator;
