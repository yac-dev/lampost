// main libraries
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Platform, View, StatusBar, Dimensions, TouchableOpacity, Text } from 'react-native';
import MapView from 'react-native-maps';

// icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

// components
import NBProvider from '../Utils/NativeBaseProvider';
import MapMarkers from './MapMarkers/MapMarkers';
import PostBottomSheet from './Post/PostBottomSheet';
import SelectedItemBottomSheet from './SelectedItem/SelectedItemBottomSheet';
// bottom sheeets
import SelectedMeetup from './SelectedMeetup/Container';
import SelectedMeetupInfoDetail from './SelectedMeetup/InfoDetail/Container';
import Notifications from './Notifications/Container';
import AppMenusBottomSheet from './AppMenuBottomSheet/Container';

import FABMenu from './Utils/FABMenu';
import ModalContainer from '../Utils/ModalContainer';
import ConfirmHostMeetup from './HostMeetup/ConfirmHostMeetup';
import CancelLaunchMeetup from './HostMeetup/CancelLaunchMeetup';
// import CancelHostMeetupButton from './HostMeetup/CancelHostMeetupButton';
import SetMeetupLocation from './HostMeetup/SetMeetupLocation';
import HostMeetupBottomSheet from './HostMeetup/BottomSheet';
import Badges from '../Utils/SelectBadges/Badges';
import SnackBar from '../Utils/SnackBar';

// utils
import { mapStyle } from './Utils/mapStyle';

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

const Map = (props) => {
  const [region, setRegion] = useState(null);
  const [currentSnap, setCurrentSnap] = useState();

  const appMenuBottomSheetRef = useRef(null);

  const postBottomSheetRef = useRef(null);
  const notificationBottomSheetRef = useRef(null);
  const selectedItemBottomSheetRef = useRef(null);
  const selectedMeetupDetailBottomSheetRef = useRef(null);

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
  const onPressNotification = () => {
    notificationBottomSheetRef.current?.snapToIndex(0);
  };

  // useEffect(() => {
  //   // ここは、user pageからここに来て、doneをpressしたら, user pageへ戻る。addしたbadgesをparamsに入れていく感じ。
  //   props.navigation.setOptions({
  //     headerLeft: () => (
  //       <TouchableOpacity onPress={() => onPressNotification()}>
  //         <MaterialCommunityIcons name='mailbox' size={30} color={'white'} />
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, []);

  const handlePostBottomSheetChanges = (index) => {
    if (!props.bottomSheet.post.isOpen) {
      props.setIsSelectedItemBottomSheetOpen(false);
      selectedItemBottomSheetRef.current?.close();
      props.setIsPostBottomSheetOpen(true);
      postBottomSheetRef.current?.snapToIndex(0);
      // console.log('handleSheetChanges', index);
    } else if (props.bottomSheet.post.isOpen) {
      console.log('closing');
      props.setIsPostBottomSheetOpen(false);
      // bottomSheetRef.current?.snapToIndex(-1);
      postBottomSheetRef.current.close();
    }
  };

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

  const setMeetupLocation = (event) => {
    if (props.hostMeetup.isOpen) {
      props.setMeetupLocation(event.nativeEvent.coordinate);
    } else {
      return null;
    }
  };

  const onPressOkConfirmHostMeetup = () => {
    props.setIsHostMeetupOpen(true);
    props.setIsConfirmHostMeetupModalOpen(false);
  };

  const onPressCancelConfirmHostMeetup = () => {
    props.setIsConfirmHostMeetupModalOpen(false);
  };

  const onPressYesCancelLaunchMeetup = () => {
    props.setIsHostMeetupOpen(false);
    props.setIsCancelLaunchMeetupModalOpen(false);
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

  // これが、hostMeetupでbottomSheetが開いた時の自動map移動。
  useEffect(() => {
    if (props.hostMeetup.isOpen && props.hostMeetup.setLocation) {
      const newLat = props.hostMeetup.setLocation.latitude - 0.021;
      mapRef.current.animateToRegion({
        latitude: newLat,
        longitude: props.hostMeetup.setLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [props.hostMeetup]);

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
            <SetMeetupLocation />
            <MapMarkers handleSelectedItemBottomSheetChanges={handleSelectedItemBottomSheetChanges} />
          </MapView>

          {/* <ModalContainer
            modalOpen={props.modal.selectMeetupBadges.isOpen}
            onPressOk={onPressOkSelectBadge}
            onPressCancel={onPressCancelSelectBadge}
            okText={'Done'}
          >
            <Badges />
          </ModalContainer> */}
          <ModalContainer
            modalOpen={props.modal.confirmHostMeetup.isOpen}
            onPressOk={onPressOkConfirmHostMeetup}
            onPressCancel={onPressCancelConfirmHostMeetup}
            okText={'Ok'}
          >
            <ConfirmHostMeetup />
          </ModalContainer>

          <ModalContainer
            modalOpen={props.modal.cancelLaunchMeetup.isOpen}
            onPressOk={onPressYesCancelLaunchMeetup}
            onPressCancel={onPressCancelConfirmHostMeetup}
            okText={'Yes'}
          >
            <CancelLaunchMeetup />
          </ModalContainer>

          {/* <FABMenu navigation={props.navigation} /> */}
          <SnackBar />
          <PostBottomSheet postBottomSheetRef={postBottomSheetRef} />

          <SelectedMeetup
            navigation={props.navigation}
            selectedItemBottomSheetRef={selectedItemBottomSheetRef}
            handleselectedMeetupDetailBottomSheetChanges={handleselectedMeetupDetailBottomSheetChanges}
          />
          <SelectedMeetupInfoDetail
            navigation={props.navigation}
            selectedMeetupDetailBottomSheetRef={selectedMeetupDetailBottomSheetRef}
          />
          <Notifications navigation={props.navigation} notificationBottomSheetRef={notificationBottomSheetRef} />
          <AppMenusBottomSheet appMenuBottomSheetRef={appMenuBottomSheetRef} />
          <HostMeetupBottomSheet navigation={props.navigation} route={props.route} />

          {/* <SelectedItemBottomSheet selectedItemBottomSheetRef={selectedItemBottomSheetRef} /> */}
          {/* <CancelHostMeetupButton /> */}
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
