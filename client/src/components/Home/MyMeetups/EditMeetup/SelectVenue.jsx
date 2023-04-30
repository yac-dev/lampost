import React, { useContext, useState, useEffect, useMemo } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { mapStyleForForm } from '../../../../utils/mapStyle';
import { screenSectionBackgroundColor } from '../../../../utils/colorsTable';

const SelectVenue = (props) => {
  // この, objectのreference問題、結構めんどい。おそらく、lodashを使うのが一番いい方法。
  const defaultVenue = props.route.params.editingPlace;
  const [editingPlace, setEditingPlace] = useState(JSON.parse(JSON.stringify(props.route.params.editingPlace)));
  console.log(defaultVenue === editingPlace);
  console.log('default', defaultVenue);
  console.log('editing', editingPlace);

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
        latitude: editingPlace.coordinates[1],
        longitude: editingPlace.coordinates[0],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      // provider='google'
    >
      <Marker
        tracksViewChanges={false}
        coordinate={{
          latitude: editingPlace.coordinates[1],
          longitude: editingPlace.coordinates[0],
        }}
        // pinColor='black'
      ></Marker>
    </MapView>
  );
};

export default SelectVenue;
