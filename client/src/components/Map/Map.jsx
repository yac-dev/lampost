// main libraries
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  Platform,
  View,
  StatusBar,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import MapView, { Callout, Marker, Circle } from 'react-native-maps';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
// import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import { IconButton, Center, VStack, NativeBaseProvider, TextArea, Box, Button, Stack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

import FA5Icon from 'react-native-vector-icons/FontAwesome5';

// components
import BottomSheet from './BottomSheet/BottomSheet';
import MapMarkers from './MapMarkers/MapMarkers';

// ac
import { countUp } from '../../redux/actionCreators/dummy';
import { loadMe } from '../../redux/actionCreators/auth';
import { setIsBottomSheetOpen } from '../../redux/actionCreators/modal';
import { getCurrentLocation } from '../../redux/actionCreators/auth';

const Map = (props) => {
  const [region, setRegion] = useState(null);
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const bottomSheetRef = useRef(null);
  const mapRef = useRef(null);
  console.log('Map is rendered');

  const handleSheetChanges = useCallback((index) => {
    props.setIsBottomSheetOpen(true);
    bottomSheetRef.current?.snapToIndex(index);
    // console.log('handleSheetChanges', index);
  }, []);

  useEffect(() => {
    // (async () => {
    //   let { status } = await Location.requestForegroundPermissionsAsync();
    //   if (status !== 'granted') {
    //     // you cannot post any contentって書けばいいかね。
    //     setErrorMsg('Permission to access location was denied');
    //     return;
    //   }

    //   let location = await Location.getCurrentPositionAsync({});
    //   setPosition((previous) => ({
    //     ...previous,
    //     latitude: location.coords.latitude,
    //     longitude: location.coords.longitude,
    //   }));
    // })();
    props.getCurrentLocation();
  }, []);

  // これめっちゃ動く。直さないと。
  useEffect(() => {
    if (props.modal.bottomSheet.isOpen && props.auth.currentLocation.latitude && props.auth.currentLocation.longitude) {
      console.log(props.modal.bottomSheet.isOpen);
      const newLat = props.auth.currentLocation.latitude - 0.027;
      console.log(newLat);
      mapRef.current.animateToRegion({
        latitude: newLat,
        longitude: props.auth.currentLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [props.modal.bottomSheet.isOpen]);

  console.log(position);

  return (
    <>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          showsCompass={true}
          scrollEnabled={true}
          zoomEnabled={true}
          // initial regionっていうのは、最初に地図がloadされたときに画面の中心にどのlatitudeとlongitudeを映すかって言うことね。
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider='google'
        >
          <TouchableOpacity
            style={{ position: 'absolute', right: 20, top: 100 }}
            onPress={() => handleSheetChanges(1)} //  ここで、bottom sheetを出すようにすればいいや。
          >
            <Text>Post to press</Text>
          </TouchableOpacity>
          {/* <Button
            title='Log in'
            loading={false}
            loadingProps={{ size: 'small', color: 'white' }}
            buttonStyle={{
              backgroundColor: 'rgba(111, 202, 186, 1)',
              borderRadius: 5,
            }}
            containerStyle={{
              marginHorizontal: 50,
              height: 50,
              width: 200,
              marginVertical: 10,
            }}
            onPress={() => {
              props.navigation.navigate('Post', { name: 'Jane' });
            }}
          /> */}
          {/* <Button icon={<Icon name='mail' size={50} type='entypo' color='white' />} iconRight style={styles.button} /> */}

          {/* <TouchableOpacity
            style={{ position: 'absolute', right: 20, top: 85, zIndex: 10 }}
            onPress={() => props.navigation.navigate('SignUp')}
          >
            <Icon color='#f50' name='login' />
            <Text>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ position: 'absolute', right: 20, top: 100, zIndex: 10 }}
            onPress={() => props.navigation.navigate('LogIn')}
            onPress={() => props.countUp()}
          >
            <Text>Log in</Text>
          </TouchableOpacity>
          <Text style={styles.text}>Hello</Text> */}
          <MapMarkers />
        </MapView>
        <BottomSheet bottomSheetRef={bottomSheetRef} />
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  text: {
    position: 'absolute',
    right: 100,
    top: 400,
  },
  // button: {
  //   position: 'absolute',
  //   right: 60,
  //   top: 70,
  //   size: 50,
  // },
  // button2: {
  //   position: 'absolute',
  //   right: 60,
  //   top: 90,
  //   size: 50,
  // },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

const mapStateToProps = (state) => {
  return { modal: state.modal, auth: state.auth };
};

export default connect(mapStateToProps, { loadMe, setIsBottomSheetOpen, getCurrentLocation })(Map);
