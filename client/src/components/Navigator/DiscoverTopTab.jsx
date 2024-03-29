import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MapNavigator from './Discover/Map';
import LibrariesContaier from './Discover/Libraries';
import { appBottomSheetBackgroundColor } from '../../utils/colorsTable';
import { iconsTable } from '../../utils/icons';
const { MaterialCommunityIcons } = iconsTable;

const Tab = createMaterialTopTabNavigator();

const DiscoverTopTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        // lazy: true,
        headerShown: true,
        headerStyle: {
          backgroundColor: appBottomSheetBackgroundColor,
        },
        // tabBarLabel: 'Hello',
        tabBarStyle: {
          // display: hide ? 'none' : 'flex',
          backgroundColor: appBottomSheetBackgroundColor,
          borderTopWidth: 0,
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
        name='Meetups'
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
          tabBarLabelStyle: { textTransform: 'none', fontWeight: 'bold' },
          // tabBarLabelStyle: { padding: 5 },
        })}
      />
      <Tab.Screen
        name='Libraries'
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
          tabBarLabelStyle: { textTransform: 'none', fontWeight: 'bold' },
          // tabBarLabelStyle: { padding: 5 },
        })}
      />
    </Tab.Navigator>
  );
};

export default DiscoverTopTab;
