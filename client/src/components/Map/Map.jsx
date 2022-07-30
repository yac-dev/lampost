import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

const Map = () => {
  const [region, setRegion] = useState(null);
  const [a, d] = useState(null);
  const getInitialState = () => {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  };

  return (
    <>
      {/* <Text style={styles.textStyle}>Here is the map component</Text> */}
      <View style={styles.container}>
        <MapView style={styles.map} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Map;
