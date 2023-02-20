import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import UserContext from './UserContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { backgroundColorsTable, iconColorsTable, baseTextColor } from '../../utils/colorsTable';

const ActionButttons = () => {
  const { navigation, user, isBlocked } = useContext(UserContext);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginBottom: 20 }}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginRight: 30 }}
        onPress={() => navigation.navigate('Activities', { userId: user._id })}
      >
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
          <Feather name='activity' size={25} color={iconColorsTable['yellow1']} />
        </View>
        <Text style={{ color: baseTextColor, fontWeight: 'bold' }}>Activities</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginRight: 30 }}
        onPress={() => navigation.navigate('Assets', { userId: user._id })}
      >
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: backgroundColorsTable['blue1'],
            borderRadius: 10,
            marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons name='film' size={25} color={iconColorsTable['blue1']} />
        </View>
        <Text style={{ color: baseTextColor, fontWeight: 'bold' }}>Assets</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
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
          <MaterialCommunityIcons name='hand-heart' size={25} color={iconColorsTable['pink1']} />
        </View>
        <Text style={{ color: baseTextColor, fontWeight: 'bold' }}>Personality</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActionButttons;
