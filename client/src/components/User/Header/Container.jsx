import React, { useContext } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import UserContext from '../UserContext';
import Stats from './Stats';
import AvatarImage from './AvatarImage';
import lampostAPI from '../../../apis/lampost';
import {
  iconColorsTable,
  backgroundColorsTable,
  baseTextColor,
  screenSectionBackgroundColor,
  rnDefaultBackgroundColor,
} from '../../../utils/colorsTable';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const HeaderContainer = () => {
  const { auth, isIpad, setLoading, setSnackBar } = useContext(GlobalContext);
  const {
    activitiesMenuBottomSheetRef,
    user,
    navigation,
    isMyPage,
    isFollowingUser,
    setIsFollowingUser,
    isFetchedIsFollowingUser,
    setIsFetchedIsFollowingUser,
  } = useContext(UserContext);

  const followUser = async () => {
    if (isFollowingUser) {
      return null;
    } else {
      const payload = {
        followeeId: user._id,
        user: {
          _id: auth.data._id,
          name: auth.data.name,
        },
      };
      setLoading(true);
      const result = await lampostAPI.post('/followrelationships', payload);
      setIsFollowingUser(true);
      setLoading(false);
      setSnackBar({
        isVisible: true,
        barType: 'success',
        message: `Started supporting this launcher.`,
        duration: 5000,
      });
    }
  };

  const renderFollowButton = () => {
    if (isMyPage || !auth.isAuthenticated) {
      return (
        <View style={{ width: '100%', paddingLeft: 10, paddingRight: 10 }}>
          <TouchableOpacity
            style={{
              width: '100%',
              backgroundColor: iconColorsTable['blue1'],
              borderRadius: 5,
              padding: 7,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
              <MaterialCommunityIcons
                name='account-multiple-check'
                color={'white'}
                size={20}
                style={{ marginRight: 5 }}
              />
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Follow</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      if (user.launcher) {
        return (
          <View style={{ width: '100%', paddingLeft: 10, paddingRight: 10 }}>
            {isFetchedIsFollowingUser ? (
              <TouchableOpacity
                style={{
                  width: '100%',
                  backgroundColor: isFollowingUser ? iconColorsTable['green1'] : iconColorsTable['blue1'],
                  borderRadius: 5,
                  padding: 7,
                }}
                onPress={() => followUser()}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                  {isFollowingUser ? (
                    <MaterialCommunityIcons
                      name='account-multiple-check'
                      color={'white'}
                      size={20}
                      style={{ marginRight: 5 }}
                    />
                  ) : (
                    <MaterialIcons name='group-add' color={'white'} size={20} style={{ marginRight: 5 }} />
                  )}
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    {isFollowingUser ? 'Following now' : 'Follow'}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <ActivityIndicator />
            )}
          </View>
        );
      } else {
        return null;
      }
    }
  };
  // かつ、isFollowingかのチェックをしないといかん。それね。

  return (
    <View style={{ marginBottom: 10 }}>
      <View
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          alignItems: 'center',
          // backgroundColor: 'green',
          alignSelf: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: screenSectionBackgroundColor,
            marginRight: user.launcher ? 20 : 0,
            borderRadius: isIpad ? 20 : 10,
            marginBottom: 5,
          }}
        >
          <AvatarImage />
          <Stats />
        </View>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>{user.name}</Text>
      </View>
      {/* これを、followしているか、していないかでrenderを切り替える。 まず、自分のページの場合はこれを表示しない。その上で、そのuserがlauncherでなければ、followはさせない。*/}
      {renderFollowButton()}
    </View>
  );
};

export default HeaderContainer;
