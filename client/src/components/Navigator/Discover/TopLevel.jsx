import DiscoverNavigatorContext from './DiscoverNavigatorContext';
import { TouchableOpacity, Text } from 'react-native';
import MapNavigator from './Map';
import LibrariesContaier from './Libraries';
import { appBottomSheetBackgroundColor } from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
const { MaterialCommunityIcons } = iconsTable;
import DiscoverTopTabsNavigator from './TopTabsNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import MeetupMembers from '../../Map/MeetupDetailBottomSheet/Attendees';
import User from '../../User/Container';
import LibraryMembers from '../../Libraries/LibraryOverviewBottomSheet/Members';
import Report from '../../Utils/Report';

const DiscoverNavigatorContainer = (props) => {
  return (
    <DiscoverNavigatorContext.Provider value={{ topLevelNavigation: props.navigation }}>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name='DiscoverTopTabsNavigator'
            component={DiscoverTopTabsNavigator}
            options={({ navigation }) => ({
              headerShown: false,
              title: 'Basecamp',
              headerTransparent: true,
              // headerStyle: {
              //   backgroundColor: appBottomSheetBackgroundColor,
              // },
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
            name='Meetup members'
            component={MeetupMembers}
            options={({ navigation }) => ({
              headerShown: true,
              title: 'Members',
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
            name='Meetup member'
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
            name='Library members'
            component={LibraryMembers}
            options={({ navigation }) => ({
              headerShown: true,
              title: 'Members',
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
            name='Library member'
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
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
          <Stack.Screen
            name='Discover report'
            component={Report}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
                </TouchableOpacity>
              ),
              headerTitle: 'Report',
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
    </DiscoverNavigatorContext.Provider>
  );
};

export default DiscoverNavigatorContainer;
