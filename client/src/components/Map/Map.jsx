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
import { FAB, Portal, Provider } from 'react-native-paper';
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
import RNPDialog from '../Utils/RNPDialog';
import CancelHostMeetupButton from './HostMeetup/CancelHostMeetupButton';
import SetMeetupLocation from './HostMeetup/SetMeetupLocation';
import HostMeetupBottomSheet from './HostMeetup/BottomSheet';
import MeetupBadgesModal from './HostMeetup/Form/MeetupBadgesModal/Container';

// ac
import { loadMe } from '../../redux/actionCreators/auth';
import { getCurrentLocation } from '../../redux/actionCreators/auth';
import { setIsPostBottomSheetOpen } from '../../redux/actionCreators/bottomSheet';
import { setIsSelectedItemBottomSheetOpen } from '../../redux/actionCreators/bottomSheet';
import { selectPost } from '../../redux/actionCreators/selectItem';
import { setIsHostMeetupOpen } from '../../redux/actionCreators/hostMeetup';
import { setMeetupLocation } from '../../redux/actionCreators/hostMeetup';

const Map = (props) => {
  const [region, setRegion] = useState(null);
  const [currentSnap, setCurrentSnap] = useState();

  const postBottomSheetRef = useRef(null);
  const selectedItemBottomSheetRef = useRef(null);
  const mapRef = useRef(null);
  console.log('Map is rendered');

  const [state, setState] = React.useState({ open: false });
  const [tapped, setTapped] = useState(null);

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const mapStyle = [
    {
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },

    {
      featureType: 'administrative.country',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'administrative.province',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'administrative.locality',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
  ];

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

  const handleSelectedItemBottomSheetChanges = (post) => {
    if (!props.bottomSheet.selectedItem.isOpen) {
      props.selectPost(post);
      props.setIsPostBottomSheetOpen(false);
      postBottomSheetRef.current?.close();
      props.setIsSelectedItemBottomSheetOpen(true);
      selectedItemBottomSheetRef.current?.snapToIndex(0);
    } else if (props.bottomSheet.selectedItem.isOpen) {
      props.setIsSelectedItemBottomSheetOpen(false);
      // bottomSheetRef.current?.snapToIndex(-1);
      selectedItemBottomSheetRef.current.close();
    }
  };

  const setMeetupLocation = (event) => {
    if (props.hostMeetup.isOpen) {
      props.setMeetupLocation(event.nativeEvent.coordinate);
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

  // tappingMeetupの時だけね。

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

  return (
    <>
      <NBProvider>
        <View style={styles.container}>
          <MeetupBadgesModal />
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
          >
            <SetMeetupLocation />
            <MapMarkers handleSelectedItemBottomSheetChanges={handleSelectedItemBottomSheetChanges} />
          </MapView>
          <Provider>
            <Portal>
              <FAB.Group
                open={open}
                icon={open ? 'chevron-up' : 'apps'}
                actions={[
                  {
                    icon: 'plus',
                    label: 'Post',
                    onPress: () => handlePostBottomSheetChanges(),
                  },
                  {
                    icon: 'head-question',
                    label: 'Ask',
                    onPress: () => console.log('Pressed email'),
                  },
                  {
                    icon: 'account-group',
                    label: 'Host Meetup',
                    onPress: () => props.setIsHostMeetupOpen(true),
                  },
                  {
                    icon: 'video',
                    label: 'Start Live',
                    disabled: true,
                    onPress: () => console.log('Live'),
                  },
                ]}
                onStateChange={onStateChange}
                onPress={() => {
                  if (open) {
                    // do something if the speed dial is open
                  }
                }}
              />
            </Portal>
          </Provider>
          <PostBottomSheet postBottomSheetRef={postBottomSheetRef} />
          <SelectedItemBottomSheet selectedItemBottomSheetRef={selectedItemBottomSheetRef} />
          <CancelHostMeetupButton />
          <HostMeetupBottomSheet />
          <RNPDialog
            dialogState={props.dialog.confirmCreateMeetup.isOpen}
            title='Please tap the location where you wanna hold your meetup!'
          >
            <View>
              <Text>Heeey!</Text>
            </View>
          </RNPDialog>
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
  return { bottomSheet: state.bottomSheet, auth: state.auth, dialog: state.dialog, hostMeetup: state.hostMeetup };
};

export default connect(mapStateToProps, {
  loadMe,
  setIsPostBottomSheetOpen,
  setIsSelectedItemBottomSheetOpen,
  selectPost,
  getCurrentLocation,
  setIsHostMeetupOpen,
  setMeetupLocation,
})(Map);
