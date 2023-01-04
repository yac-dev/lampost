import React, { useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import UserContext from './UserContext';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import {
  baseTextColor,
  rnDefaultBackgroundColor,
  iconColorsTable,
  backgroundColorsTable,
} from '../../utils/colorsTable';
import Stats from './Stats';

const Header = (props) => {
  const { auth } = useContext(GlobalContext);
  const { user, isMyPage, setIsConfirmEditProfileModalOpen } = useContext(UserContext);
  const AvatarWidth = Dimensions.get('window').width / 6;

  return (
    <View
      style={{
        flexDirection: 'row',
        // alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20,
        marginBottom: 20,
        // alignItems: 'center',
      }}
    >
      {isMyPage ? (
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
      )}
      <View style={{ flexDirection: 'column' }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>{user.name}</Text>
        <Stats />
      </View>
    </View>
  );
};
// ここにskill badgesをrenderするようになる。

export default Header;
