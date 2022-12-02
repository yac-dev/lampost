// main libraries
import React from 'react';
import UserContext from '../Context';
import { useContext } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';

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

  return (
    <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20, marginBottom: 10, marginTop: 10 }}>
      <View
        style={{
          backgroundColor: iconColorsTable['blue1'],
          padding: 5,
          borderRadius: 10,
          width: 70,
          height: 70,
          alignItems: 'center',
          marginRight: 30,
        }}
      >
        <FontAwesome5 name='user-astronaut' size={30} color='white' />
      </View>
      <Text style={{ color: 'white', fontSize: 20 }}>{user.name}</Text>
      <View></View>
    </View>
  );
};
// ここにskill badgesをrenderするようになる。

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, {})(Header);
