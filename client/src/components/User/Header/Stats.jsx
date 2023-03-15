import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import UserContext from '../UserContext';
import { backgroundColorsTable, iconColorsTable, baseTextColor } from '../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const Stats = () => {
  const { user, activitiesMenuBottomSheetRef, leadershipBottomSheetRef } = useContext(UserContext);

  const calculateLeadership = (user) => {
    let accumlator = 0;
    for (const trait in user.leadership) {
      accumlator = accumlator + user.leadership[trait];
    }
    const total = accumlator * (user.patrons < 2 ? 1 : user.patrons);
    return total;
  };

  return (
    <View style={{}}>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>{user.name}</Text>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 10,
        }}
        onPress={() => {
          activitiesMenuBottomSheetRef.current.snapToIndex(0);
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: backgroundColorsTable['green1'],
            borderRadius: 8,
            marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Feather name='activity' size={25} color={iconColorsTable['green1']} />
        </View>
        <Text style={{ color: baseTextColor, fontWeight: 'bold' }}>Activity</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Stats;
