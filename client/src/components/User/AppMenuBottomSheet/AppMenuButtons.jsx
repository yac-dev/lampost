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
import AppMenuButton from '../../Utils/AppMenuButton';

const AppButtons = (props) => {
  const { auth, setAuth, setMyUpcomingMeetupAndChatsTable, setTotalUnreadChatsCount, setIsNotAvailableModalOpen } =
    useContext(GlobalContext);
  const { user, navigation, appMenuBottomSheetRef, setIsConfirmLogoutModalOpen, setIsConfirmDeleteAccountModalOpen } =
    useContext(UserContext);

  const logout = async () => {
    await SecureStore.deleteItemAsync('secure_token');
    setAuth({
      data: null,
      socket: null,
      currentLocation: null,
    });
    setMyUpcomingMeetupAndChatsTable({});
    setTotalUnreadChatsCount(0);
    auth.socket.disconnect();
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
        <AppMenuButton
          backgroundColor={backgroundColorsTable['lightGreen1']}
          icon={<Foundation name='sheriff-badge' size={35} color={iconColorsTable['lightGreen1']} />}
          label='Add badges'
          onAppMenuButtonPress={() => {
            appMenuBottomSheetRef.current.snapToIndex(0);
            navigation.navigate('Add badges', { fromComponent: 'ADD_USER_BADGES' });
          }}
        />
        {user.leadership.total ? (
          <AppMenuButton
            backgroundColor={backgroundColorsTable['yellow1']}
            icon={<Foundation name='dollar' size={35} color={iconColorsTable['yellow1']} />}
            label='Membership tier'
            onAppMenuButtonPress={() => setIsNotAvailableModalOpen(true)}
            isDisabled={true}
          />
        ) : null}
        {/* <AppButton
          backgroundColor={backgroundColorsTable['violet1']}
          icon={<MaterialIcons name='edit' size={35} color={iconColorsTable['violet1']} />}
          label='Edit my profile'
        /> */}
        <AppMenuButton
          backgroundColor={backgroundColorsTable['grey1']}
          icon={<Fontisto name='player-settings' size={35} color={iconColorsTable['grey1']} />}
          label='Personal setting'
          onAppMenuButtonPress={() => setIsNotAvailableModalOpen(true)}
          isDisabled={true}
        />
        <AppMenuButton
          backgroundColor={backgroundColorsTable['blue1']}
          icon={<MaterialCommunityIcons name='exit-run' size={35} color={iconColorsTable['blue1']} />}
          label='Logout'
          onAppMenuButtonPress={() => {
            // ここは、authを消すだけだよね。。。ただ、httpでrequestするっていう方がいいのかもな。
            setIsConfirmLogoutModalOpen(true);
          }}
        />
        <AppMenuButton
          backgroundColor={backgroundColorsTable['yellow1']}
          icon={<Foundation name='alert' size={35} color={iconColorsTable['yellow1']} />}
          label='Delete my account'
          onAppMenuButtonPress={() => {
            // ここは、authを消すだけだよね。。。ただ、httpでrequestするっていう方がいいのかもな。
            setIsConfirmDeleteAccountModalOpen(true);
          }}
        />
      </ScrollView>
    </View>
  );
};

export default AppButtons;
