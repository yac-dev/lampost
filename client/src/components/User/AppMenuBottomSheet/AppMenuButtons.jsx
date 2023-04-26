import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import UserContext from '../UserContext';
import GlobalContext from '../../../GlobalContext';
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
  const { auth, setAuth, setMyUpcomingMeetupAndChatsTable, setTotalUnreadChatsCount, setIsNotAvailableModalOpen } =
    useContext(GlobalContext);
  const {
    user,
    navigation,
    appMenuBottomSheetRef,
    userBadges,
    setIsConfirmLogoutModalOpen,
    setIsConfirmDeleteAccountModalOpen,
  } = useContext(UserContext);

  const logout = async () => {
    await SecureStore.deleteItemAsync('secure_token');
    setAuth({
      data: null,
      socket: null,
      currentLocation: null,
    });
    setMyUpcomingMeetupAndChatsTable({});
    setTotalUnreadChatsCount(0);
    // auth.socket.disconnect();
  };

  const renderMembershipSetting = () => {
    let totalLeadership = 0;
    for (const skill in user.leadership) {
      totalLeadership = totalLeadership + user.leadership[skill];
    }
    if (totalLeadership) {
      return (
        <TouchableOpacity
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
                backgroundColor: backgroundColorsTable['yellow1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginRight: 10,
              }}
            >
              <Fontisto name='dollar' color={iconColorsTable['yellow1']} size={20} />
            </View>
            <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>Patron membership settings</Text>
          </View>
          <Foundation name='prohibited' color={iconColorsTable['red1']} size={20} />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  //

  return (
    <ScrollView>
      <View>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            appMenuBottomSheetRef.current.close();
            navigation.navigate('Add badges', { fromComponent: 'ADD_USER_BADGES', myBadges: userBadges });
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['green1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                marginRight: 10,
              }}
            >
              <Foundation name='sheriff-badge' color={iconColorsTable['green1']} size={20} />
            </View>
            <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>Add badges</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            appMenuBottomSheetRef.current.close();
            navigation.navigate('Boost badges');
            // console.log('grow badges');
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
              <MaterialCommunityIcons name='fire' color={iconColorsTable['red1']} size={20} />
            </View>
            <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>Boost badges</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            appMenuBottomSheetRef.current.close();
            // navigation.navigate('My friends');
            navigation.navigate('My log', { userId: auth.data._id });
            // console.log('move to history');
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['yellow1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                marginRight: 10,
              }}
            >
              <MaterialCommunityIcons name='history' color={iconColorsTable['yellow1']} size={20} />
            </View>
            <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>Log</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            appMenuBottomSheetRef.current.close();
            navigation.navigate('My friends');
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['pink1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                marginRight: 10,
              }}
            >
              <MaterialCommunityIcons name='human-greeting-variant' color={iconColorsTable['pink1']} size={20} />
            </View>
            <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>Friends</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            appMenuBottomSheetRef.current.close();
            // navigation.navigate('My friends');
            navigation.navigate('Assets', { userId: auth.data._id });
            // console.log('my moments');
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['violet1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                marginRight: 10,
              }}
            >
              <Ionicons name='camera' color={iconColorsTable['violet1']} size={20} />
            </View>
            <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>Snaps</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            setIsConfirmLogoutModalOpen(true);
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
            // navigation.navigate('Add badges', { fromComponent: 'ADD_USER_BADGES', myBadges: badgeDatas });
            console.log('delete my account');
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
{
  /* <Foundation name='prohibited' color={iconColorsTable['red1']} size={20} /> */
}
