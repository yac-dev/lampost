// main libraries
import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

const ActionButtons = (props) => {
  if (props.auth.data._id === props.user._id) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Button mode='outlined'>Subscribe</Button>
        <Button mode='outlined'>Connect</Button>
        <Button mode='outlined' disabled={true}>
          Invite
        </Button>
      </View>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, {})(ActionButtons);
