import React, { useContext } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import UserContext from '../UserContext';
import Stats from './Stats';
import AvatarImage from './AvatarImage';
import ActionButttons from './ActionButttons';
import { iconColorsTable, backgroundColorsTable, baseTextColor } from '../../../utils/colorsTable';
import { Feather } from '@expo/vector-icons';

const HeaderContainer = () => {
  const { auth, isIpad, activitiesMenuBottomSheetRef } = useContext(GlobalContext);

  return (
    <View style={{ marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', paddingTop: 15, alignSelf: 'center' }}>
        <AvatarImage />
        <Stats />
      </View>
      {/* <View
        style={{
          alignSelf: 'center',
          width: '70%',
          backgroundColor: backgroundColorsTable['green1'],
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
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
      </View> */}
    </View>
  );
};

export default HeaderContainer;
