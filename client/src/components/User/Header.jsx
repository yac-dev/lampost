import React, { useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import UserContext from './UserContext';
import { View, Text, TouchableOpacity, Dimensions, Image, Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {
  baseTextColor,
  rnDefaultBackgroundColor,
  iconColorsTable,
  backgroundColorsTable,
  screenSectionBackgroundColor,
} from '../../utils/colorsTable';
import Stats from './Stats';
import ActionButttons from './Header/ActionButttons';

const Header = (props) => {
  const { auth } = useContext(GlobalContext);
  const { user, isMyPage, setIsConfirmEditProfileModalOpen, flagUserMenuBottomSheetRef } = useContext(UserContext);
  const isIpad = Platform.OS === 'ios' && (Platform.isPad || Platform.isTVOS);
  const avatarContainer = isIpad ? Dimensions.get('window').width / 4.5 : Dimensions.get('window').width / 3.2;
  const avatarWidth = avatarContainer * 0.7;

  const renderAvatar = () => {
    if (user.photo) {
      return <Image source={{ uri: auth.data.photo }} style={{ width: '100%', height: '100%' }} />;
    }
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
      <View
        style={{
          flexDirection: 'row',
          // paddingLeft: 10,
          // paddingRight: 10,
          // alignSelf: 'center',
          paddingTop: 20,
          marginRight: 30,
          // marginBottom: 20,
          // backgroundColor: 'red', // 確認用で使える。
        }}
      >
        <TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: backgroundColorsTable['red1'],
                marginRight: 10,
                borderRadius: 10,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MaterialCommunityIcons name='fire' color={iconColorsTable['red1']} size={25} />
            </View>
            <Text style={{ color: baseTextColor, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
              Leadership
            </Text>
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white', textAlign: 'center' }}>1245</Text>
        </TouchableOpacity>
        <View
          style={{
            width: avatarContainer,
            aspectRatio: 1,
            flexDirection: 'column',
            // backgroundColor: 'green', //確認用で使える
            alignItems: 'center',
            marginRight: 5,
          }}
        >
          <View
            style={{
              backgroundColor: user.photo ? null : iconColorsTable['blue1'],
              // padding: 5,
              borderRadius: isIpad ? 20 : 10,
              width: avatarWidth,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 5,
            }}
          >
            {user.photo ? (
              <Image
                source={{ uri: user.photo }}
                style={{ width: '100%', height: '100%', borderRadius: isIpad ? 20 : 10 }}
              />
            ) : (
              <FontAwesome5 name='user-astronaut' size={30} color='white' />
            )}
            {isMyPage ? (
              <TouchableOpacity
                style={{ position: 'absolute', bottom: -5, right: -5 }}
                onPress={() => setIsConfirmEditProfileModalOpen(true)}
              >
                <MaterialCommunityIcons name='camera-plus' size={20} color={baseTextColor} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{ position: 'absolute', bottom: -5, right: -5 }}
                onPress={() => flagUserMenuBottomSheetRef.current.snapToIndex(0)}
              >
                <MaterialCommunityIcons name='flag' size={20} color={baseTextColor} />
              </TouchableOpacity>
            )}
          </View>
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 15 }}>{user.name}</Text>
        </View>
      </View>
      <ActionButttons />
    </View>
  );
};
// ここにskill badgesをrenderするようになる。

export default Header;
