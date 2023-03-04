import React from 'react';
import { View, Text, ScrollView, Linking, Alert, TouchableOpacity } from 'react-native';
import { baseBackgroundColor, screenSectionBackgroundColor, baseTextColor } from '../../utils/colorsTable';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

const Info = (props) => {
  const openURL = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', "You can't open this link.", [{ text: 'OK', onPress: () => console.log('OK Pressed') }], {
        cancelable: false,
      });
    }
  };

  // const goToExternalWebPage = (link) => {
  //   props.navigation.navigate('ExternalWebPage', { link });
  // };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 20 }}>
      <View style={{ backgroundColor: screenSectionBackgroundColor, padding: 10, marginBottom: 20, borderRadius: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
          <Ionicons name='logo-javascript' size={25} color={'yellow'} style={{ marginRight: 10 }} />
          <Ionicons name='logo-nodejs' size={25} color={'green'} style={{ marginRight: 10 }} />
          <Ionicons name='logo-react' size={25} color={'violet'} style={{ marginRight: 10 }} />
          <Text style={{ color: 'white', fontSize: 23 }}>Tech stack</Text>
        </View>
        <Text style={{ color: baseTextColor, marginBottom: 10 }}>
          Lampost 1.0.0 is fully built in JavaScript technology and its libraries.
        </Text>
      </View>

      <View style={{ backgroundColor: screenSectionBackgroundColor, padding: 10, marginBottom: 20, borderRadius: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
          <MaterialCommunityIcons name='fire' size={25} color={'red'} style={{ marginRight: 10 }} />
          <Text style={{ color: 'white', fontSize: 23 }}>Powered by</Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <Text style={{ color: 'white', marginRight: 10, fontSize: 17 }}>Icons8</Text>
            <View style={{ borderBottomColor: baseTextColor, borderBottomWidth: 0.3 }}>
              <TouchableOpacity onPress={() => openURL('https://icons8.com')}>
                <Text style={{ color: baseTextColor }}>https://icons8.com</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{ color: baseTextColor }}>
            Lampost is using a lot of fancy and lovely looking icons. Some of them are powered by Icons8.
          </Text>
        </View>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <Text style={{ color: 'white', marginRight: 10, fontSize: 17 }}>Google maps</Text>
            <View style={{ borderBottomColor: baseTextColor, borderBottomWidth: 0.3 }}>
              <Text style={{ color: baseTextColor }}>https://developers.google.com/maps</Text>
            </View>
          </View>
          <Text style={{ color: baseTextColor }}>Lampost is also using the Google maps api on the home screen.</Text>
        </View>
      </View>

      <View style={{ backgroundColor: screenSectionBackgroundColor, padding: 10, borderRadius: 10, marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
          <MaterialIcons name='engineering' size={25} color={'orange'} style={{ marginRight: 10 }} />
          <Text style={{ color: 'white', fontSize: 23 }}>Developer</Text>
        </View>
        <Text style={{ color: baseTextColor, marginBottom: 5 }}>
          Hello folks. I'm Yosuke Kojima, founded Lampost. Thank you for joining here. Feel free to ask me if you have
          any questions or found any issues 😃
        </Text>
        <View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              <MaterialCommunityIcons name='gmail' size={20} color='red' style={{ marginRight: 10 }} />
              <View style={{ borderBottomColor: baseTextColor, borderBottomWidth: 0.3 }}>
                <Text style={{ color: baseTextColor }}>lamposttech@gmail.com</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              <MaterialCommunityIcons name='gmail' size={20} color='red' style={{ marginRight: 10 }} />
              <View style={{ borderBottomColor: baseTextColor, borderBottomWidth: 0.3 }}>
                <Text style={{ color: baseTextColor }}>yabbee0828@gmail.com</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              <Fontisto name='product-hunt' size={20} color='orange' style={{ marginRight: 10 }} />
              <View style={{ borderBottomColor: baseTextColor, borderBottomWidth: 0.3 }}>
                <Text style={{ color: baseTextColor }}>https://www.producthunt.com/@ykykyk</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              <AntDesign name='linkedin-square' size={20} color='#256FC8' style={{ marginRight: 10 }} />
              <View style={{ borderBottomColor: baseTextColor, borderBottomWidth: 0.3 }}>
                <Text style={{ color: baseTextColor }}>https://www.linkedin.com/in/yosuke-kojima-268044213</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              <AntDesign name='twitter' size={20} color='#1596CA' style={{ marginRight: 10 }} />
              <View style={{ borderBottomColor: baseTextColor, borderBottomWidth: 0.3 }}>
                <Text style={{ color: baseTextColor }}>https://twitter.com/LampostTech</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* <View style={{ backgroundColor: screenSectionBackgroundColor, padding: 10, borderRadius: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
          <MaterialIcons name='engineering' size={25} color={'orange'} style={{ marginRight: 10 }} />
          <Text style={{ color: 'white', fontSize: 23 }}>Blog</Text>
          <Text>I'm writing blog about Lampost. </Text>
        </View>
      </View> */}
    </ScrollView>
  );
};

// www.linkedin.com/in/yosuke-kojima-268044213

export default Info;
