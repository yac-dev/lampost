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
    <View
      style={{
        // width: oneContainerWidth,
        // backgroundColor: 'red',
        marginRight: 20,
        // paddingLeft: 30
        justifyContent: 'space-between',
      }}
    >
      <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => leadershipBottomSheetRef.current.snapToIndex(0)}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
          <View
            style={{
              backgroundColor: backgroundColorsTable['red1'],
              marginRight: 10,
              borderRadius: 10,
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <MaterialCommunityIcons name='fire' color={iconColorsTable['red1']} size={25} />
          </View>
          <Text style={{ color: baseTextColor, fontSize: 17, fontWeight: 'bold' }}>Leadership</Text>
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', color: 'white' }}>
          🔥{calculateLeadership(user)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}
        onPress={() => {
          activitiesMenuBottomSheetRef.current.snapToIndex(0);
        }}
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
        <Text style={{ color: baseTextColor, fontWeight: 'bold' }}>Activity</Text>
        {/* <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} /> */}
      </TouchableOpacity>
    </View>
  );
};

export default Stats;
