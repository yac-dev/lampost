import DiscoverNavigatorContext from './DiscoverNavigatorContext';
import MapNavigator from './Map';
import LibrariesContaier from './Libraries';
import { appBottomSheetBackgroundColor } from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
const { MaterialCommunityIcons } = iconsTable;
import DiscoverTopTabsNavigator from './TopTabsNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import MeetupDate from '../../Map/SelectedMeetup/Date/Container';
import MeetupDescription from '../../Map/SelectedMeetup/Description/Container';
import MeetupFee from '../../Map/SelectedMeetup/Fee';
import MeetupMembers from '../../Map/SelectedMeetup/Attendees';

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
            name='Meetup date'
            component={MeetupDate}
            options={({ navigation }) => ({
              headerShown: true,
              title: 'Date & Time',
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
            name='Meetup description'
            component={MeetupDescription}
            options={({ navigation }) => ({
              headerShown: true,
              title: 'Description',
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
            name='Meetup fee'
            component={MeetupFee}
            options={({ navigation }) => ({
              headerShown: true,
              title: 'Fee',
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
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
          {/* <Stack.Screen
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
        /> */}
        </Stack.Group>
      </Stack.Navigator>
    </DiscoverNavigatorContext.Provider>
  );
  // return (
  //   <Tab.Navigator
  //     screenOptions={{
  //       // lazy: true,
  //       headerShown: false,
  //       headerStyle: {
  //         backgroundColor: appBottomSheetBackgroundColor,
  //       },
  //       // tabBarLabel: 'Hello',
  //       tabBarStyle: {
  //         // display: hide ? 'none' : 'flex',
  //         backgroundColor: appBottomSheetBackgroundColor,
  //         borderTopWidth: 0,
  //       },
  //       tabBarLabelStyle: {
  //         fontSize: 12,
  //       },
  //       tabBarActiveTintColor: 'white',
  //       tabBarIndicatorStyle: {
  //         height: 0,
  //       },
  //     }}
  //   >
  //     <Tab.Screen
  //       name='DiscoverTopTabsNavigator'
  //       component={DiscoverTopTabsNavigator}
  //       options={({ route }) => ({
  //         headerShown: false,
  //         // tabBarIcon: ({ size, color, focused }) => (
  //         //   <MaterialCommunityIcons
  //         //     name={'rocket-launch'}
  //         //     color={focused ? 'white' : 'rgb(102, 104, 109)'}
  //         //     size={size}
  //         //   />
  //         // ),
  //         // tabBarLabel: 'Meetups',
  //         tabBarLabelStyle: { textTransform: 'none', fontWeight: 'bold' },
  //         // tabBarLabelStyle: { padding: 5 },
  //       })}
  //     />
  //     {/*  ここに、detaialのcomponentとか、userとかを入れていく感じだ。<Tab.Screen
  //       name='Libraries'
  //       component={LibrariesContaier}
  //       options={({ route }) => ({
  //         // headerShown: false,
  //         // tabBarIcon: ({ size, color, focused }) => (
  //         //   <MaterialCommunityIcons
  //         //     name={'rocket-launch'}
  //         //     color={focused ? 'white' : 'rgb(102, 104, 109)'}
  //         //     size={size}
  //         //   />
  //         // ),
  //         tabBarLabel: 'Libraries',
  //         tabBarLabelStyle: { textTransform: 'none', fontWeight: 'bold' },
  //         // tabBarLabelStyle: { padding: 5 },
  //       })}
  //     /> */}
  //   </Tab.Navigator>
  // );
};

export default DiscoverNavigatorContainer;
