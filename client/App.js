import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// components
import Map from './src/components/Map/Map';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>My appppppppppppppppp</Text>
    //   <StatusBar style='auto' />
    // </View>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Map' component={Map} options={{ title: 'Welcome', headerShown: false }} />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
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
