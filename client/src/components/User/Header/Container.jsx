import React, { useContext } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import UserContext from '../UserContext';
import Stats from './Stats';
import AvatarImage from './AvatarImage';
import ActionButttons from './ActionButttons';

const HeaderContainer = () => {
  const { auth, isIpad } = useContext(GlobalContext);
  const { user, isMyPage, setIsConfirmEditProfileModalOpen, flagUserMenuBottomSheetRef } = useContext(UserContext);

  return (
    <View style={{ flexDirection: 'row', paddingTop: 20, alignItems: 'center', marginBottom: 15 }}>
      <Stats />
      <AvatarImage />
      <ActionButttons />
    </View>
  );
};

export default HeaderContainer;
