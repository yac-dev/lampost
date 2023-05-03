import React, { useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import HomeNavigatorContext from './HomeNavigatorContext';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();

// import Container from './Container';
import TopTabsNavigator from './TopTabsNavigator';
import EditMeetup from '../../Home/MyMeetups/EditMeetup/Container';
import SelectVenue from '../../Home/MyMeetups/EditMeetup/SelectVenue';
import MeetupMembers from '../../Home/MyMeetups/Members';
import Lounge from '../../Home/MyMeetups/Lounge/Container';
import Members from '../../Home/MyMeetups/Members';
// import CreateLibrary from '../Libraries/CreateLibraryBottomSheet/ContainerNew'
import CreateNewLibrary from '../../Libraries/CreateNewLibrary/Container';
import CreateReaction from '../../Libraries/CreateNewLibrary/CreateReaction/Container';
import MyFriends from '../../Libraries/CreateNewLibrary/MyFriends';
import Icons from '../../Libraries/CreateNewLibrary/Icons';
import LibraryContainer from '../../Libraries/Library/Container';
import DateAssets from '../../Libraries/Library/DateAssets/Container';
import AuthNavigator from '../Auth';
import User from '../../User/Container';
import Description from '../../Libraries/LibraryOverviewBottomSheet/Description';
import Assets from '../../Libraries/LibraryOverviewBottomSheet/Assets';
import Logs from '../../User/Logs/Container';
import Asset from '../../Libraries/Library/Asset/Container';
import LibraryMembers from '../../Libraries/Library/Members';
import { baseBackgroundColor, appBottomSheetBackgroundColor } from '../../../utils/colorsTable';
import AddBadges from '../../Utils/AddBadges/Container';
import AddAssets from '../../Utils/AddAssets/Container';
import ReportLibrary from '../../Libraries/ReportLibrary';
import ReportAsset from '../../Utils/ReportAsset';

const TopLevelHomeNavigator = (props) => {
  const { auth } = useContext(GlobalContext);
  // navigation={navigation}
  // console.log(props.navigation, 'nav');
  return (
    <HomeNavigatorContext.Provider value={{ topLevelHomeNavigation: props.navigation }}>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name='Home'
            component={TopTabsNavigator}
            options={({ navigation }) => ({
              headerShown: false,
              // headerStyle: {
              //   backgroundColor: appBottomSheetBackgroundColor,
              // },
              // headerTitleStyle: {
              //   fontWeight: 'bold',
              //   color: 'white',
              // },
              // headerTintColor: {
              //   color: 'white',
              // },
            })}
          />
          <Stack.Screen
            name='Meetup members'
            component={MeetupMembers}
            options={({ navigation }) => ({
              headerShown: true,
              title: 'Meetup members',
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
          <Stack.Screen
            name='User'
            component={User}
            options={({ navigation }) => ({
              headerShown: true,
              title: 'User',
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
              headerTitle: 'Select venue',
              headerStyle: {
                backgroundColor: appBottomSheetBackgroundColor,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
            })}
          />
          {/* <Stack.Screen
          name='Lounge'
          component={AuthNavigator}
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name='Meetup detail'
          component={AddBadges}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'Badges for library',
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        /> */}
        </Stack.Group>
      </Stack.Navigator>
    </HomeNavigatorContext.Provider>
  );
};

export default TopLevelHomeNavigator;
