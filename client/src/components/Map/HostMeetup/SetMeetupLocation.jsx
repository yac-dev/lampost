// main libraries
import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Callout, Marker, Circle } from 'react-native-maps';

const SetMeetupLocation = (props) => {
  if (props.hostMeetup.isOpen && props.hostMeetup.setLocation) {
    return (
      <Marker
        coordinate={{
          latitude: props.hostMeetup.setLocation.latitude,
          longitude: props.hostMeetup.setLocation.longitude,
        }}
      />
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return { hostMeetup: state.hostMeetup };
};

export default connect(mapStateToProps, {})(SetMeetupLocation);
