import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MapNavigator from './Map';
import LibrariesContaier from './Libraries';
import { appBottomSheetBackgroundColor } from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
const { MaterialCommunityIcons, Ionicons } = iconsTable;

const Tab = createMaterialTopTabNavigator();

const DiscoverTopTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        // lazy: true,
        headerShown: true,
        headerTransparent: true,
        // headerStyle: {
        //   backgroundColor: appBottomSheetBackgroundColor,
        // },
        // tabBarLabel: 'Hello',
        tabBarStyle: {
          // display: hide ? 'none' : 'flex',
          backgroundColor: appBottomSheetBackgroundColor,
          borderTopWidth: 0,
          paddingTop: 20,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: 'white',
        tabBarIndicatorStyle: {
          height: 0,
        },
      }}
    >
      <Tab.Screen
        name='Meetups navigator'
        component={MapNavigator}
        options={({ route }) => ({
          // headerShown: false,
          // tabBarIcon: ({ size, color, focused }) => (
          //   <MaterialCommunityIcons
          //     name={'rocket-launch'}
          //     color={focused ? 'white' : 'rgb(102, 104, 109)'}
          //     size={size}
          //   />
          // ),
          tabBarLabel: 'Meetups',
          tabBarLabelStyle: { textTransform: 'none', fontWeight: 'bold', fontSize: 17 },
          // tabBarLabelStyle: { padding: 5 },
        })}
      />
      <Tab.Screen
        name='Libraries navigator'
        component={LibrariesContaier}
        options={({ route }) => ({
          // headerShown: false,
          // tabBarIcon: ({ size, color, focused }) => (
          //   <MaterialCommunityIcons
          //     name={'rocket-launch'}
          //     color={focused ? 'white' : 'rgb(102, 104, 109)'}
          //     size={size}
          //   />
          // ),
          tabBarLabel: 'Libraries',
          tabBarLabelStyle: { textTransform: 'none', fontWeight: 'bold', fontSize: 17 },
          // tabBarLabelStyle: { padding: 5 },
        })}
      />
    </Tab.Navigator>
  );
};

export default DiscoverTopTabsNavigator;
