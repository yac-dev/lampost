import React, { useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();

import Container from '../../Libraries/Container';
// import CreateLibrary from '../Libraries/CreateLibraryBottomSheet/ContainerNew'
import CreateNewLibrary from '../../Libraries/CreateNewLibrary/Container';
import CreateReaction from '../../Libraries/CreateNewLibrary/CreateReaction/Container';
import IconPicker from '../../Libraries/CreateNewLibrary/CreateReaction/IconPicker/Container';
import EmojiPicker from '../../Libraries/CreateNewLibrary/CreateReaction/EmojiPicker';
import ReactionIconPicker from '../../Libraries/CreateNewLibrary/CreateReaction/ReactionIconPicker';
import MyFriends from '../../Libraries/CreateNewLibrary/MyFriends';
import WriteDescription from '../../Libraries/CreateNewLibrary/WriteDescription';
import Icons from '../../Libraries/CreateNewLibrary/Icons';
import LibraryContainer from '../../Libraries/Library/Container';
import DateAssets from '../../Libraries/Library/DateAssets/Container';
import AuthNavigator from '../Auth';
import User from '../../User/Container';
import Description from '../../Libraries/LibraryOverviewBottomSheet/Description';
import Members from '../../Libraries/LibraryOverviewBottomSheet/Members';
import Assets from '../../Libraries/LibraryOverviewBottomSheet/Assets';
import Logs from '../../User/Logs/Container';
import Asset from '../../Libraries/Library/Asset/Container';
import LibraryMembers from '../../Libraries/Library/Members';
import { baseBackgroundColor, appBottomSheetBackgroundColor } from '../../../utils/colorsTable';
import AddBadges from '../../Utils/AddBadges/Container';
import AddAssets from '../../Utils/AddAssets/Container';
import ReportLibrary from '../../Libraries/ReportLibrary';
import ReportAsset from '../../Utils/ReportAsset';

const LibraryNavigator = () => {
  const { auth } = useContext(GlobalContext);

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name='Libraries'
          component={Container}
          options={({ navigation }) => ({
            headerShown: false,
            // title: 'Libraries',
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
          name='Description'
          component={Description}
          options={({ navigation }) => ({
            headerShown: true,
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
          name='Members'
          component={Members}
          options={({ navigation }) => ({
            headerShown: true,
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
          name='Assets'
          component={Assets}
          options={({ navigation }) => ({
            headerShown: true,
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
          name='Library'
          component={LibraryContainer}
          options={({ navigation }) => ({
            headerShown: true,
            title: 'Library',
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
          name='Date assets'
          component={DateAssets}
          options={({ navigation }) => ({
            headerShown: true,
            title: 'Date assets',
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
          name='Asset'
          component={Asset}
          options={({ navigation }) => ({
            headerTransparent: true,
            title: '',
            // headerStyle: {
            //   backgroundColor: appBottomSheetBackgroundColor,
            // },
            // headerTitleStyle: {
            //   fontWeight: 'bold',
            //   color: 'white',
            // },
            // headerShown: false,
            headerTintColor: 'white',
          })}
        />
        <Stack.Screen
          name='LibraryMembers'
          component={LibraryMembers}
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
          name='Report asset'
          component={ReportAsset}
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
          name='Report library'
          component={ReportLibrary}
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
            headerTintColor: 'white',
          })}
        />
        <Stack.Screen
          name='Logs'
          component={Logs}
          options={{
            headerStyle: {
              backgroundColor: appBottomSheetBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            headerTintColor: 'white',
          }}
        />
        {/* <Stack.Screen
          name='Roll'
          component={RollContainer}
          options={({ navigation }) => ({
            headerShown: true,
            title: 'Roll',
          })}
        /> */}
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
        <Stack.Screen
          name='Create reaction'
          component={CreateReaction}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'Create reaction',
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
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'Icon picker',
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
          name='Emoji picker'
          component={EmojiPicker}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'Emoji picker',
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
          name='Reaction icon picker'
          component={ReactionIconPicker}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'Image icon',
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
          name='My friends'
          component={MyFriends}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'My friends',
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
          name='Write library description'
          component={WriteDescription}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'My friends',
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
          name='Create new library'
          component={CreateNewLibrary}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'Create new library',
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
          name='Profile'
          component={AuthNavigator}
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name='Add badges'
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
        />
        <Stack.Screen // assetsのfull screen
          name='Add assets'
          component={AddAssets}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'Add assets',
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

export default LibraryNavigator;
