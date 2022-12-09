import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import UserContext from '../UserContext';
import GlobalContext from '../../../GlobalContext';
import * as SecureStore from 'expo-secure-store';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { iconColorsTable, backgroundColorsTable, sectionBackgroundColor } from '../../../utils/colorsTable';
import AppButton from '../../Utils/AppMenuButton';

const AppButtons = (props) => {
  const { setAuth } = useContext(GlobalContext);
  const { user, navigation, appMenuBottomSheetRef } = useContext(UserContext);

  const logout = async () => {
    await SecureStore.deleteItemAsync('secure_token');
    setAuth({
      data: null,
      socket: null,
      currentLocation: null,
    });
  };

  return (
    <View
      style={{
        padding: 10,
        borderRadius: 10,
        backgroundColor: sectionBackgroundColor,
        marginBottom: 15,
        marginBottom: 15,
      }}
    >
      <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
        <AppButton
          backgroundColor={backgroundColorsTable['lightGreen1']}
          icon={<Foundation name='sheriff-badge' size={35} color={iconColorsTable['lightGreen1']} />}
          label='Add badges'
          onAppMenuButtonPress={() => {
            appMenuBottomSheetRef.current.snapToIndex(0);
            navigation.navigate('Add badges', { fromComponent: 'ADD_USER_BADGES' });
          }}
        />
        <AppButton
          backgroundColor={backgroundColorsTable['violet1']}
          icon={<MaterialIcons name='edit' size={35} color={iconColorsTable['violet1']} />}
          label='Edit my profile'
        />
        <AppButton
          backgroundColor={backgroundColorsTable['grey1']}
          icon={<Fontisto name='player-settings' size={35} color={iconColorsTable['grey1']} />}
          label='Setting'
        />
        <AppButton
          backgroundColor={backgroundColorsTable['blue1']}
          icon={<MaterialCommunityIcons name='logout' size={35} color={iconColorsTable['blue1']} />}
          label='Logout'
          onAppMenuButtonPress={() => {
            // ここは、authを消すだけだよね。。。ただ、httpでrequestするっていう方がいいのかもな。
            logout();
          }}
        />
      </ScrollView>
    </View>
  );
};

export default AppButtons;
