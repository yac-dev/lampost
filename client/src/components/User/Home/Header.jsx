// main libraries
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';

import { Avatar } from 'react-native-paper';

const Header = (props) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Avatar.Text size={60} label='JI' />
      <View>
        <Text>{props.user.name}</Text>
        {props.auth.data._id === props.user._id ? (
          <TouchableOpacity>
            <Text>Edit</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, {})(Header);
