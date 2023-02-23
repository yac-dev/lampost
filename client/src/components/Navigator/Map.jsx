import React, { useEffect, useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import { Text, TouchableOpacity, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native-paper';
const Stack = createNativeStackNavigator();
import * as SecureStore from 'expo-secure-store';
import { io } from 'socket.io-client';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import Map from '../Map/Container';
import Camera from '../Camera/Container';
import Schedule from '../Schedule/Container';
import QandA from '../Map/SelectedMeetup/QandA/Container';
import Lounge from '../Map/SelectedMeetup/Lounge/Container';
import User from '../User/Container';
import AddBadges from '../Utils/AddBadges/Container';
import AboutLampost from '../Utils/AboutLampost';
import ReportMeetup from '../Map/ReportMeetup';
import ReportMeetupMember from '../Map/SelectedMeetup/Lounge/ReportMeetupMember';
import ReportUser from '../Utils/ReportUser';
import Attendees from '../Map/SelectedMeetup/Attendees/Container';

import AuthNavigator from './Auth';
import { appBottomSheetBackgroundColor, iconColorsTable } from '../../utils/colorsTable';

// ac
import { loadMe } from '../../redux/actionCreators/auth';
import { getSocket } from '../../redux/actionCreators/auth';

const MapNavigator = (props) => {
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
            title: 'Meetups',
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
            // headerRight: () => {
            //   if (auth?.data) {
            //     if (auth?.data.photo) {
            //       return (
            //         // あとは、photoがあるかないかのチェックね。
            //         <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            //           <Image source={{ uri: auth.data.photo }} style={{ width: 35, height: 35, borderRadius: 10 }} />
            //         </TouchableOpacity>
            //       );
            //     } else {
            //       return (
            //         // user icon
            //         <TouchableOpacity
            //           style={{
            //             width: 35,
            //             height: 35,
            //             borderRadius: 10,
            //             marginRight: 10,
            //             backgroundColor: iconColorsTable['blue1'],
            //             alignItems: 'center',
            //             justifyContent: 'center',
            //           }}
            //           onPress={() => navigation.navigate('Profile')}
            //         >
            //           <FontAwesome5 name='user-astronaut' size={25} color='white' />
            //         </TouchableOpacity>
            //       );
            //     }
            //   } else {
            //     return (
            //       <TouchableOpacity
            //         onPress={() => navigation.navigate('Profile')}
            //         style={{ flexDirection: 'row', alignItems: 'center' }}
            //       >
            //         <MaterialCommunityIcons name='login' size={15} color={'white'} style={{ marginRight: 5 }} />
            //         <Text style={{ color: 'white', fontSize: 17 }}>Login</Text>
            //       </TouchableOpacity>
            //     );
            //   }
            // },
          })}
        />
        <Stack.Screen name='Camera' component={Camera} options={{ headerShown: false }} />
        <Stack.Screen name='Schedule' component={Schedule} />
        <Stack.Screen name='QandA' component={QandA} />
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
            // title: '',
            // headerTransparent: true,
            // headerLeft: () => <Button onPress={() => navigation.navigate('My page')}>User page</Button>,
            // headerRight: () => <Button onPress={() => navigation.navigate('My page')}>User page</Button>,
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
            // title: '',
            // headerTransparent: true,
            // headerLeft: () => <Button onPress={() => navigation.navigate('My page')}>User page</Button>,
            // headerRight: () => <Button onPress={() => navigation.navigate('My page')}>User page</Button>,
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
      <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
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
