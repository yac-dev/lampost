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

import { IconButton, Center, VStack, NativeBaseProvider, TextArea, Box, Button, Stack, Fab, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// components
import NBProvider from '../Utils/NativeBaseProvider';
import MapMarkers from './MapMarkers/MapMarkers';
import PostBottomSheet from './Post/PostBottomSheet';
import SelectedItemBottomSheet from './SelectedItem/SelectedItemBottomSheet';

// ac
import { countUp } from '../../redux/actionCreators/dummy';
import { loadMe } from '../../redux/actionCreators/auth';
import { getCurrentLocation } from '../../redux/actionCreators/auth';
import { setIsPostBottomSheetOpen } from '../../redux/actionCreators/modal';
import { setIsSelectedItemBottomSheetOpen } from '../../redux/actionCreators/modal';
import { selectPost } from '../../redux/actionCreators/selectItem';

const Map = (props) => {
  const [region, setRegion] = useState(null);
  const [currentSnap, setCurrentSnap] = useState();

  const postBottomSheetRef = useRef(null);
  const selectedItemBottomSheetRef = useRef(null);
  const mapRef = useRef(null);
  console.log('Map is rendered');

  // const handleSheetChanges = useCallback((index) => {
  //   if (!props.modal.bottomSheet.isOpen) {
  //     props.setIsBottomSheetOpen(true);
  //     bottomSheetRef.current?.snapToIndex(index);
  //     // console.log('handleSheetChanges', index);
  //   } else {
  //     props.setIsBottomSheetOpen(false);
  //     bottomSheetRef.current?.snapToIndex(-1);
  //   }
  // }, []);

  const handlePostBottomSheetChanges = (index) => {
    if (!props.modal.postBottomSheet.isOpen) {
      props.setIsSelectedItemBottomSheetOpen(false);
      selectedItemBottomSheetRef.current?.close();
      props.setIsPostBottomSheetOpen(true);
      postBottomSheetRef.current?.snapToIndex(0);
      // console.log('handleSheetChanges', index);
    } else if (props.modal.postBottomSheet.isOpen) {
      console.log('closing');
      props.setIsPostBottomSheetOpen(false);
      // bottomSheetRef.current?.snapToIndex(-1);
      postBottomSheetRef.current.close();
    }
  };

  const handleSelectedItemBottomSheetChanges = (post) => {
    if (!props.modal.selectedItemBottomSheet.isOpen) {
      props.selectPost(post);
      props.setIsPostBottomSheetOpen(false);
      postBottomSheetRef.current?.close();
      props.setIsSelectedItemBottomSheetOpen(true);
      selectedItemBottomSheetRef.current?.snapToIndex(0);
    } else if (props.modal.selectedItemBottomSheet.isOpen) {
      props.setIsSelectedItemBottomSheetOpen(false);
      // bottomSheetRef.current?.snapToIndex(-1);
      selectedItemBottomSheetRef.current.close();
    }
  };

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

  useEffect(() => {
    if (
      props.modal.postBottomSheet.isOpen &&
      props.auth.currentLocation.latitude &&
      props.auth.currentLocation.longitude
    ) {
      const newLat = props.auth.currentLocation.latitude - 0.027;
      console.log(newLat);
      mapRef.current.animateToRegion({
        latitude: newLat,
        longitude: props.auth.currentLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [props.modal.postBottomSheet.isOpen]);

  return (
    <>
      <NBProvider>
        <View style={styles.container}>
          <MapView
            ref={mapRef}
            style={styles.map}
            showsUserLocation={true}
            // showsMyLocationButton={true}
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
            {/* <TouchableOpacity
              style={{ position: 'absolute', right: 20, top: 100 }}
              onPress={() => handleSheetChanges(0)} //  ここで、bottom sheetを出すようにすればいいや。
            >
              <Text>Post to press</Text>
            </TouchableOpacity> */}
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
            <MapMarkers handleSelectedItemBottomSheetChanges={handleSelectedItemBottomSheetChanges} />
            {/* <MapMarkers /> */}
          </MapView>
          <View
            style={{
              position: 'absolute',
              right: (Dimensions.get('window').width / 100) * 5,
              top: (Dimensions.get('window').height / 100) * 8,
              // borderRadius: 50,
            }}
          >
            <IconButton
              style={{ backgroundColor: 'white' }}
              icon={<Icon as={AntDesign} name='plus' />}
              borderRadius='full'
              _icon={{
                color: 'black',
                size: 'md',
              }}
              onPress={() => handlePostBottomSheetChanges()}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              right: (Dimensions.get('window').width / 100) * 5,
              top: (Dimensions.get('window').height / 100) * 15,
              // borderRadius: 50,
            }}
          >
            <IconButton
              style={{ backgroundColor: 'white' }}
              icon={<Icon as={MaterialCommunityIcons} name='party-popper' />}
              borderRadius='full'
              _icon={{
                color: 'black',
                size: 'md',
              }}
              onPress={() => handlePostBottomSheetChanges()}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              right: (Dimensions.get('window').width / 100) * 5,
              top: (Dimensions.get('window').height / 100) * 22,
              // borderRadius: 50,
            }}
          >
            <IconButton
              style={{ backgroundColor: 'white' }}
              icon={<Icon as={MaterialIcons} name='live-tv' />}
              borderRadius='full'
              _icon={{
                color: 'black',
                size: 'md',
              }}
              onPress={() => handlePostBottomSheetChanges()}
            />
          </View>
          <PostBottomSheet postBottomSheetRef={postBottomSheetRef} />
          <SelectedItemBottomSheet selectedItemBottomSheetRef={selectedItemBottomSheetRef} />
          {/* <PostBottomSheet postBottomSheetRef={postBottomSheetRef} /> */}
        </View>
      </NBProvider>
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
    position: 'relative',
  },
});

const mapStateToProps = (state) => {
  return { modal: state.modal, auth: state.auth };
};

export default connect(mapStateToProps, {
  loadMe,
  setIsPostBottomSheetOpen,
  setIsSelectedItemBottomSheetOpen,
  selectPost,
  getCurrentLocation,
})(Map);
