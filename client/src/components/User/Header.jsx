import React, { useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import UserContext from './UserContext';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {
  baseTextColor,
  rnDefaultBackgroundColor,
  iconColorsTable,
  backgroundColorsTable,
} from '../../utils/colorsTable';

const Header = (props) => {
  const { auth } = useContext(GlobalContext);
  const { user, isMyPage, setIsConfirmEditProfileModalOpen } = useContext(UserContext);
  const AvatarWidth = Dimensions.get('window').width / 6;

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 10,
        marginTop: 20,
        alignItems: 'center',
      }}
    >
      {isMyPage ? (
        <TouchableOpacity
          style={{
            backgroundColor: iconColorsTable['blue1'],
            padding: 5,
            borderRadius: 10,
            width: AvatarWidth,
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 30,
          }}
          onPress={() => setIsConfirmEditProfileModalOpen(true)}
        >
          <FontAwesome5 name='user-astronaut' size={40} color='white' />
        </TouchableOpacity>
      ) : (
        <View
          style={{
            backgroundColor: iconColorsTable['blue1'],
            padding: 5,
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

      <Text style={{ color: 'white', fontSize: 20 }}>{user.name}</Text>
    </View>
  );
};
// ここにskill badgesをrenderするようになる。

export default Header;
