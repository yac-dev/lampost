import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import MapNavigator from './Map';
import MyMeetupsNavigator from './MyMeetups';
import MyLibrariesNavigator from './MyLibraries';
// import LibrariesContaier from './Discover/Libraries';
import { iconsTable } from '../../../utils/icons';
const { MaterialCommunityIcons } = iconsTable;
import { appBottomSheetBackgroundColor } from '../../../utils/colorsTable';

const Tab = createMaterialTopTabNavigator();

const HomeTopTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        headerShown: true,
        headerTransparent: true,
        headerStyle: {
          backgroundColor: 'red',
        },
        // tabBarLabel: 'Hello',
        tabBarStyle: {
          // display: hide ? 'none' : 'flex',
          backgroundColor: appBottomSheetBackgroundColor,
          // borderTopWidth: 0,
          // paddingTop: 20,
        },
        tabBarLabelStyle: {
          fontSize: 17,
        },
        tabBarActiveTintColor: 'white',
        tabBarIndicatorStyle: {
          height: 0,
        },
      }}
    >
      <Tab.Screen
        name='Upcoming'
        component={MyMeetupsNavigator}
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
          tabBarLabelStyle: { textTransform: 'none', fontWeight: 'bold', fontSize: 17 },
          // tabBarLabelStyle: { padding: 5 },
        })}
      />
      <Tab.Screen
        name='Libraries'
        component={MyLibrariesNavigator}
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
          tabBarLabelStyle: { textTransform: 'none', fontWeight: 'bold', fontSize: 17 },
          // tabBarLabelStyle: { padding: 5 },
        })}
      />
    </Tab.Navigator>
  );
};

export default HomeTopTab;
