// main libraries
import React from 'react';
import UserContext from '../Context';
import { useContext } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  baseTextColor,
  rnDefaultBackgroundColor,
  iconColorsTable,
  backgroundColorsTable,
} from '../../../utils/colorsTable';

const Header = (props) => {
  const { user } = useContext(UserContext);
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
      <View
        style={{
          backgroundColor: iconColorsTable['blue1'],
          padding: 5,
          borderRadius: 10,
          width: AvatarWidth,
          aspectRatio: 1,
          alignItems: 'center',
          marginRight: 30,
        }}
      >
        <FontAwesome5 name='user-astronaut' size={30} color='white' />
      </View>
      <Text style={{ color: 'white', fontSize: 20 }}>{user.name}</Text>
    </View>
  );
};
// ここにskill badgesをrenderするようになる。

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, {})(Header);
{
  /* <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ padding: 10, backgroundColor: 'blue', borderRadius: 15, marginRight: 10 }}>
            <Text style={{ color: 'white' }}>Subscribe</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10, backgroundColor: 'blue', borderRadius: 15 }}>
            <Text style={{ color: 'white' }}>Connect</Text>
          </TouchableOpacity>
        </View> これ、やっぱやめる。これ入れると、見た目がすげー忙しくなる。*/
}
