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
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
        onPress={() => console.log('patrons page')}
      >
        <View
          style={{
            backgroundColor: backgroundColorsTable['pink1'],
            marginRight: 10,
            borderRadius: 10,
            width: 35,
            height: 35,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons name='fire' color={iconColorsTable['pink1']} size={25} />
        </View>
        <Text style={{ color: baseTextColor, fontWeight: 'bold', marginRight: 10 }}>Patrons</Text>
      </TouchableOpacity>
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
            width: 35,
            height: 35,
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
    </View>
  );
};

export default Stats;
