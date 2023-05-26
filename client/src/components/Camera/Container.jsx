import React, { useEffect, useRef, useState, useContext } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import GlobalContext from '../../GlobalContext';
import CameraContext from './CameraContext';
import lampostAPI from '../../apis/lampost';
import { Camera, CameraType } from 'expo-camera';
import * as SecureStore from 'expo-secure-store';
import Timer from './Timer';
import Shutter from './Shutter';
import MoodBottomSheet from './MoodBottomSheet';
import LoadingSpinner from '../Utils/LoadingSpinner';
import SnackBar from '../Utils/SnackBar';
import {
  appBottomSheetBackgroundColor,
  baseBackgroundColor,
  baseTextColor,
  iconColorsTable,
  backgroundColorsTable,
  sectionBackgroundColor,
} from '../../utils/colorsTable';
import { iconsTable } from '../../utils/icons';
const { MaterialCommunityIcons, MaterialIcons, Ionicons } = iconsTable;

const Container = (props) => {
  const { auth, setAuth, setSnackBar, myUpcomingMeetups, setLoading, isIpad } = useContext(GlobalContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 7.5;
  const badgeContainerWidth = oneGridWidth * 0.6;
  const badgeIconWidth = badgeContainerWidth * 0.65;
  const tagPeopleBottomSheetRef = useRef(null);
  const videoEffectBottomSheetRef = useRef(null);
  const photoEffectBottomSheetRef = useRef(null);
  const moodBottomSheetRef = useRef(null);
  const cameraRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [cameraMode, setCameraMode] = useState('photo');
  const [isFriendCam, setIsFriendCam] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);
  const [mood, setMood] = useState('😃');
  const [photoEffect, setPhotoEffect] = useState('normal');
  const [videoEffect, setVideoEffect] = useState('normal'); // normal, black and white very old,
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();
  const [videoLength, setVideoLength] = useState(180); // time machineの時だけ、1分にする。
  const [havingMeetup, setHavingMeetup] = useState(false);
  const [currentMeetup, setCurrentMeetup] = useState(null);
  const [ongoingMeetup, setOngoingMeetup] = useState(null);
  const [taggedPeople, setTaggedPeople] = useState({});
  const [meetupAttendees, setMeetupAttendees] = useState({});
  const [isMeetupOngoing, setIsMeetupOngoing] = useState(false);
  const [duration, setDuration] = useState(0);
  const durationRef = useRef(null);

  const getAttendees = async () => {
    const result = await lampostAPI.get(`meetupanduserrelationships/meetup/${ongoingMeetup._id}/users`);
    const { meetupAttendees } = result.data;
    setMeetupAttendees(() => {
      const attendeesTable = {};
      meetupAttendees.forEach((attendee, index) => {
        attendeesTable[attendee.user._id] = attendee;
      });
      return attendeesTable;
    });
  };

  // 60秒経ったら終わり。
  useEffect(() => {
    // console.log('camera compo');
    const meetupList = Object.values(myUpcomingMeetups);
    if (meetupList.length) {
      meetupList.forEach((meetup) => {
        if (meetup.state === 'ongoing') {
          return setOngoingMeetup({ _id: meetup._id, title: meetup.title, place: meetup.place });
        } else {
          setSnackBar({
            isVisible: true,
            barType: 'info',
            message: 'Camera can only be used during the meetup.',
            duration: 5000,
          });
        }
      });
    } else {
      setSnackBar({
        isVisible: true,
        barType: 'info',
        message: 'Camera can only be used during the meetup.',
        duration: 5000,
      });
    }
  }, [myUpcomingMeetups]);

  useEffect(() => {
    if (ongoingMeetup) {
      setSnackBar({
        isVisible: true,
        barType: 'success',
        message: 'Ready to use. Capture your snapshots and have fun 🔥',
        duration: 7000,
      });
      getAttendees();
    }
  }, [ongoingMeetup]);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setDuration((previous) => previous + 1);
      }, 1000);
    } else if (!isRecording) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    durationRef.current = duration;
  }, [duration]);

  const askCameraPermission = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
    setHasCameraPermission(cameraPermission.status === 'granted');
    setHasMicrophonePermission(microphonePermission.status === 'granted');
  };
  useEffect(() => {
    askCameraPermission();
  }, []);

  const toggleFlashMode = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setSnackBar({
        isVisible: true,
        barType: 'success',
        message: 'Camera flash has been turned on.',
        duration: 5000,
      });
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      setSnackBar({
        isVisible: true,
        barType: 'success',
        message: 'Camera flash has been turned off.',
        duration: 5000,
      });
    }

    setFlashMode(
      flashMode === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off
    );
  };

  if (hasCameraPermission === undefined || hasMicrophonePermission === undefined) {
    return (
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor, marginTop: 50 }}>
        <Text style={{ color: baseTextColor, textAlign: 'center', fontSize: 20 }}>Accessing your camera...🤔</Text>
      </View>
    );
  } else if (!hasCameraPermission) {
    return (
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor, marginTop: 50 }}>
        <Text style={{ color: baseTextColor, textAlign: 'center', fontSize: 20 }}>
          Permission for camera not granted. Please go to Settings of your phone to experience Lampost's special
          features.
        </Text>
      </View>
    );
  }

  const handlePinch = (event) => {
    var scale = event.nativeEvent.scale;
    var velocity = event.nativeEvent.velocity / 20;
    let newZoom =
      velocity > 0
        ? zoomLevel + scale * velocity * (Platform.OS === 'ios' ? 0.01 : 25)
        : zoomLevel - scale * Math.abs(velocity) * (Platform.OS === 'ios' ? 0.02 : 50);

    if (newZoom < 0) newZoom = 0;
    else if (newZoom > 0.5) newZoom = 0.5;
    setZoomLevel(newZoom);
  };

  return (
    <CameraContext.Provider
      value={{
        tagPeopleBottomSheetRef,
        videoEffectBottomSheetRef,
        photoEffectBottomSheetRef,
        moodBottomSheetRef,
        cameraMode,
        cameraRef,
        setCameraMode,
        cameraType,
        setCameraType,
        CameraType,
        photoEffect,
        setPhotoEffect,
        videoEffect,
        setVideoEffect,
        isWarningModalOpen,
        setIsWarningModalOpen,
        warningMessage,
        setWarningMessage,
        taggedPeople,
        setTaggedPeople,
        meetupAttendees,
        setMeetupAttendees,
        currentMeetup,
        ongoingMeetup,
        mood,
        setMood,
        isRecording,
        setIsRecording,
        duration,
        setDuration,
        durationRef,
        videoLength,
        navigation: props.navigation,
        isFriendCam,
      }}
    >
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <PinchGestureHandler
          onGestureEvent={(event) => handlePinch(event)}
          // onHandlerStateChange={(event) => handlePinchStateChange(event)}
        >
          <View
            style={{
              flex: cameraMode === 'photo' ? null : 1,
              width: cameraMode === 'photo' ? '100%' : null,
              paddingTop: cameraMode === 'photo' ? 70 : null,
              // alignItems: 'center',
              // justifyContent: 'center',
            }}
          >
            <Camera
              style={{
                flex: cameraMode === 'photo' ? null : 1,
                width: cameraMode === 'photo' ? '100%' : null,
                aspectRatio: cameraMode === 'photo' ? 3 / 4 : null,
              }}
              flashMode={'off'}
              ref={cameraRef}
              type={cameraType}
              whiteBalance={photoEffect}
              ratio={'1:1'}
              zoom={zoomLevel}
              // videoQuality='480p'
            >
              <Timer />
              {/* <RenderFriendCam /> */}
            </Camera>
          </View>
        </PinchGestureHandler>
        <Shutter />
        {/* <Timer /> */}
        {auth.isAuthenticated ? (
          isRecording ? null : (
            <View
              style={{
                backgroundColor: sectionBackgroundColor,
                position: 'absolute',
                bottom: 0,
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                width: '100%',
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              <View
                style={{
                  width: oneGridWidth,
                  height: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                }}
              >
                {cameraMode === 'photo' ? (
                  <View
                    style={{
                      width: oneGridWidth,
                      height: 80,
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor: 'red',
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: backgroundColorsTable['blue1'],
                        padding: 10,
                        borderRadius: 10,
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 5,
                      }}
                      onPress={() => setCameraMode('video')}
                    >
                      <Ionicons name='videocam' size={25} color={iconColorsTable['blue1']} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', textAlign: 'center' }}>Take video</Text>
                  </View>
                ) : (
                  <View
                    style={{
                      width: oneGridWidth,
                      height: 80,
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor: 'red',
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: backgroundColorsTable['blue1'],
                        padding: 10,
                        borderRadius: 10,
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 5,
                      }}
                      onPress={() => setCameraMode('photo')}
                    >
                      <Ionicons name='image' size={25} color={iconColorsTable['blue1']} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', textAlign: 'center' }}>Take photo</Text>
                  </View>
                )}
              </View>
              <View
                style={{
                  width: oneGridWidth,
                  height: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: backgroundColorsTable['green1'],
                    padding: 10,
                    borderRadius: 10,
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}
                  disabled={isFriendCam ? true : false}
                  onPress={() => {
                    if (cameraType === CameraType.back) {
                      setCameraType(CameraType.front);
                    } else {
                      setCameraType(CameraType.back);
                    }
                  }}
                >
                  {/* <Ionicons name='ios-pricetags' size={20} color={iconColorsTable['green1']} /> */}
                  <MaterialCommunityIcons name='camera-flip' size={20} color={iconColorsTable['green1']} />
                  {isFriendCam ? <Text style={{ position: 'absolute', right: -5, top: -5 }}>🚫</Text> : null}
                </TouchableOpacity>
                <Text style={{ color: 'white', textAlign: 'center' }}>Flip</Text>
              </View>
              {/* <View
                style={{
                  width: oneGridWidth,
                  height: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: backgroundColorsTable['blue1'],
                    padding: 10,
                    borderRadius: 10,
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}
                  onPress={() => {
                    toggleFlashMode();
                  }}
                >
                  <MaterialCommunityIcons
                    name={flashMode === Camera.Constants.FlashMode.off ? 'lightbulb-off' : 'lightbulb-on'}
                    size={20}
                    color={iconColorsTable['blue1']}
                  />
                </TouchableOpacity>
                <Text style={{ color: 'white', textAlign: 'center' }}>
                  {flashMode === Camera.Constants.FlashMode.off ? 'Flash off' : 'Flash on'}
                </Text>
              </View> */}
              <View
                style={{
                  width: oneGridWidth,
                  height: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: backgroundColorsTable['red1'],
                    padding: 10,
                    borderRadius: 10,
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}
                  onPress={() => {
                    if (isFriendCam) {
                      setSnackBar({
                        isVisible: true,
                        barType: 'success',
                        message: 'Reverted to normal cam.',
                        duration: 3000,
                      });
                    } else {
                      setSnackBar({
                        isVisible: true,
                        barType: 'success',
                        message: `Friend cam has been turned on.${'\n'}Whose photo/video do you take?`,
                        duration: 5000,
                      });
                    }
                    setIsFriendCam((previous) => !previous);
                    if (cameraType === CameraType.front) {
                      setCameraType(CameraType.back);
                    }
                  }}
                >
                  {isFriendCam ? (
                    <Ionicons name='camera' size={25} color={iconColorsTable['red1']} />
                  ) : (
                    <MaterialCommunityIcons name='heart' size={25} color={iconColorsTable['red1']} />
                  )}
                </TouchableOpacity>
                <Text style={{ color: 'white', textAlign: 'center' }}>{isFriendCam ? 'Normal cam' : 'Friend cam'}</Text>
              </View>
              <View
                style={{
                  width: oneGridWidth,
                  height: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: backgroundColorsTable['yellow1'],
                    padding: 10,
                    borderRadius: 10,
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}
                  onPress={() => {
                    moodBottomSheetRef.current.snapToIndex(0);
                  }}
                >
                  <Text style={{ fontSize: 30 }}>{mood}</Text>
                </TouchableOpacity>
                <Text style={{ color: 'white', textAlign: 'center' }}>Mood</Text>
              </View>
            </View>
          )
        ) : null}
        <MoodBottomSheet />
        <SnackBar />
        <LoadingSpinner textContent={`${mood}${mood}${mood}`} />
      </View>
    </CameraContext.Provider>
  );
};

export default Container;
