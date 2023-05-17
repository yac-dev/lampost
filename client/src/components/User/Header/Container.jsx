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
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HeaderContainer = () => {
  const { auth, isIpad } = useContext(GlobalContext);
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

  const followUser = () => {
    if (isFollowingUser) {
      return null;
    } else {
      setIsFollowingUser(true);
    }
  };

  const renderFollowButton = () => {
    if (isMyPage || !auth.isAuthenticated) {
      return null;
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
                  {isFollowingUser ? null : <MaterialCommunityIcons name='plus' color={'white'} size={20} />}
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
