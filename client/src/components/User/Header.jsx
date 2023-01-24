import React, { useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import UserContext from './UserContext';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
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

const Header = (props) => {
  const { auth } = useContext(GlobalContext);
  const { user, isMyPage, setIsConfirmEditProfileModalOpen } = useContext(UserContext);
  const avatarContainer = Dimensions.get('window').width / 3.2;
  const avatarWidth = avatarContainer * 0.7;

  const renderAvatar = () => {
    if (user.photo) {
      return <Image source={{ uri: auth.data.photo }} style={{ width: '100%', height: '100%' }} />;
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
        // marginBottom: 20,
        // backgroundColor: 'red', // 確認用で使える。
      }}
    >
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
            borderRadius: 10,
            width: avatarWidth,
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 5,
          }}
        >
          {user.photo ? (
            <Image source={{ uri: user.photo }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
          ) : (
            <FontAwesome5 name='user-astronaut' size={30} color='white' />
          )}
          {isMyPage ? (
            <TouchableOpacity
              style={{ position: 'absolute', bottom: -5, right: -5 }}
              onPress={() => setIsConfirmEditProfileModalOpen(true)}
            >
              <MaterialCommunityIcons name='camera-plus' size={20} color='white' />
            </TouchableOpacity>
          ) : null}
        </View>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>{user.name}</Text>
      </View>
      {/* <View style={{ width: 80, height: 80, backgroundColor: 'red' }}></View> */}
      {/* <View style={{ flexDirection: 'column' }}> */}
      <Stats />
      {/* <Text>Bea friend</Text> */}
      {/* </View> */}
      {/* {isMyPage ? (
        <TouchableOpacity
          style={{
            backgroundColor: iconColorsTable['blue1'],
            // padding: 5,
            borderRadius: 10,
            width: AvatarWidth,
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 30,
          }}
          onPress={() => setIsConfirmEditProfileModalOpen(true)}
        >
          <FontAwesome5 name='user-astronaut' size={30} color='white' />
        </TouchableOpacity>
      ) : (
        <View
          style={{
            backgroundColor: iconColorsTable['blue1'],
            // padding: 5,
            borderRadius: 10,
            width: AvatarWidth,
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 30,
          }}
        >
          <FontAwesome5 name='user-astronaut' size={40} color='white' />
        </View>
      )} */}
      {/* <View style={{ flexDirection: 'column', backgroundColor: screenSectionBackgroundColor }}>
        {user.leadership.total ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name='fire' color={baseTextColor} size={30} style={{ marginRight: 5 }} />
              <View style={{ flexDirection: 'column', marginRight: 20, alignItems: 'center' }}>
                <Text style={{ color: baseTextColor }}>Leadership</Text>
                <Text style={{ color: baseTextColor }}>256</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name='groups' size={30} color={baseTextColor} style={{ marginRight: 5 }} />
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Text style={{ color: baseTextColor }}>Patrons</Text>
                <Text style={{ color: baseTextColor }}>453</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
      </View> */}
    </View>
  );
};
// ここにskill badgesをrenderするようになる。

export default Header;
