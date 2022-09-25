// main libraries
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';

const Bio = (props) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text>Bio</Text>
      {props.auth.data._id === props.user._id ? (
        <TouchableOpacity>
          <Text>Edit</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, {})(Bio);
