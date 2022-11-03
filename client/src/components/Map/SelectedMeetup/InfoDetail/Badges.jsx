import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

const Badges = (props) => {
  return (
    <View>
      <Text>Badges component here!!!</Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup };
};

export default connect(mapStateToProps)(Badges);
