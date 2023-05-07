import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import UserContext from '../UserContext';
import GlobalContext from '../../../GlobalContext';
import HomeNavigatorContext from '../../Navigator/Home/HomeNavigatorContext';
import * as SecureStore from 'expo-secure-store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {
  iconColorsTable,
  backgroundColorsTable,
  sectionBackgroundColor,
  baseTextColor,
} from '../../../utils/colorsTable';
import AppMenuButton from '../../Utils/AppMenuButton';

const AppButtons = (props) => {
  const {
    auth,
    setAuth,
    setMyUpcomingMeetups,
    setMyJoinedLibraries,
    setTotalUnreadChatsCount,
    setChatsNotificationCount,
    setLoading,
    setSnackBar,
  } = useContext(GlobalContext);
  const {
    user,
    navigation,
    appMenuBottomSheetRef,
    userBadges,
    setIsConfirmLogoutModalOpen,
    setIsConfirmDeleteAccountModalOpen,
    badgeIndexes,
  } = useContext(UserContext);

  // const logout = async () => {
  //   await SecureStore.deleteItemAsync('secure_token');
  //   setAuth({
  //     data: null,
  //     socket: null,
  //     currentLocation: null,
  //   });
  //   setMyUpcomingMeetupAndChatsTable({});
  //   setTotalUnreadChatsCount(0);
  //   // auth.socket.disconnect();
  // };

  const logout = async () => {
    await SecureStore.deleteItemAsync('secure_token');
    setAuth({
      data: null,
      isAuthenticated: false,
      socket: null,
      currentLocation: null,
    });
    setMyUpcomingMeetups({});
    setMyJoinedLibraries([]);
    setChatsNotificationCount(0);
    // auth.socket.disconnect();
    setSnackBar({
      isVisible: true,
      barType: 'success',
      message: 'Logged out successfully.',
      duration: 5000,
    });
    navigation.goBack();
    // ('LogInOrSignUp', { userHasGone: true });
    // navigation.goBack();
  };

  //

  return (
    <ScrollView>
      <View>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            // setIsConfirmLogoutModalOpen(true);
            // console.log('logging out');
            logout();
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['blue1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                marginRight: 10,
              }}
            >
              <MaterialCommunityIcons name='exit-run' color={iconColorsTable['blue1']} size={20} />
            </View>
            <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>Logout</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            // appMenuBottomSheetRef.current.close();
            navigation.navigate('Delete my account');
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['red1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                marginRight: 10,
              }}
            >
              <Foundation name='alert' color={iconColorsTable['red1']} size={20} />
            </View>
            <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>Delete my account</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
        </TouchableOpacity>
        {/* <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
        onPress={() => {
          return null;
        }}
        disabled={true}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: backgroundColorsTable['grey1'],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginRight: 10,
            }}
          >
            <Fontisto name='player-settings' color={iconColorsTable['grey1']} size={20} />
          </View>
          <Text style={{ color: 'white',  fontSize: 17, marginRight: 10 }}>Settings</Text>
        </View>
        <Foundation name='prohibited' color={iconColorsTable['red1']} size={20} />
      </TouchableOpacity>
      {renderMembershipSetting()} */}
      </View>
    </ScrollView>
  );
};

export default AppButtons;
