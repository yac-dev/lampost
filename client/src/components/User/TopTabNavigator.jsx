import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const UserTopTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Badges' component={HomeScreen} />
      <Tab.Screen name='Logs' component={SettingsScreen} />
      <Tab.Screen name='Assets' component={SettingsScreen} />
    </Tab.Navigator>
  );
};
