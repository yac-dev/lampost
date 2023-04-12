import React, { useEffect, useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import { Text, TouchableOpacity, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import * as SecureStore from 'expo-secure-store';
// import { io } from 'socket.io-client';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import Map from '../Map/Container';
import Camera from '../Camera/Container';
import Lounge from '../Map/SelectedMeetup/Lounge/Container';
import User from '../User/Container';
import Meetups from '../User/Meetups/Container';
import MeetupAssets from '../User/Meetups/Assets/Container';
import MeetupFee from '../Map/SelectedMeetup/Fee';
import MeetupDate from '../Map/SelectedMeetup/Date/Container';
import MeetupDescription from '../Map/SelectedMeetup/Description';
import MeetupLink from '../Map/SelectedMeetup/Link';
import Attended from '../User/Meetups/Attended/Container';
import AddBadges from '../Utils/AddBadges/Container';
import AboutLampost from '../Utils/AboutLampost';
import ReportMeetup from '../Map/ReportMeetup';
import ReportMeetupMember from '../Map/SelectedMeetup/Lounge/ReportMeetupMember';
import ReportUser from '../Utils/ReportUser';
import Attendees from '../Map/SelectedMeetup/Attendees';
import ExternalWebPage from '../Utils/ExternalWebPage';
import EditMeetup from '../Map/EditMeetup/Container';
import SelectVenue from '../Map/EditMeetup/SelectVenue';

import AuthNavigator from './Auth';
import { appBottomSheetBackgroundColor, iconColorsTable } from '../../utils/colorsTable';
import { iconsTable } from '../../utils/icons';
// ac
import { loadMe } from '../../redux/actionCreators/auth';
// import { getSocket } from '../../redux/actionCreators/auth';

const MapNavigator = (props) => {
  const { Ionicons } = iconsTable;
  const { auth } = useContext(GlobalContext);
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
            title: 'Map',
            headerTransparent: true,
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            headerLeft: () => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate('About Lampost')}>
                  <Ionicons name='information-circle' size={25} color={'white'} />
                </TouchableOpacity>
              );
            },
          })}
        />
        <Stack.Screen
          name='Lounge'
          component={Lounge}
          options={{
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            headerTintColor: 'white',
            // headerTintColor: iconColorsTable['blue1'],
          }}
        />
        <Stack.Screen
          name='Attendees'
          component={Attendees}
          options={{
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            headerTintColor: 'white',
            // headerTintColor: iconColorsTable['blue1'],
          }}
        />
        <Stack.Screen
          name='Meetup description'
          component={MeetupDescription}
          options={{
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            headerTintColor: 'white',
            // headerTintColor: iconColorsTable['blue1'],
          }}
        />
        <Stack.Screen
          name='Meetup fee'
          component={MeetupFee}
          options={{
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            headerTintColor: 'white',
            // headerTintColor: iconColorsTable['blue1'],
          }}
        />
        <Stack.Screen
          name='Meetup date'
          component={MeetupDate}
          options={{
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            headerTintColor: 'white',
            // headerTintColor: iconColorsTable['blue1'],
          }}
        />
        <Stack.Screen
          name='Meetup link'
          component={MeetupLink}
          options={{
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            headerTintColor: 'white',
            // headerTintColor: iconColorsTable['blue1'],
          }}
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
          name='Meetupss'
          component={Meetups}
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
          name='Meetup assets'
          component={MeetupAssets}
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
          name='Attended'
          component={Attended}
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
          name='About Lampost'
          component={AboutLampost}
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
          name='ExternalWebPage'
          component={ExternalWebPage}
          options={({ navigation }) => ({
            headerShown: false,
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
            // title: '',
            // headerTransparent: true,
            // headerLeft: () => <Button onPress={() => navigation.navigate('My page')}>User page</Button>,
            // headerRight: () => <Button onPress={() => navigation.navigate('My page')}>User page</Button>,
          })}
        />
        <Stack.Screen
          name='Report meetup member'
          component={ReportMeetupMember}
          options={({ navigation }) => ({
            headerShown: true,
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            // title: '',
            // headerTransparent: true,
            // headerLeft: () => <Button onPress={() => navigation.navigate('My page')}>User page</Button>,
            // headerRight: () => <Button onPress={() => navigation.navigate('My page')}>User page</Button>,
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
            // title: '',
            // headerTransparent: true,
            // headerLeft: () => <Button onPress={() => navigation.navigate('My page')}>User page</Button>,
            // headerRight: () => <Button onPress={() => navigation.navigate('My page')}>User page</Button>,
          })}
        />
      </Stack.Group>
      {/* <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name='ExternalWebPage'
          component={ExternalWebPage}
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
        
      </Stack.Group> */}
      <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
        <Stack.Screen
          name='Select venue'
          component={SelectVenue}
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
      <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Stack.Screen
          name='Profile'
          component={AuthNavigator}
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name='Edit meetup'
          component={EditMeetup}
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
          name='Camera'
          component={Camera}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='close-circle-outline' size={30} color={'white'} />
                {/* <Text style={{ color: 'white', fontSize: 20 }}>Close</Text> */}
              </TouchableOpacity>
            ),
            headerShown: true,
            title: '',
            headerTransparent: true,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MapNavigator;
