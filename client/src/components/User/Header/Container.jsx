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
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HeaderContainer = () => {
  const { auth, isIpad } = useContext(GlobalContext);
  const { activitiesMenuBottomSheetRef, user, navigation } = useContext(UserContext);

  return (
    <View style={{ marginBottom: 10 }}>
      <View
        style={{
          alignSelf: 'center',
          paddingTop: 10,
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
          }}
        >
          <AvatarImage />
          <Stats />
        </View>
      </View>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center', marginBottom: 5 }}>
        {user.name}
      </Text>
      {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            paddingLeft: 10,
            paddingRight: 5,
            paddingTop: 5,
            paddingBottom: 5,
            width: Dimensions.get('window').width / 2,
          }}
          onPress={() => {
            navigation.navigate('Meetups', { userId: user._id });
          }}
        >
          <View
            style={{
              padding: 5,
              // alignSelf: 'center',
              borderRadius: 5,
              backgroundColor: iconColorsTable['blue1'],
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
              <Feather name='activity' size={25} color={'white'} style={{ marginRight: 10 }} />
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Acivity</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingLeft: 5,
            paddingRight: 10,
            paddingTop: 5,
            paddingBottom: 5,
            width: Dimensions.get('window').width / 2,
          }}
          onPress={() => {
            navigation.navigate('Assets', { userId: user._id });
          }}
        >
          <View
            style={{
              padding: 5,
              borderRadius: 5,
              backgroundColor: iconColorsTable['blue1'],
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
              <MaterialCommunityIcons name='film' size={25} color={'white'} style={{ marginRight: 10 }} />
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Assets</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default HeaderContainer;
