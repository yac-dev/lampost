// main libraries
import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

const ConfirmHostMeetup = () => {
  return (
    <View>
      <Text>Please tap the place where you wanna host the meetup!</Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(ConfirmHostMeetup);
