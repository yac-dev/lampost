import React, { useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();

import MeetupsContainer from '../../Home/MyMeetups/Container';
import Lounge from '../../Home/MyMeetups/Lounge/Container';
import MembersNavigator from './MembersNavigator';
import EditMeetup from '../../Home/MyMeetups/EditMeetup/Container';
import SelectVenue from '../../Home/MyMeetups/EditMeetup/SelectVenue';
import Report from '../../Utils/Report';
// import CreateLibrary from '../Libraries/CreateLibraryBottomSheet/ContainerNew'
import CreateNewLibrary from '../../Libraries/CreateNewLibrary/Container';
import CreateReaction from '../../Libraries/CreateNewLibrary/CreateReaction/Container';
import MyFriends from '../../Libraries/CreateNewLibrary/MyFriends';
import Icons from '../../Libraries/CreateNewLibrary/Icons';
// import LibraryContainer from '../../Libraries/Library/Container';
// import DateAssets from '../../Libraries/Library/DateAssets/Container';
import AuthNavigator from '../Auth';
import User from '../../User/Container';
// import Description from '../../Libraries/LibraryOverviewBottomSheet/Description';
// import Members from '../../Libraries/LibraryOverviewBottomSheet/Members';
// import Assets from '../../Libraries/LibraryOverviewBottomSheet/Assets';
// import Logs from '../../User/Logs/Container';
// import Asset from '../../Libraries/Library/Asset/Container';
// import LibraryMembers from '../../Libraries/Library/Members';
import { baseBackgroundColor, appBottomSheetBackgroundColor } from '../../../utils/colorsTable';
import AddBadges from '../../Utils/AddBadges/Container';
import AddAssets from '../../Utils/AddAssets/Container';
import ReportLibrary from '../../Libraries/ReportLibrary';
import ReportAsset from '../../Utils/ReportAsset';

const HomeMyMeetupsNavigator = () => {
  const { auth } = useContext(GlobalContext);

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name='MyMeetups'
          component={MeetupsContainer}
          options={({ navigation }) => ({
            headerShown: false,
            // title: 'Basecamp',
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            headerTintColor: {
              color: 'white',
            },
          })}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Stack.Screen
          name='Lounge'
          component={Lounge}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'Lounge',
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
          name='Edit meetup'
          component={EditMeetup}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'Edit meetup',
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
          name='MembersNavigator'
          component={MembersNavigator}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'Members',
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
          name='Select venue'
          component={SelectVenue}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'Members',
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

export default HomeMyMeetupsNavigator;
