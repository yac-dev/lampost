// main libraries
import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import lampostAPI from '../../apis/lampost';
import MapContext from './MeetupContext';
import { connect } from 'react-redux';
import { StyleSheet, Platform, View, StatusBar, Dimensions, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

// components
import NBProvider from '../Utils/NativeBaseProvider';
import MapMarkers from './MapMarkers';
// bottom sheeets
import SelectedMeetup from './SelectedMeetup/Container';
import SelectedMeetupInfoDetail from './SelectedMeetup/InfoDetail/Container';
import AppMenusBottomSheet from './AppMenuBottomSheet/Container';

import ConfirmLaunchMeetupModal from './LaunchMeetupBottomSheet/ConfirmLaunchMeetupModal';
import CancelLaunchMeetupModal from './LaunchMeetupBottomSheet/CancelLaunchMeetupModal';

import LaunchMeetupBottomSheet from './LaunchMeetupBottomSheet/BottomSheet';
import SnackBar from '../Utils/SnackBar';

// utils
import { mapStyle } from '../../utils/mapStyle';

// ac
import { loadMe } from '../../redux/actionCreators/auth';
import { getCurrentLocation } from '../../redux/actionCreators/auth';
import { setIsPostBottomSheetOpen } from '../../redux/actionCreators/bottomSheet';
import { setIsSelectedItemBottomSheetOpen } from '../../redux/actionCreators/bottomSheet';
import { selectPost } from '../../redux/actionCreators/selectItem';
import { selectMeetup } from '../../redux/actionCreators/selectItem';
import { setIsHostMeetupOpen } from '../../redux/actionCreators/hostMeetup';
import { setMeetupLocation } from '../../redux/actionCreators/hostMeetup';
import { setIsSelectMeetupBadgesModalOpen } from '../../redux/actionCreators/modal';
import { setIsConfirmHostMeetupModalOpen } from '../../redux/actionCreators/modal';
import { setIsCancelLaunchMeetupModalOpen } from '../../redux/actionCreators/modal';
import { setIsSelectedMeetupInfoDetailBottomSheetOpen } from '../../redux/actionCreators/bottomSheet';
import { iconColorsTable } from '../../utils/colorsTable';

const Map = (props) => {
  const [region, setRegion] = useState(null);
  const [currentSnap, setCurrentSnap] = useState();
  const [isLaunchMeetupConfirmationModalOpen, setIsLaunchMeetupConfirmationModalOpen] = useState(false);
  const [isCancelLaunchMeetupConfirmationModalOpen, setIsCancelLaunchMeetupConfirmationModalOpen] = useState(false);
  const [isLaunchMeetupConfirmed, setIsLaunchMeetupConfirmed] = useState(false);
  const [launchLocation, setLaunchLocation] = useState(null);
  const [meetups, setMeetups] = useState([]); // これも必要になるわ。map markersでstateを持つんではなく、ここで持った方がいい。
  // const [selectedMeetup, setSelectedMeetup] = useState(null)

  const mapRef = useRef(null);
  const appMenuBottomSheetRef = useRef(null);
  const launchMeetupBottomSheetRef = useRef(null);
  const notificationBottomSheetRef = useRef(null);
  const selectedItemBottomSheetRef = useRef(null);
  const selectedMeetupDetailBottomSheetRef = useRef(null);

  console.log('Map is rendered');

  // 手動で閉じたらおかしくなる。。。
  const handleSelectedItemBottomSheetChanges = (meetupId) => {
    if (!props.bottomSheet.selectedItem.isOpen) {
      console.log(meetupId);
      props.selectMeetup(meetupId);
      // props.setIsPostBottomSheetOpen(false);
      // postBottomSheetRef.current?.close();
      props.setIsSelectedItemBottomSheetOpen(true);
      selectedItemBottomSheetRef.current?.snapToIndex(0);
    } else if (props.bottomSheet.selectedItem.isOpen) {
      console.log(meetupId);
      props.selectMeetup(meetupId);
      // props.setIsSelectedItemBottomSheetOpen(false);
      // selectedItemBottomSheetRef.current.close();
      // bottomSheetRef.current?.snapToIndex(-1);
    }
  };

  const handleselectedMeetupDetailBottomSheetChanges = (component) => {
    props.setIsSelectedMeetupInfoDetailBottomSheetOpen(true, component);
    selectedMeetupDetailBottomSheetRef.current?.snapToIndex(0);
  };

  // 基本は、mapのいずれをtapしてもなにも起きないようにする。launchMeetupがtrueのときだけ、mapをtapしたらlocationをsetして、launchのformを出す。
  const setMeetupLocation = (event) => {
    if (isLaunchMeetupConfirmed) {
      // props.setMeetupLocation(event.nativeEvent.coordinate);
      setLaunchLocation(event.nativeEvent.coordinate);
      appMenuBottomSheetRef.current.snapToIndex(0);
      launchMeetupBottomSheetRef.current.snapToIndex(0);
    } else {
      return null;
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

  const getMeetups = async () => {
    const result = await lampostAPI.get('/meetups');
    const { meetups } = result.data;
    setMeetups(meetups);
  };
  useEffect(() => {
    getMeetups();
  }, []);

  useEffect(() => {
    if (props.bottomSheet.post.isOpen && props.auth.currentLocation.latitude && props.auth.currentLocation.longitude) {
      const newLat = props.auth.currentLocation.latitude - 0.027;
      console.log(newLat);
      mapRef.current.animateToRegion({
        latitude: newLat,
        longitude: props.auth.currentLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [props.bottomSheet.post.isOpen]);

  // これで、mapを自動で移動させる。launchMeetupの場所へ。
  useEffect(() => {
    if (isLaunchMeetupConfirmed && launchLocation) {
      const newLat = launchLocation.latitude - 0.018;
      mapRef.current.animateToRegion({
        latitude: newLat,
        longitude: launchLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [isLaunchMeetupConfirmed, launchLocation]);

  useEffect(() => {
    if (props.bottomSheet.selectedItem.isOpen && props.selectedMeetup) {
      const newLat = props.selectedMeetup.place.coordinates[1] - 0.017;
      mapRef.current.animateToRegion({
        latitude: newLat,
        longitude: props.selectedMeetup.place.coordinates[0],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [props.bottomSheet.selectedItem, props.selectedMeetup]);

  return (
    <>
      <MapContext.Provider
        value={{
          navigation: props.navigation,
          launchMeetupBottomSheetRef,
          appMenuBottomSheetRef,
          isLaunchMeetupConfirmationModalOpen,
          setIsLaunchMeetupConfirmationModalOpen,
          isCancelLaunchMeetupConfirmationModalOpen,
          setIsCancelLaunchMeetupConfirmationModalOpen,
          isLaunchMeetupConfirmed,
          setIsLaunchMeetupConfirmed,
          launchLocation,
          setLaunchLocation,
          meetups,
          setMeetups,
        }}
      >
        <NBProvider>
          <View style={styles.container}>
            <MapView
              ref={mapRef}
              style={styles.map}
              showsUserLocation={true}
              customMapStyle={mapStyle}
              // showsMyLocationButton={true}
              followsUserLocation={true}
              showsCompass={true}
              scrollEnabled={true}
              zoomEnabled={true}
              onPress={(event) => setMeetupLocation(event)}
              // initial regionっていうのは、最初に地図がloadされたときに画面の中心にどのlatitudeとlongitudeを映すかって言うことね。
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              provider='google'
              // provider={Platform.OS === 'android' ? MapView.PROVIDER_GOOGLE : MapView.PROVIDER_DEFAULT}
            >
              {launchLocation ? (
                <Marker
                  coordinate={{
                    latitude: launchLocation.latitude,
                    longitude: launchLocation.longitude,
                  }}
                >
                  <MaterialCommunityIcons size={35} name='rocket-launch' color={iconColorsTable['red1']} />
                </Marker>
              ) : null}
              <MapMarkers handleSelectedItemBottomSheetChanges={handleSelectedItemBottomSheetChanges} />
            </MapView>

            <ConfirmLaunchMeetupModal />
            <CancelLaunchMeetupModal />
            <SnackBar />

            <AppMenusBottomSheet />
            <LaunchMeetupBottomSheet navigation={props.navigation} route={props.route} />
            <SelectedMeetup
              navigation={props.navigation}
              selectedItemBottomSheetRef={selectedItemBottomSheetRef}
              handleselectedMeetupDetailBottomSheetChanges={handleselectedMeetupDetailBottomSheetChanges}
            />
            <SelectedMeetupInfoDetail
              navigation={props.navigation}
              selectedMeetupDetailBottomSheetRef={selectedMeetupDetailBottomSheetRef}
            />
          </View>
        </NBProvider>
      </MapContext.Provider>
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
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'relative',
  },
});

const mapStateToProps = (state) => {
  return {
    bottomSheet: state.bottomSheet,
    auth: state.auth,
    dialog: state.dialog,
    hostMeetup: state.hostMeetup,
    modal: state.modal,
    selectedMeetup: state.selectedItem.meetup,
  };
};

export default connect(mapStateToProps, {
  loadMe,
  setIsPostBottomSheetOpen,
  setIsSelectedItemBottomSheetOpen,
  selectPost,
  selectMeetup,
  getCurrentLocation,
  setIsHostMeetupOpen,
  setMeetupLocation,
  setIsConfirmHostMeetupModalOpen,
  setIsCancelLaunchMeetupModalOpen,
  setIsSelectMeetupBadgesModalOpen,
  setIsSelectedMeetupInfoDetailBottomSheetOpen,
})(Map);
