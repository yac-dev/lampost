import React, { useContext } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import UserContext from '../UserContext';
import Stats from './Stats';
import AvatarImage from './AvatarImage';
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
    </View>
  );
};

export default HeaderContainer;
