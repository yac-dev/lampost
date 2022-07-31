// main libraries
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './src/redux/store';

// components
import Map from './src/components/Map/Map';
import Post from './src/components/Post/Post';
import SignUp from './src/components/Auth/SignUp';
import LogIn from './src/components/Auth/LogIn';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar hidden={false} translucent={true} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Map' component={Map} options={{ headerShown: false }} />
          <Stack.Screen name='Post' component={Post} options={{ headerShown: false }} />
          <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name='LogIn' component={LogIn} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
