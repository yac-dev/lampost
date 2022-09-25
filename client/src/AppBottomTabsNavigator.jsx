// main libraries
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { createNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MapNavigator from './components/Navigator/Map';
import AuthNavigator from './components/Navigator/Auth';
import TimeMachine from './components/TimeMachine/Container';

const ref = createNavigationContainerRef();
const Tab = createBottomTabNavigator();

// components
import BottomTabs from './components/Tabs/BottomTabs';

// ac
import { loadMe } from './redux/actionCreators/auth';

const AppStack = (props) => {
  const [routeName, setRouteName] = useState();
  const hide = routeName === 'Camera' || routeName === 'Crew' || routeName === 'Meetup' || routeName === 'Dummy2';

  const getJWTToken = async () => {
    const jwtToken = await SecureStore.getItemAsync('secure_token');
    if (jwtToken) {
      console.log(jwtToken);
      props.loadMe(jwtToken);
    }
  };

  useEffect(() => {
    getJWTToken();
  }, []);

  return (
    <NavigationContainer
      ref={ref}
      onReady={() => {
        setRouteName(ref.getCurrentRoute().name);
      }}
      onStateChange={async () => {
        const previousRouteName = routeName;
        const currentRouteName = ref.getCurrentRoute().name;
        setRouteName(currentRouteName);
      }}
    >
      {/* <BottomTabs routeName={routeName} /> */}
      <Tab.Navigator>
        <Tab.Screen
          name='Explore'
          component={MapNavigator}
          options={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ size, color }) => <MCIcon name={'routes'} color={color} size={size} />,
            tabBarLabel: () => {
              return null;
            },
            tabBarStyle: { display: hide ? 'none' : 'flex' },
            // tabBarVisible: ((route) => {
            //   const routeName = getFocusedRouteNameFromRoute(route) ?? '';

            //   if (routeName === 'Camera') {
            //     return false;
            //   }

            //   return true;
            // })(route),
          })}
        />
        {/* <Tab.Screen
          name='Feed'
          component={Feed}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => <FontAwesome name='feed' color={color} size={size} />,
            tabBarLabel: () => {
              return null;
            },
          }}
        /> */}
        <Tab.Screen
          name='News'
          component={TimeMachine}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              // <Image
              //   color={color}
              //   style={{ width: 24, height: 24 }}
              //   source={require('../../../assets/app/timeMachine.png')}
              // />
              <MaterialCommunityIcons name='newspaper' color={color} size={size} />
              // 本当はtime machineのiconにしたい。
            ),
            tabBarLabel: () => {
              return null;
            },
          }}
        />
        <Tab.Screen
          name='Notifications'
          component={TimeMachine}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name='paper-roll' color={color} size={size} />,
            tabBarLabel: () => {
              return null;
            },
          }}
        />
        <Tab.Screen
          name='Port'
          component={TimeMachine}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => <MaterialIcons name='local-airport' color={color} size={size} />,
            tabBarLabel: () => {
              return null;
            },
          }}
        />
        <Tab.Screen
          name='User'
          component={AuthNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => <FontAwesome name='user' color={color} size={size} />,
            tabBarLabel: () => {
              return null;
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default connect(null, { loadMe })(AppStack);
