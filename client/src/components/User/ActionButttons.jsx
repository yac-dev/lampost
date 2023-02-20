import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import UserContext from './UserContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import {
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
  screenSectionBackgroundColor,
} from '../../utils/colorsTable';

const ActionButttons = () => {
  const { navigation, user, isBlocked } = useContext(UserContext);

  return (
    <View style={{}}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
        onPress={() => navigation.navigate('Activities', { userId: user._id })}
      >
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: backgroundColorsTable['green1'],
            borderRadius: 10,
            marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Feather name='activity' size={25} color={iconColorsTable['green1']} />
        </View>
        <Text style={{ color: baseTextColor, fontWeight: 'bold' }}>Activities</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
        onPress={() => navigation.navigate('Assets', { userId: user._id })}
      >
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: backgroundColorsTable['violet1'],
            borderRadius: 10,
            marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons name='film' size={25} color={iconColorsTable['violet1']} />
        </View>
        <Text style={{ color: baseTextColor, fontWeight: 'bold' }}>Assets</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: backgroundColorsTable['yellow1'],
            borderRadius: 10,
            marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons name='hand-clap' size={25} color={iconColorsTable['yellow1']} />
        </View>
        <Text style={{ color: baseTextColor, fontWeight: 'bold' }}>Claps</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActionButttons;
