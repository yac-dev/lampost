import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { StyleSheet, Platform, View, StatusBar, Dimensions, TouchableOpacity, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import lampostAPI from '../../apis/lampost';
import GlobalContext from '../../GlobalContext';
import MapContext from './MeetupContext';
import MapView, { Marker } from 'react-native-maps';
import { iconColorsTable } from '../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MapMarkers from './MapMarkers';
import AppMenusBottomSheet from './AppMenuBottomSheet/Container';
import MeetupDetailBottomSheet from './MeetupDetailBottomSheet/Container';

// utils
import { mapStyle } from '../../utils/mapStyle';

const Map = (props) => {
  // setAuthがありませんよ、てきなerrorを出して欲しいわ。これなんとかならんかな。
  const { auth, setAuth, setSnackBar, setMyUpcomingMeetups } = useContext(GlobalContext);
  const [meetups, setMeetups] = useState({});
  const [selectedMeetup, setSelectedMeetup] = useState(null);
  const mapRef = useRef(null);
  const appMenuBottomSheetRef = useRef(null);
  const meetupDetailBottomSheetRef = useRef(null);

  const setMeetupLocation = (event) => {
    if (isLaunchMeetupConfirmed) {
      // props.setMeetupLocation(event.nativeEvent.coordinate);
      setLaunchLocation(event.nativeEvent.coordinate);
      launchMeetupBottomSheetRef.current.snapToIndex(1);
    } else {
      return null;
    }
  };

  const loadMe = async () => {
    const jwtToken = await SecureStore.getItemAsync('secure_token');
    if (jwtToken) {
      const result = await lampostAPI.get('/auth/loadMe', { headers: { authorization: `Bearer ${jwtToken}` } });
      const { user } = result.data;
      setAuth((previous) => {
        return { ...previous, data: user };
      });
    }
  };
  const getMeetups = async () => {
    const result = await lampostAPI.get('/meetups');
    const { meetups } = result.data;
    const hashTable = {};
    meetups.forEach((meetup) => {
      hashTable[meetup._id] = meetup;
    });
    setMeetups(hashTable);
  };
  useFocusEffect(
    React.useCallback(() => {
      loadMe();
      getMeetups();
    }, [])
  );

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      // you cannot post any contentって書けばいいかね。
      // setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const coordsData = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
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
    // props.getCurrentLocation();
  }, []);

  useEffect(() => {
    if (props.route.params?.editedMeetup) {
      if (props.route.params?.editedMeetup.startDateAndTime) {
        setMyUpcomingMeetups((previous) => {
          const updating = { ...previous };
          updating[props.route.params.meetupId].startDateAndTime = props.route.params.editedMeetup.startDateAndTime;
          return updating;
        });
      }
      setSnackBar({
        isVisible: true,
        barType: 'success',
        message: 'Your meetup was updated.',
        duration: 5000,
      });
    }
  }, [props.route.params?.editedMeetup]);

  useEffect(() => {
    if (props.route.params?.launchedMeetup) {
      setSnackBar({
        isVisible: true,
        barType: 'success',
        message: 'Launched meetup successfully 🚀',
        duration: 5000,
      });
    }
  }, [props.route.params?.launchedMeetup]);

  useEffect(() => {
    if (selectedMeetup) {
      const newLat = selectedMeetup.place.coordinates[1] - 0.0065;
      mapRef.current.animateToRegion({
        latitude: newLat,
        longitude: selectedMeetup.place.coordinates[0],
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
      });
    }
  }, [selectedMeetup]);

  return (
    <>
      <MapContext.Provider
        value={{
          mapRef,
          navigation: props.navigation,
          appMenuBottomSheetRef,
          meetups,
          setMeetups,
          selectedMeetup,
          setSelectedMeetup,
          meetupDetailBottomSheetRef,
        }}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <MapView
            ref={mapRef}
            style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
            showsUserLocation={true}
            customMapStyle={mapStyle}
            // // showsMyLocationButton={true}
            // followsUserLocation={true}
            showsCompass={true}
            scrollEnabled={true}
            zoomEnabled={true}
            // onPress={(event) => setMeetupLocation(event)}
            // initial regionっていうのは、最初に地図がloadされたときに画面の中心にどのlatitudeとlongitudeを映すかって言うことね。
            // これ、今のuserの場所にしたほうがいいわな。開発中は、ずっとsanfransisco中心に進めていたけど。。
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            // provider='google'
            // provider={Platform.OS === 'android' ? MapView.PROVIDER_GOOGLE : MapView.PROVIDER_DEFAULT}
          >
            <MapMarkers />
          </MapView>
          {auth.isAuthenticated ? (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 5,
                padding: 10,
                position: 'absolute',
                bottom: 20,
                right: 20,
                backgroundColor: iconColorsTable['red1'],
              }}
              onPress={() => appMenuBottomSheetRef.current.snapToIndex(0)}
            >
              <MaterialCommunityIcons name='rocket-launch' size={25} color={'white'} style={{ marginRight: 10 }} />
              <Text style={{ color: 'white' }}>Action</Text>
            </TouchableOpacity>
          ) : null}
          <AppMenusBottomSheet />
          <MeetupDetailBottomSheet />
        </View>
      </MapContext.Provider>
    </>
  );
};

export default Map;
