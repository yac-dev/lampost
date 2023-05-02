import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import lampostAPI from '../../apis/lampost';
import GlobalContext from '../../GlobalContext';
import MapContext from './MeetupContext';
import { connect } from 'react-redux';
import { StyleSheet, Platform, View, StatusBar, Dimensions, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FastImage from 'react-native-fast-image';
import { backgroundColorsTable, baseTextColor, rnDefaultBackgroundColor } from '../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import MapMarkers from './MapMarkers';
import SelectedMeetup from './SelectedMeetup/Container';
import SelectedMeetupInfoDetail from './SelectedMeetup/InfoDetail/Container';
import AppMenusBottomSheet from './AppMenuBottomSheet/Container';
import MyUpcomingMeetupsBottomSheet from './MyUpcomingMeetupsBottomSheet/Container';
import MoreMenuBottomSheet from './MyUpcomingMeetupsBottomSheet/MoreMenuBottomSheet';
import ConfirmLaunchMeetupModal from './LaunchMeetupBottomSheet/ConfirmLaunchMeetupModal';
import CancelLaunchMeetupModal from './LaunchMeetupBottomSheet/CancelLaunchMeetupModal';
import ConfirmStartMeetup from './ConfirmStartMeetup';
import ConfirmFinishMeetup from './ConfirmFinishMeetup';
import ConfirmRSVP from './ConfirmRSVP';
import LaunchMeetupBottomSheet from './LaunchMeetupBottomSheet/Container';
import ChatStatus from './ChatStatus';
import SnackBar from '../Utils/SnackBar';
import LoadingSpinner from '../Utils/LoadingSpinner';
import UserMenuBottomSheet from './UserMenuBottomSheet';

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
  // setAuthがありませんよ、てきなerrorを出して欲しいわ。これなんとかならんかな。
  const {
    auth,
    setAuth,
    loading,
    setLoading,
    setSnackBar,
    setMyUpcomingMeetups,
    setMyUpcomingMeetupAndChatsTable,
    chatsNotificationCount,
  } = useContext(GlobalContext);
  const [region, setRegion] = useState(null);
  const [currentSnap, setCurrentSnap] = useState();
  const [isLaunchMeetupConfirmationModalOpen, setIsLaunchMeetupConfirmationModalOpen] = useState(false);
  const [isCancelLaunchMeetupConfirmationModalOpen, setIsCancelLaunchMeetupConfirmationModalOpen] = useState(false);
  const [isLaunchMeetupConfirmed, setIsLaunchMeetupConfirmed] = useState(false);
  const [launchLocation, setLaunchLocation] = useState(null);
  const [meetups, setMeetups] = useState({});
  const [selectedMeetup, setSelectedMeetup] = useState(null);
  const [selectedMeetupDetailComponent, setSelectedMeetupDetailComponent] = useState('');
  const [moreMenuOf, setMoreMenuOf] = useState(null);
  const mapRef = useRef(null);
  const appMenuBottomSheetRef = useRef(null);
  const myUpcomingMeetupsBottomSheetRef = useRef(null);
  const moreMenuBottomSheetRef = useRef(null);
  const launchMeetupBottomSheetRef = useRef(null);
  const selectedMeetupBottomSheetRef = useRef(null);
  const selectedMeetupDetailBottomSheetRef = useRef(null);
  const [isStartMeetupConfirmationModalOpen, setIsStartMeetupConfirmationModalOpen] = useState(false);
  const [isFinishMeetupConfirmationModalOpen, setIsFinishMeetupConfirmationModalOpen] = useState(false);
  const [isRSVPConfirmationModalOpen, setIsRSVPConfirmationModalOpen] = useState(false);
  const [startingMeetup, setStartingMeetup] = useState('');
  const [finishingMeetup, setFinishingMeetup] = useState('');
  const [RSVPingMeetup, setRSVPingMeetup] = useState(null);
  const userMenuBottomSheetRef = useRef(null);

  // 基本は、mapのいずれをtapしてもなにも起きないようにする。launchMeetupがtrueのときだけ、mapをtapしたらlocationをsetして、launchのformを出す。
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

  // useEffect(() => {
  //   props.navigation.setOptions({
  //     headerRight: () => {
  //       if (auth.isAuthenticated) {
  //         return (
  //           <TouchableOpacity style={{}} onPress={() => userMenuBottomSheetRef.current.snapToIndex(0)}>
  //             <FastImage
  //               source={{
  //                 uri: auth.data.photo
  //                   ? auth.data.photo
  //                   : 'https://lampost-dev.s3.us-east-2.amazonaws.com/avatars/default.png',
  //               }}
  //               style={{
  //                 width: 30,
  //                 height: 30,
  //                 borderRadius: 7,
  //                 backgroundColor: iconColorsTable['blue1'],
  //               }}
  //               tintColor={auth.data.photo ? null : 'white'}
  //             />
  //           </TouchableOpacity>
  //         );
  //       } else {
  //         return (
  //           <TouchableOpacity onPress={() => navigation.navigate('About Lampost')}>
  //             <MaterialCommunityIcons name='account' size={25} color={'white'} />
  //           </TouchableOpacity>
  //         );
  //       }
  //     },
  //   });
  // }, [auth.isAuthenticated]);

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

  // これで、mapを自動で移動させる。launchMeetupの場所へ。
  useEffect(() => {
    if (isLaunchMeetupConfirmed && launchLocation) {
      const newLat = launchLocation.latitude - 0.029;
      mapRef.current.animateToRegion({
        latitude: newLat,
        longitude: launchLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [isLaunchMeetupConfirmed, launchLocation]);

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
          navigation: props.navigation,
          launchMeetupBottomSheetRef,
          appMenuBottomSheetRef,
          myUpcomingMeetupsBottomSheetRef,
          moreMenuBottomSheetRef,
          moreMenuOf,
          setMoreMenuOf,
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
          isRSVPConfirmationModalOpen,
          setIsRSVPConfirmationModalOpen,
          startingMeetup,
          setStartingMeetup,
          finishingMeetup,
          setFinishingMeetup,
          RSVPingMeetup,
          setRSVPingMeetup,
          userMenuBottomSheetRef,
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
                tracksViewChanges={false} // これがないと、めちゃくちゃlaggyになる。
                coordinate={{
                  latitude: launchLocation.latitude,
                  longitude: launchLocation.longitude,
                }}
              >
                <Ionicons size={35} name='pin' color={iconColorsTable['red1']} />
              </Marker>
            ) : null}
            <MapMarkers />
          </MapView>
          {auth.isAuthenticated ? (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 10,
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
          <ConfirmLaunchMeetupModal />
          <CancelLaunchMeetupModal />
          <ConfirmStartMeetup />
          <ConfirmFinishMeetup />
          <ConfirmRSVP />
          <AppMenusBottomSheet />
          <MyUpcomingMeetupsBottomSheet />
          <MoreMenuBottomSheet />
          <LaunchMeetupBottomSheet navigation={props.navigation} route={props.route} />
          <SelectedMeetup />
          <SelectedMeetupInfoDetail />

          {/* <LoggedOutModal navigation={props.navigation} /> */}
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

{
  /* <View style={{ flexDirection: 'column' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 5,
                    }}
                  >
                    <ChatStatus
                      icon={<MaterialCommunityIcons name='comment-text' size={17} color={'white'} />}
                      backgroundColor={iconColorsTable['blue1']}
                      status={10}
                    />
                    <ChatStatus
                      icon={<MaterialCommunityIcons name='reply' size={17} color={'white'} />}
                      backgroundColor={iconColorsTable['green1']}
                      status={2}
                    />
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ChatStatus
                      icon={<AntDesign name='questioncircle' size={17} color={'white'} />}
                      backgroundColor={iconColorsTable['yellow1']}
                      status={1}
                    />
                    <ChatStatus
                      icon={<AntDesign name='exclamationcircle' size={17} color={'white'} />}
                      backgroundColor={iconColorsTable['red1']}
                      status={3}
                    />
                  </View>
                </View> */
}
