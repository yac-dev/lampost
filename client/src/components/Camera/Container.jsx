import React, { useEffect, useRef, useState, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import GlobalContext from '../../GlobalContext';
import CameraContext from './CameraContext';
import { Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import lampostAPI from '../../apis/lampost';
import { Camera, CameraType } from 'expo-camera';
import LoadingSpinner from '../Utils/LoadingSpinner';
import SnackBar from '../Utils/SnackBar';
import AppMenuBottomSheet from './AppMenuBotttomSheet/Container';
// import TimeMachineBottomSheet from './TimeMachineBottomSheet/Container';
import CameraModeBottomSheet from './ChangeModeBottomSheet/Container';
import FlipCameraBottomSheet from './FlipBottomSheet';
import TagPeopleBottomSheet from './TagPeopleBottomSheet/Container';
import PhotoEffectBottomSheet from './PhotoEffectBottomSheet/Container';
import VideoEffectBottomSheet from './VideoEffectBottomSheet/Container';
import {
  appBottomSheetBackgroundColor,
  baseBackgroundColor,
  baseTextColor,
  rnDefaultBackgroundColor,
  iconColorsTable,
  backgroundColorsTable,
  inputBackgroundColorNew,
  screenSectionBackgroundColor,
  sectionBackgroundColor,
} from '../../utils/colorsTable';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import WarningModal from './WarningModal';
import { Video } from 'expo-av';
import FastImage from 'react-native-fast-image';

const Container = (props) => {
  const { auth, setAuth, setSnackBar, myUpcomingMeetups, setLoading, isIpad } = useContext(GlobalContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 7.5;
  const badgeContainerWidth = oneGridWidth * 0.6;
  const badgeIconWidth = badgeContainerWidth * 0.65;
  const appMenuBottomSheetRef = useRef(null);
  const timeMachineBottomSheetRef = useRef(null);
  const cameraModeBottomSheetRef = useRef(null);
  const flipBottomSheetRef = useRef(null);
  const tagPeopleBottomSheetRef = useRef(null);
  const videoEffectBottomSheetRef = useRef(null);
  const photoEffectBottomSheetRef = useRef(null);
  const cameraRef = useRef(null);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [cameraMode, setCameraMode] = useState('photo');
  const [photoEffect, setPhotoEffect] = useState('normal');
  const [videoEffect, setVideoEffect] = useState('normal'); // normal, black and white very old,
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();
  const [videoLength, setVideoLength] = useState(60); // time machineの時だけ、1分にする。
  const [havingMeetup, setHavingMeetup] = useState(false);
  const [currentMeetup, setCurrentMeetup] = useState(null);
  const [ongoingMeetup, setOngoingMeetup] = useState(null);
  const [taggedPeople, setTaggedPeople] = useState({});
  const [meetupAttendees, setMeetupAttendees] = useState({});
  const [isMeetupOngoing, setIsMeetupOngoing] = useState(false);
  const [duration, setDuration] = useState(0);
  const durationRef = useRef(null);

  // const getMyUpcomingMeetupStates = async () => {
  //   if (auth.data.upcomingMeetups.length) {
  //     const result = await lampostAPI.post('/meetups/mymeetupstates', { upcomingMeetupIds: auth.data.upcomingMeetups });
  //     const { myUpcomingMeetups } = result.data;
  //     setIsFetchedMyUpcomingMeetups(true);
  //   }
  // };

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

  const renderTaggedPeople = () => {
    const taggedPeopleList = Object.values(taggedPeople);
    if (taggedPeopleList.length) {
      const list = taggedPeopleList.map((attendee, index) => {
        return (
          <FastImage
            key={index}
            source={{
              uri: attendee.user.photo
                ? attendee.user.photo
                : 'https://lampost-dev.s3.us-east-2.amazonaws.com/avatars/default.png',
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 7,
              backgroundColor: iconColorsTable['blue1'],
              marginRight: 10,
            }}
            tintColor={attendee.user.photo ? null : 'white'}
          />
        );
      });

      return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>
        </ScrollView>
      );
    }
  };

  const getAttendees = async () => {
    const result = await lampostAPI.get(`meetupanduserrelationships/meetup/${ongoingMeetup._id}/users`);
    const { meetupAttendees } = result.data;
    console.log('you can tag these', meetupAttendees);
    setMeetupAttendees(() => {
      const attendeesTable = {};
      meetupAttendees.forEach((attendee, index) => {
        attendeesTable[attendee.user._id] = attendee;
      });
      return attendeesTable;
    });
  };

  // やっていることは、単純にこのmeetupがongoingかを調べるだけ。
  // const checkIsMeetupOngoing = async () => {
  //   const result = await lampostAPI.get(`/meetups/${props.route.params.meetupId}/isongoing`);
  //   const { isMeetupOngoing } = result.data;
  //   setIsMeetupOngoing(isMeetupOngoing);
  // };

  // というか、useEffectの方がいいかね。。。
  // 今のmeetupをここでdetectする感じ。
  // useFocusEffect(
  //   React.useCallback(() => {
  //     // loadMe();
  //     const meetupList = Object.values(myUpcomingMeetups);
  //     if (meetupList.length) {
  //       meetupList.forEach((meetup) => {
  //         if (meetup.state === 'ongoing') {
  //           return setCurrentMeetup(meetup._id);
  //         }
  //       });
  //     }
  //     // for (const meetup in myUpcomingMeetups) {
  //     //   if (myUpcomingMeetups[meetup].state === 'ongoing') {
  //     //     return setCurrentMeetup(meetup);
  //     //   }
  //     //   // console.log(myUpcomingMeetups[meetup]);
  //     // }
  //   }, [])
  // );
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

  const renderTimer = () => {
    if (cameraMode === 'video') {
      const rest = videoLength - duration;
      return (
        <View
          style={{
            backgroundColor: appBottomSheetBackgroundColor,
            position: 'absolute',
            top: 20,
            alignSelf: 'center',
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 10,
          }}
        >
          <MaterialIcons name='hourglass-top' size={25} color='white' />
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{rest}</Text>
        </View>
      );
    } else {
      return null;
    }
  };

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
    // なんで、これでwarningなの？？
    // setFlashMode((previous) => {
    //   if (previous === Camera.Constants.FlashMode.off) {
    //     setSnackBar({
    //       isVisible: true,
    //       barType: 'success',
    //       message: 'Camera flash has been turned on.',
    //       duration: 5000,
    //     });
    //     return Camera.Constants.FlashMode.on;
    //   } else {
    //     setSnackBar({
    //       isVisible: true,
    //       barType: 'success',
    //       message: 'Camera flash has been turned off.',
    //       duration: 5000,
    //     });
    //     return Camera.Constants.FlashMode.off;
    //   }
    // });
  };

  if (hasCameraPermission === undefined || hasMicrophonePermission === undefined) {
    return (
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor, marginTop: 50 }}>
        <Text style={{ color: baseTextColor, textAlign: 'center' }}>Accessing your camera...🤔</Text>
      </View>
    );
  } else if (!hasCameraPermission) {
    return (
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor, marginTop: 50 }}>
        <Text style={{ color: baseTextColor, textAlign: 'center', fontSize: 20 }}>
          Permission for camera not granted. Please change this in settings of your phone if you wanna experience
          Lampost's special features.
        </Text>
      </View>
    );
  }

  const isCameraButtonReady = () => {
    if (ongoingMeetup) {
      return (
        <View style={{ position: 'absolute', right: -7, top: -7 }}>
          <Text>👍</Text>
        </View>
      );
    } else {
      return (
        <View style={{ position: 'absolute', right: -5, top: -5 }}>
          <Text>🚫</Text>
        </View>
      );
    }
  };

  const videoButton = () => {
    if (isRecording) {
      stopRecording();
    } else {
      recordVideo();
    }
  };

  const recordVideo = () => {
    setIsRecording(true);
    const options = {
      quality: '1080p',
      maxDuration: 60,
      mute: false,
    };
    cameraRef.current.recordAsync(options).then(async (recordedVideo) => {
      setVideo(recordedVideo);
      console.log(recordedVideo);
      setIsRecording(false);
      const formData = new FormData();
      formData.append('meetupId', ongoingMeetup._id);
      formData.append('userId', auth.data._id);
      formData.append('type', cameraMode); // photo
      formData.append('effect', videoEffect);
      formData.append('place', ongoingMeetup.place);
      formData.append('duration', durationRef.current);
      formData.append('asset', {
        name: recordedVideo.uri.split('/').pop(),
        uri: recordedVideo.uri,
        type: 'video/mov',
      });
      console.log(formData);
      // ここでapi requestを送る感じか。
      const result = await lampostAPI.post(`/assets/videos`, formData, {
        headers: { 'Content-type': 'multipart/form-data' },
      });
      setDuration(0);
      setSnackBar({
        isVisible: true,
        message: 'Nice shot 📸',
        barType: 'success',
        duration: 1500,
      });
    });
  };

  const stopRecording = async () => {
    setIsRecording(false);
    cameraRef.current.stopRecording();
  };

  // 基本的に、10秒以内の動画は保存しないようにする
  let takePhoto = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };
    setLoading(true);
    let newPhoto = await cameraRef.current.takePictureAsync(options);
    const formData = new FormData();
    // photo fieldよりも後にmeetupIdをappendするとダメなんだよな。。。何でだろ。。。
    const taggedUserIds = Object.keys(taggedPeople);
    if (taggedUserIds.length) {
      for (var i = 0; i < taggedUserIds.length; i++) {
        formData.append(`taggedUser${i}`, taggedUserIds[i]);
      }
    }
    formData.append('meetupId', ongoingMeetup._id);
    formData.append('userId', auth.data._id);
    formData.append('type', cameraMode); // photo
    formData.append('place', ongoingMeetup.place);
    formData.append('effect', photoEffect);
    formData.append('asset', {
      name: newPhoto.uri.split('/').pop(),
      uri: newPhoto.uri,
      type: 'image/jpg',
    });
    // userIdを使ってまず、userのmeetup中かを調べる。
    // console.log(formData);
    try {
      const result = await lampostAPI.post(`/assets/photos`, formData, {
        headers: { 'Content-type': 'multipart/form-data' },
      });
      setLoading(false);
      setSnackBar({
        isVisible: true,
        message: 'Nice shot 📸',
        barType: 'success',
        duration: 1500,
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
    }
    // } else {
    //   setIsWarningModalOpen(true);
    //   setWarningMessage('Camera is only available during the meetup.');
    // }
    // }
  };
  // incandescent, cloudy, sunny, shadow, fluorescent, auto

  const renderCameraButton = () => {
    if (cameraMode === 'photo') {
      return (
        <View
          style={{ position: 'absolute', bottom: 120, alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}
        >
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:
                flashMode === Camera.Constants.FlashMode.off ? 'white' : backgroundColorsTable['yellow1'],
              marginRight: 20,
            }}
            onPress={() => {
              toggleFlashMode();
            }}
          >
            <MaterialCommunityIcons
              name='lightbulb-on'
              size={20}
              color={flashMode === Camera.Constants.FlashMode.off ? 'black' : iconColorsTable['yellow1']}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              // padding: 10,
              flexDirection: 'row',
              borderRadius: 35,
              width: 70,
              height: 70,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 20,
            }}
            onPress={() => takePhoto()}
            disabled={ongoingMeetup ? false : true}
          ></TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}
            onPress={() => {
              if (cameraType === CameraType.back) {
                setCameraType(CameraType.front);
              } else {
                setCameraType(CameraType.back);
              }
            }}
          >
            <MaterialCommunityIcons name='camera-flip' size={20} color={'black'} />
          </TouchableOpacity>
        </View>
      );
    } else if (cameraMode === 'video') {
      return (
        <TouchableOpacity
          style={{ position: 'absolute', bottom: 120, alignSelf: 'center' }}
          onPress={() => videoButton()}
          disabled={ongoingMeetup ? false : true}
        >
          {isRecording ? (
            // <Text style={{ color: 'white' }}>Recording</Text>
            // <Ionicons name='stop-circle' color={'white'} size={25} />
            <View
              style={{
                backgroundColor: 'white',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                width: 60,
                height: 60,
                borderRadius: 30,
              }}
            >
              <Text style={{ color: 'black', fontSize: 18 }}>Stop</Text>
            </View>
          ) : (
            // <MaterialCommunityIcons name='record-rec' size={25} color='white' />
            <View
              style={{
                backgroundColor: 'white',
                padding: 10,
                width: 60,
                height: 60,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'black', fontSize: 18 }}>Start</Text>
            </View>
          )}
          {/* {isCameraButtonReady()} */}
        </TouchableOpacity>
      );
    }
  };

  // recordingとtakingの時は、buttonをdisableにしないといかん。
  return (
    <CameraContext.Provider
      value={{
        appMenuBottomSheetRef,
        timeMachineBottomSheetRef,
        cameraModeBottomSheetRef,
        flipBottomSheetRef,
        tagPeopleBottomSheetRef,
        videoEffectBottomSheetRef,
        photoEffectBottomSheetRef,
        cameraMode,
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
      }}
    >
      <View style={{ flex: 1, backgroundColor: 'black' }}>
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
              aspectRatio: cameraMode === 'photo' ? 1 : null,
            }}
            flashMode={'off'}
            ref={cameraRef}
            type={cameraType}
            whiteBalance={photoEffect}
            ratio={'1:1'}
            // videoQuality='480p'
          >
            {renderTimer()}
          </Camera>
        </View>
        {renderCameraButton()}
        {auth.isAuthenticated ? (
          // <View
          //   style={{
          //     backgroundColor: backgroundColorsTable['violet1'],
          //     position: 'absolute',
          //     bottom: 20,
          //     borderRadius: 10,
          //     padding: 10,
          //     flexDirection: 'row',
          //     alignItems: 'center',
          //     alignSelf: 'center',
          //   }}
          // >
          //   <TouchableOpacity style={{}} onPress={() => appMenuBottomSheetRef.current.snapToIndex(0)}>
          //     <View
          //       style={{
          //         backgroundColor: iconColorsTable['violet1'],
          //         padding: 10,
          //         flexDirection: 'row',
          //         alignItems: 'center',
          //         borderRadius: 10,
          //       }}
          //     >
          //       <Ionicons name='ios-apps' size={25} color={'white'} />
          //     </View>
          //   </TouchableOpacity>
          // </View>
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
                        backgroundColor: backgroundColorsTable['red1'],
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
                      <Ionicons name='videocam' size={25} color={iconColorsTable['red1']} />
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
                        backgroundColor: backgroundColorsTable['red1'],
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
                      <Ionicons name='image' size={25} color={iconColorsTable['red1']} />
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
                    backgroundColor: backgroundColorsTable['yellow1'],
                    padding: 10,
                    borderRadius: 10,
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}
                  // onPress={() => {
                  //   if (cameraMode === 'photo') {
                  //     photoEffectBottomSheetRef.current.snapToIndex(0);
                  //   } else if (cameraMode === 'video') {
                  //     videoEffectBottomSheetRef.current.snapToIndex(0);
                  //   }
                  // }}
                >
                  <Text style={{ fontSize: 30 }}>😃</Text>
                </TouchableOpacity>
                <Text style={{ color: 'white', textAlign: 'center' }}>Mood</Text>
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
                  onPress={() => {
                    if (ongoingMeetup) {
                      tagPeopleBottomSheetRef.current.snapToIndex(0);
                    } else {
                      setSnackBar({
                        isVisible: true,
                        barType: 'warning',
                        message: 'OOPS. Tagging people is only available during the meetup.',
                        duration: 5000,
                      });
                    }
                  }}
                >
                  <Ionicons name='ios-pricetags' size={20} color={iconColorsTable['green1']} />
                </TouchableOpacity>
                <Text style={{ color: 'white', textAlign: 'center' }}>Tag people</Text>
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
                    if (cameraMode === 'photo') {
                      photoEffectBottomSheetRef.current.snapToIndex(0);
                    } else if (cameraMode === 'video') {
                      videoEffectBottomSheetRef.current.snapToIndex(0);
                    }
                  }}
                >
                  <MaterialCommunityIcons name='history' size={20} color={iconColorsTable['blue1']} />
                </TouchableOpacity>
                <Text style={{ color: 'white', textAlign: 'center' }}>Time Machine</Text>
              </View>
            </View>
          )
        ) : null}
        <AppMenuBottomSheet />
        {/* <TimeMachineBottomSheet /> */}
        <CameraModeBottomSheet />
        <FlipCameraBottomSheet />
        <TagPeopleBottomSheet />
        <PhotoEffectBottomSheet />
        <VideoEffectBottomSheet />
        <WarningModal />
        <SnackBar />
        <LoadingSpinner textContent={'😎😎😎'} />
      </View>
    </CameraContext.Provider>
  );
};

export default Container;
