import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import UserContext from '../UserContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import {
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
  screenSectionBackgroundColor,
} from '../../../utils/colorsTable';

const ActionButttons = () => {
  const { navigation, user, isBlocked } = useContext(UserContext);
  const oneContainerWidth = Dimensions.get('window').width / 3;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}
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
        {/* <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} /> */}
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}
        onPress={() => navigation.navigate('Assets', { userId: user._id })}
      >
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: backgroundColorsTable['pink1'],
            borderRadius: 10,
            marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons name='film' size={25} color={iconColorsTable['pink1']} />
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
