import React, { useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import lampostAPI from '../../../apis/lampost';
// import { mapStyleForForm } from '../../../utils/mapStyle';

const MeetupLocation = (props) => {
  return (
    <MapView
      style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
      showsUserLocation={true}
      // customMapStyle={mapStyleForForm}
      // // showsMyLocationButton={true}
      showsCompass={true}
      scrollEnabled={true}
      zoomEnabled={true}
      onPress={(event) => onMapPress(event)}
      initialRegion={{
        latitude: props.route.params.venue.coordinates[1],
        longitude: props.route.params.venue.coordinates[0],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      // provider='google'
    >
      <Marker
        tracksViewChanges={false}
        coordinate={{
          latitude: props.route.params.venue.coordinates[1],
          longitude: props.route.params.venue.coordinates[0],
        }}
      ></Marker>
    </MapView>
  );
};

export default MeetupLocation;
