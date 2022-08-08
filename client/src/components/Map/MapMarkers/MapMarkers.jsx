// main libraries
import React from 'react';
import { View, Text } from 'react-native';
import { Callout, Marker, Circle } from 'react-native-maps';

const MapMarkers = () => {
  return (
    <>
      <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }}>
        <Callout>
          <Text>Yessssss</Text>
        </Callout>
      </Marker>
      {/* <Circle center={{ latitude: 37.78825, longitude: -122.4324 }} radius={2000} /> */}
    </>
  );
};

export default MapMarkers;
