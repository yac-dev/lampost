import React, { useRef, useState } from 'react';
import AuthContext from './AuthContext';
import { View, Text } from 'react-native';
import { baseBackgroundColor, iconColorsTable } from '../../utils/colorsTable';
import ActionButton from '../Utils/ActionButton';

import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Container = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
      <View
        style={{ justifyContent: 'center', alignItems: 'center', marginTop: 150, paddingLeft: 20, paddingRight: 20 }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 30, marginBottom: 30 }}>Lampost</Text>
        <Text style={{ color: 'white', marginBottom: 30 }}>On we go meetup and share your moment!</Text>
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
    </View>
  );
};

export default Container;
