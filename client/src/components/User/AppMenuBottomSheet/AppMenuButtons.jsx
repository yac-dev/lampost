import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity, Share } from 'react-native';
import UserContext from '../UserContext';
import GlobalContext from '../../../GlobalContext';
import HomeNavigatorContext from '../../Navigator/Home/HomeNavigatorContext';
import * as SecureStore from 'expo-secure-store';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { iconColorsTable, backgroundColorsTable, baseTextColor } from '../../../utils/colorsTable';
import * as ImagePicker from 'expo-image-picker';
import lampostAPI from '../../../apis/lampost';

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
    notificationEnabled,
    setNotificationEnabled,
    registerForPushNotificationsAsync,
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

  const editProfile = async () => {
    // setIsConfirmEditProfileModalOpen(false);
    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0,
    });

    if (!pickedImage.cancelled && pickedImage.uri) {
      setLoading(true);
      const formData = new FormData();
      // photo fieldよりも後にmeetupIdをappendするとダメなんだよな。。。何でだろ。。。
      formData.append('userId', auth.data._id);

      formData.append('avatar', {
        name: `user-${auth.data._id}`,
        uri: pickedImage.uri,
        type: 'image/jpg',
      });
      const result = await lampostAPI.patch(`/users/${auth.data._id}/profile`, formData, {
        headers: { 'Content-type': 'multipart/form-data' },
      });
      // console.log(res);
      // setSelectedProfileImage(result.uri);
      setLoading(false);
      const { photo } = result.data;
      console.log('this is my photo', photo);
      setAuth((previous) => {
        return {
          ...previous,
          data: {
            ...previous.data,
            photo: photo,
          },
        };
      });
    }
  };

  const handleShare = async () => {
    Share.share({
      title: 'Share meetup',
      message: 'https://apps.apple.com/us/app/lampost/id1668526833',
    });
  };

  return (
    <ScrollView>
      <View>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            // setIsConfirmLogoutModalOpen(true);
            // console.log('logging out');
            appMenuBottomSheetRef.current.close();
            editProfile();
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
              <MaterialCommunityIcons name='camera-plus' color={iconColorsTable['pink1']} size={20} />
            </View>
            <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>Change profile picture</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            appMenuBottomSheetRef.current.close();
            handleShare();
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: backgroundColorsTable['lightBlue1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                marginRight: 10,
              }}
            >
              <MaterialCommunityIcons name='facebook' color={iconColorsTable['lightBlue1']} size={20} />
            </View>
            <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>Share Lampost</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            appMenuBottomSheetRef.current.close();
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
              <Ionicons name='notifications' color={iconColorsTable['yellow1']} size={20} />
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>Push notification</Text>
                <Text style={{ color: baseTextColor, marginRight: 5 }}>
                  {notificationEnabled ? 'Turned on' : 'Turned off'}
                </Text>
              </View>
              <Text style={{ color: baseTextColor }}>Go to setting of your phone to toggle.</Text>
            </View>
          </View>
        </TouchableOpacity>
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
