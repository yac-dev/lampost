// main libraries
import React, { useContext } from 'react';
import MapContext from '../MeetupContext';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Callout, Marker, Circle } from 'react-native-maps';

const SetMeetupLocation = (props) => {
  const { launchLocation } = useContext(MapContext);
  if (launchLocation) {
    return (
      <Marker
        coordinate={{
          latitude: launchLocation.latitude,
          longitude: launchLocation.longitude,
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
