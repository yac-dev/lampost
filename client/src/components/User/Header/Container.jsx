import React, { useContext } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import UserContext from '../UserContext';
import Stats from './Stats';
import AvatarImage from './AvatarImage';
import ActionButttons from './ActionButttons';

const HeaderContainer = () => {
  const { auth, isIpad } = useContext(GlobalContext);

  return (
    <View style={{ flexDirection: 'row', paddingTop: 15, marginBottom: 15, alignSelf: 'center' }}>
      <AvatarImage />
      <Stats />
    </View>
  );
};

export default HeaderContainer;
