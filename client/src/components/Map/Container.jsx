import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import lampostAPI from '../../apis/lampost';
import GlobalContext from '../../GlobalContext';
import MapContext from './MeetupContext';
import { connect } from 'react-redux';
import { StyleSheet, Platform, View, StatusBar, Dimensions, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { MaterialCommunityIcons } from '@expo/vector-icons';

// components
import MapMarkers from './MapMarkers';
import SelectedMeetup from './SelectedMeetup/Container';
import SelectedMeetupInfoDetail from './SelectedMeetup/InfoDetail/Container';
import AppMenusBottomSheet from './AppMenuBottomSheet/Container';
import ConfirmLaunchMeetupModal from './LaunchMeetupBottomSheet/ConfirmLaunchMeetupModal';
import CancelLaunchMeetupModal from './LaunchMeetupBottomSheet/CancelLaunchMeetupModal';

import LaunchMeetupBottomSheet from './LaunchMeetupBottomSheet/BottomSheet';
import SnackBar from '../Utils/SnackBar';
import LoadingSpinner from '../Utils/LoadingSpinner';

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
  // setAuth?????????????????????????????????error???????????????????????????????????????????????????????????????
  const { auth, setAuth, loading, setLoading, setSnackBar, setMyUpcomingMeetupAndChatsTable } =
    useContext(GlobalContext);
  const [region, setRegion] = useState(null);
  const [currentSnap, setCurrentSnap] = useState();
  const [isLaunchMeetupConfirmationModalOpen, setIsLaunchMeetupConfirmationModalOpen] = useState(false);
  const [isCancelLaunchMeetupConfirmationModalOpen, setIsCancelLaunchMeetupConfirmationModalOpen] = useState(false);
  const [isLaunchMeetupConfirmed, setIsLaunchMeetupConfirmed] = useState(false);
  const [launchLocation, setLaunchLocation] = useState(null);
  const [meetups, setMeetups] = useState([]);
  const [selectedMeetup, setSelectedMeetup] = useState(null);
  const [selectedMeetupDetailComponent, setSelectedMeetupDetailComponent] = useState('');

  const mapRef = useRef(null);
  const appMenuBottomSheetRef = useRef(null);
  const launchMeetupBottomSheetRef = useRef(null);
  const selectedMeetupBottomSheetRef = useRef(null);
  const selectedMeetupDetailBottomSheetRef = useRef(null);
  const [isStartMeetupConfirmationModalOpen, setIsStartMeetupConfirmationModalOpen] = useState(false);
  const [isFinishMeetupConfirmationModalOpen, setIsFinishMeetupConfirmationModalOpen] = useState(false);

  // ????????????map???????????????tap????????????????????????????????????????????????launchMeetup???true??????????????????map???tap?????????location???set?????????launch???form????????????
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
    setMeetups(meetups);
  };
  useFocusEffect(
    React.useCallback(() => {
      loadMe();
      getMeetups();
    }, [])
  );

  useEffect(() => {
    // (async () => {
    //   let { status } = await Location.requestForegroundPermissionsAsync();
    //   if (status !== 'granted') {
    //     // you cannot post any content??????????????????????????????
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
    if (auth.socket) {
      auth.socket.on('CREATED_MEETUP', (data) => {
        console.log(data.meetup);
        setMeetups((previous) => [...previous, data.meetup]);
        if (data.launcher === auth.data._id) {
          setLoading(false);
          setAuth((previous) => {
            return {
              ...previous,
              data: {
                ...previous.data,
                upcomingMeetups: [
                  ...previous.data.upcomingMeetups,
                  { meetup: data.meetup, viewedChatsLastTime: data.viewedChatsLastTime },
                ],
              },
            };
          });
          setIsLaunchMeetupConfirmed(false);
          setLaunchLocation(null);
          launchMeetupBottomSheetRef.current.close();
          setSnackBar({
            isVisible: true,
            message: 'Launched a meetup.',
            barType: 'success',
            duration: 5000,
          });
        }
      });
    }
  }, [auth.socket]);

  // ????????????map??????????????????????????????launchMeetup???????????????
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
    if (selectedMeetup) {
      const newLat = selectedMeetup.place.coordinates[1] - 0.017;
      mapRef.current.animateToRegion({
        latitude: newLat,
        longitude: selectedMeetup.place.coordinates[0],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [selectedMeetup]);

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
          selectedMeetup,
          setSelectedMeetup,
          selectedMeetupBottomSheetRef,
          selectedMeetupDetailComponent,
          setSelectedMeetupDetailComponent,
          selectedMeetupDetailBottomSheetRef,
          isStartMeetupConfirmationModalOpen,
          setIsStartMeetupConfirmationModalOpen,
          isFinishMeetupConfirmationModalOpen,
          setIsFinishMeetupConfirmationModalOpen,
        }}
      >
        <View style={styles.container}>
          <MapView
            ref={mapRef}
            style={styles.map}
            showsUserLocation={true}
            customMapStyle={mapStyle}
            // // showsMyLocationButton={true}
            followsUserLocation={true}
            showsCompass={true}
            scrollEnabled={true}
            zoomEnabled={true}
            onPress={(event) => setMeetupLocation(event)}
            // initial region???????????????????????????????????????load??????????????????????????????????????????latitude???longitude????????????????????????????????????
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
                tracksViewChanges={false} // ???????????????????????????????????????laggy????????????
                coordinate={{
                  latitude: launchLocation.latitude,
                  longitude: launchLocation.longitude,
                }}
              >
                <MaterialCommunityIcons size={35} name='rocket-launch' color={iconColorsTable['red1']} />
              </Marker>
            ) : null}
            <MapMarkers />
          </MapView>

          <ConfirmLaunchMeetupModal />
          <CancelLaunchMeetupModal />
          {/* <SnackBar /> */}

          <AppMenusBottomSheet />
          <LaunchMeetupBottomSheet navigation={props.navigation} route={props.route} />
          <SelectedMeetup />
          <SelectedMeetupInfoDetail />
          {/* <LoadingSpinner /> */}
        </View>
      </MapContext.Provider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    // position: 'relative',
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
