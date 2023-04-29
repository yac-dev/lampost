import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MapNavigator from './Map';
import LibrariesContaier from './Library';
import { iconsTable } from '../../utils/icons';
const { MaterialCommunityIcons } = iconsTable;

const Tab = createMaterialTopTabNavigator();

const DiscoverTopTab = () => {
  return (
    <Tab.Navigator>
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
          // tabBarLabelStyle: { padding: 5 },
        })}
      />
      <Tab.Screen name='Libraries' component={LibrariesContaier} />
    </Tab.Navigator>
  );
};

export default DiscoverTopTab;
