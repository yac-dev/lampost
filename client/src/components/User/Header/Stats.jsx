import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import UserContext from '../UserContext';
import {
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
  screenSectionBackgroundColor,
} from '../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const Stats = () => {
  const { user, activitiesMenuBottomSheetRef, leadershipBottomSheetRef } = useContext(UserContext);

  if (user.launcher) {
    return (
      <View
        style={{
          paddingLeft: 15,
          paddingRight: 15,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name='torch' size={30} color={iconColorsTable['red1']} />
          <Text style={{ color: baseTextColor, fontWeight: 'bold' }}>Fame</Text>
        </View>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{user.fame}</Text>
      </View>
    );
  } else {
    return null;
  }
};

export default Stats;
