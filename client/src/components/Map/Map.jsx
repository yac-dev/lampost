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
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import FA5Icon from 'react-native-vector-icons/FontAwesome5';

// rnelements
// import { Button, ButtonGroup, withTheme } from '@rneui/themed';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { Button, Icon } from 'react-native-elements';

// ac
import { countUp } from '../../redux/actionCreators/dummy';
import { loadMe } from '../../redux/actionCreators/auth';

const Map = (props) => {
  const [region, setRegion] = useState(null);
  const [position, setPosition] = useState({ latitude: 37.78825, longitude: -122.4324 });

  const [isOpen, setIsOpen] = useState(false);
  const bottomSheetRef = useRef(null);
  const snapPoints = ['60%'];

  console.log('Map is rendered');

  const handleSheetChanges = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
    // console.log('handleSheetChanges', index);
    setIsOpen(true);
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // you cannot post any contentって書けばいいかね。
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setPosition((previous) => ({
        ...previous,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }));
    })();
  }, []);

  console.log(position);

  return (
    <>
      {/* <Text style={styles.textStyle}>Here is the map component</Text> */}
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          showsCompass={true}
          scrollEnabled={true}
          zoomEnabled={true}
          // initial regionっていうのは、最初に地図がloadされたときに画面の中心にどのlatitudeとlongitudeを映すかって言うことね。
          initialRegion={{
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider='google'
        >
          <TouchableOpacity
            style={{ position: 'absolute', right: 20, top: 100 }}
            onPress={() => handleSheetChanges(0)} //  ここで、bottom sheetを出すようにすればいいや。
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
          <Marker
            title='Yor are here'
            //  description='This is a description'
            coordinate={position}
          />
          <Marker coordinate={{ latitude: position.latitude, longitude: position.longitude }}>
            {/* <FA5Icon name={'stamp'} size={50} color='blue' /> */}
            <Callout>
              <Text>I'm here</Text>
            </Callout>
          </Marker>
          {/* <Circle center={{ latitude: 37.78825, longitude: -122.4324 }} radius={2000} /> */}
          <Marker coordinate={{ latitude: 37.68825, longitude: -122.4324 }} pinColor='black'>
            <Callout>
              <Text>Yeeees</Text>
            </Callout>
          </Marker>
        </MapView>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onClose={() => setIsOpen(false)}
        >
          <BottomSheetView>
            <Text>What's going on here??</Text>
          </BottomSheetView>
        </BottomSheet>
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
  button: {
    position: 'absolute',
    right: 60,
    top: 70,
    size: 50,
  },
  button2: {
    position: 'absolute',
    right: 60,
    top: 90,
    size: 50,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default connect(null, { loadMe })(Map);
