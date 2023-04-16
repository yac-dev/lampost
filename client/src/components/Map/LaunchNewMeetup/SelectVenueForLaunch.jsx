import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { mapStyleForForm } from '../../../utils/mapStyle';
import { screenSectionBackgroundColor } from '../../../utils/colorsTable';

const SelectVenueForLaunch = (props) => {
  // const defaultVenue = props.route.params.editingPlace;
  // const [selectingVenue, setSelectingVenue] = useState(JSON.parse(JSON.stringify(props.route.params.editingPlace)));
  const [selectingVenue, setSelectingVenue] = useState(null);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => props.navigation.navigate('Launch new meetup')} disabled={true}>
          <Text
            style={{
              // color:
              //   JSON.stringify(defaultVenue) === JSON.stringify(editingPlace) ? screenSectionBackgroundColor : 'white',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  const onMapPress = (event) => {
    event.persist();
    // console.log(event.nativeEvent.coordinate);
    setEditingPlace((previous) => {
      const updating = { ...previous };
      updating.coordinates[0] = event.nativeEvent.coordinate.longitude;
      updating.coordinates[1] = event.nativeEvent.coordinate.latitude;
      return updating;
    });
  };

  return (
    <MapView
      style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
      showsUserLocation={true}
      customMapStyle={mapStyleForForm}
      // // showsMyLocationButton={true}
      showsCompass={true}
      scrollEnabled={true}
      zoomEnabled={true}
      onPress={(event) => onMapPress(event)}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      // provider='google'
    >
      {/* <Marker
        tracksViewChanges={false}
        coordinate={{
          latitude: editingPlace.coordinates[1],
          longitude: editingPlace.coordinates[0],
        }}
        // pinColor='black'
      ></Marker> */}
    </MapView>
  );
};

export default SelectVenueForLaunch;
