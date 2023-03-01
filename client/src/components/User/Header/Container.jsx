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
    </View>
  );
};

export default HeaderContainer;
