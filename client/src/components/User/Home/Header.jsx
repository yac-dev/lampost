// main libraries
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { iconColorsTable } from '../../../utils/colorsTable';
import { Avatar } from 'react-native-paper';

const Header = (props) => {
  return (
    <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center' }}>
      <View
        style={{
          backgroundColor: iconColorsTable['blue1'],
          padding: 5,
          borderRadius: 7,
          width: 60,
          height: 60,
          alignItems: 'center',
          marginRight: 10,
        }}
      >
        <FontAwesome5 name='user-astronaut' size={45} color='white' />
      </View>
      <Text>{props.user.name}</Text>
      <View>
        {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}> */}
        {/* <Text style={{}}>{props.user.bio}&nbsp;&nbsp;</Text> */}
        {/* </View> */}
      </View>
    </View>
  );
};
// ここにskill badgesをrenderするようになる。

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, {})(Header);
