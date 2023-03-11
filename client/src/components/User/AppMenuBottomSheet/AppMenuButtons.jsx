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
    badgeDatas,
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
    auth.socket.disconnect();
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
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>
              Patron membership settings
            </Text>
          </View>
          <Foundation name='prohibited' color={iconColorsTable['red1']} size={25} />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  //

  return (
    <View>
      {/* <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
        <AppMenuButton
          backgroundColor={backgroundColorsTable['lightGreen1']}
          icon={<Foundation name='sheriff-badge' size={35} color={iconColorsTable['lightGreen1']} />}
          label='Add badges'
          onAppMenuButtonPress={() => {
            appMenuBottomSheetRef.current.close();
            navigation.navigate('Add badges', { fromComponent: 'ADD_USER_BADGES', myBadges: badgeDatas });
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
            setIsConfirmLogoutModalOpen(true);
          }}
        />
        <AppMenuButton
          backgroundColor={backgroundColorsTable['yellow1']}
          icon={<Foundation name='alert' size={35} color={iconColorsTable['yellow1']} />}
          label='Delete my account'
          onAppMenuButtonPress={() => {
            setIsConfirmDeleteAccountModalOpen(true);
          }}
        />
      </ScrollView> */}
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
        onPress={() => {
          appMenuBottomSheetRef.current.close();
          navigation.navigate('Add badges', { fromComponent: 'ADD_USER_BADGES', myBadges: badgeDatas });
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: backgroundColorsTable['green1'],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginRight: 10,
            }}
          >
            <Foundation name='sheriff-badge' color={iconColorsTable['green1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>Add badges</Text>
        </View>
        <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
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
              width: 35,
              height: 35,
              backgroundColor: backgroundColorsTable['orange1'],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 7,
              marginRight: 10,
            }}
          >
            <MaterialCommunityIcons name='human-greeting-variant' color={iconColorsTable['orange1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>My friends</Text>
        </View>
        <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
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
              width: 35,
              height: 35,
              backgroundColor: backgroundColorsTable['blue1'],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginRight: 10,
            }}
          >
            <MaterialCommunityIcons name='exit-run' color={iconColorsTable['blue1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>Logout</Text>
        </View>
        <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
        onPress={() => {
          appMenuBottomSheetRef.current.close();
          navigation.navigate('Add badges', { fromComponent: 'ADD_USER_BADGES', myBadges: badgeDatas });
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: backgroundColorsTable['red1'],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginRight: 10,
            }}
          >
            <Foundation name='alert' color={iconColorsTable['red1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>Delete my account</Text>
        </View>
        <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
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
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, marginRight: 10 }}>Settings</Text>
        </View>
        <Foundation name='prohibited' color={iconColorsTable['red1']} size={25} />
      </TouchableOpacity>
      {renderMembershipSetting()} */}
    </View>
  );
};

export default AppButtons;
{
  /* <Foundation name='prohibited' color={iconColorsTable['red1']} size={25} /> */
}
