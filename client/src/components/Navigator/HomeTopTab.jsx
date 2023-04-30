import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import MapNavigator from './Map';
import HomeMyMeetupsNavigator from './HomeMyMeetups';
import HomeMyLibrariesNavigator from './HomeMyLibraries';
import LibrariesContaier from './Discover/Libraries';
import { iconsTable } from '../../utils/icons';
const { MaterialCommunityIcons } = iconsTable;
import { appBottomSheetBackgroundColor } from '../../utils/colorsTable';

const Tab = createMaterialTopTabNavigator();

const HomeTopTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        // lazy: true,
        headerShown: true,
        headerStyle: {
          backgroundColor: appBottomSheetBackgroundColor,
          paddingTop: 20,
          marginTop: 20,
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
        name='Upcoming'
        component={HomeMyMeetupsNavigator}
        options={({ route }) => ({
          // headerShown: false,
          // tabBarIcon: ({ size, color, focused }) => (
          //   <MaterialCommunityIcons
          //     name={'rocket-launch'}
          //     color={focused ? 'white' : 'rgb(102, 104, 109)'}
          //     size={size}
          //   />
          // ),
          tabBarLabel: 'Upcoming',
          tabBarLabelStyle: { textTransform: 'none', fontWeight: 'bold' },
          // tabBarLabelStyle: { padding: 5 },
        })}
      />
      <Tab.Screen
        name='Libraries'
        component={HomeMyLibrariesNavigator}
        options={({ route }) => ({
          // headerShown: false,
          // tabBarIcon: ({ size, color, focused }) => (
          //   <MaterialCommunityIcons
          //     name={'rocket-launch'}
          //     color={focused ? 'white' : 'rgb(102, 104, 109)'}
          //     size={size}
          //   />
          // ),
          tabBarLabel: 'My Libraries',
          tabBarLabelStyle: { textTransform: 'none', fontWeight: 'bold' },
          // tabBarLabelStyle: { padding: 5 },
        })}
      />
    </Tab.Navigator>
  );
};

export default HomeTopTab;
