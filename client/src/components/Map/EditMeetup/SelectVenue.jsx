import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { mapStyleForForm } from '../../../utils/mapStyle';
import { screenSectionBackgroundColor } from '../../../utils/colorsTable';

const SelectPlace = (props) => {
  const defaultVenue = {
    latitude: props.route.params.editingPlace.coordinates[1],
    longitude: props.route.params.editingPlace.coordinates[0],
  };
  const [editingPlace, setEditingPlace] = useState({
    latitude: props.route.params.editingPlace.coordinates[1],
    longitude: props.route.params.editingPlace.coordinates[0],
  });

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Edit meetup', { editedVenue: editingPlace })}
          disabled={JSON.stringify(defaultVenue) === JSON.stringify(editingPlace) ? true : false}
        >
          <Text
            style={{
              color:
                JSON.stringify(defaultVenue) === JSON.stringify(editingPlace) ? screenSectionBackgroundColor : 'white',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [editingPlace]);

  return (
    <MapView
      style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
      showsUserLocation={true}
      customMapStyle={mapStyleForForm}
      // // showsMyLocationButton={true}
      showsCompass={true}
      scrollEnabled={true}
      zoomEnabled={true}
      onPress={(event) => setEditingPlace(event.nativeEvent.coordinate)}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      provider='google'
    >
      <Marker
        tracksViewChanges={false}
        coordinate={{
          latitude: editingPlace.latitude,
          longitude: editingPlace.longitude,
        }}
        // pinColor='black'
      ></Marker>
    </MapView>
  );
};

export default SelectPlace;
