import React, { useRef, useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import { View, Text, Alert, Linking, TouchableOpacity } from 'react-native';
import { baseBackgroundColor, baseTextColor, iconColorsTable } from '../../utils/colorsTable';
import ActionButton from '../Utils/ActionButton';

import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Container = (props) => {
  const uri = 'http://stackoverflow.com/questions/35531679/react-native-open-links-in-browser';
  const termsOfService = '';
  const eula = '';
  const privacyPolicy = '';

  useEffect(() => {
    if (props.route.params?.userHasGone) {
      props.navigation.reset({ index: 0, routes: [{ name: 'Meetups' }] });
      // console.log('Loggedou now!');
    }
  }, [props.route.params?.userHasGone]);

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

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 20 }}>
      <View
        style={{ justifyContent: 'center', alignItems: 'center', marginTop: 150, paddingLeft: 20, paddingRight: 20 }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 30, marginBottom: 30 }}>Lampost</Text>
        <Text style={{ color: 'white', marginBottom: 30 }}>On we go meetup and share your moments!</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ActionButton
            label='Login'
            icon={<MaterialIcons name='login' size={25} color={'white'} />}
            backgroundColor={iconColorsTable['blue1']}
            onActionButtonPress={() => {
              props.navigation.navigate('Login');
            }}
          />
          <Text style={{ color: 'white', marginRight: 10 }}>Or</Text>
          <ActionButton
            label='Signup'
            icon={<AntDesign name='plus' size={25} color={'white'} />}
            backgroundColor={iconColorsTable['blue1']}
            onActionButtonPress={() => {
              props.navigation.navigate('Signup');
            }}
          />
        </View>
      </View>
      <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <Text style={{ color: baseTextColor }}>By signing up, you accept and read Lampost's&nbsp;</Text>
          <TouchableOpacity
            style={{ borderBottomWidth: 0.5, borderBottomColor: baseTextColor }}
            onPress={() => props.navigation.navigate('EULA')}
          >
            <Text style={{ color: baseTextColor }}>EULA.</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <Text style={{ color: baseTextColor, textAlign: 'center' }}>
            and you acknowledge that you have read our&nbsp;
          </Text>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            
          </View>
        </View> */}
      </View>
    </View>
  );
};

// Terms of Service, and you acknowledge that you have read our EULA and Privacy Policy.

export default Container;
