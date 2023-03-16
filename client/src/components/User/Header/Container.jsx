import React, { useContext } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import UserContext from '../UserContext';
import Stats from './Stats';
import AvatarImage from './AvatarImage';
import ActionButttons from './ActionButttons';
import {
  iconColorsTable,
  backgroundColorsTable,
  baseTextColor,
  screenSectionBackgroundColor,
  rnDefaultBackgroundColor,
} from '../../../utils/colorsTable';
import { Feather } from '@expo/vector-icons';

const HeaderContainer = () => {
  const { auth, isIpad } = useContext(GlobalContext);
  const { activitiesMenuBottomSheetRef, user } = useContext(UserContext);

  return (
    <View style={{ marginBottom: 10, paddingLeft: 10, paddingRight: 10 }}>
      <View
        style={{
          alignSelf: 'center',
          paddingTop: 15,
          paddingBottom: 10,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            // alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: screenSectionBackgroundColor,
            marginRight: user.launcher ? 20 : 0,
            borderRadius: isIpad ? 20 : 10,
            marginBottom: 10,
          }}
        >
          <AvatarImage />
          <Stats />
        </View>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, marginLeft: 20 }}>{user.name}</Text>
      </View>
      <TouchableOpacity
        style={{
          borderRadius: 5,
          padding: 5,
          backgroundColor: iconColorsTable['blue1'],
        }}
        onPress={() => {
          activitiesMenuBottomSheetRef.current.snapToIndex(0);
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Feather name='activity' size={25} color={'white'} style={{ marginRight: 10 }} />
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Activity</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderContainer;
