// main libraries
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';

import { Avatar } from 'react-native-paper';

const Header = (props) => {
  return (
    <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center' }}>
      <View style={{ width: 60, height: 60, backgroundColor: 'blue', borderRadius: 10, marginRight: 10 }}></View>
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
