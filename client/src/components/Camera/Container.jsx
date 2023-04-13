import React, { useEffect, useRef, useState, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import GlobalContext from '../../GlobalContext';
import CameraContext from './CameraContext';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
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
} from '../../utils/colorsTable';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import WarningModal from './WarningModal';
import { Video } from 'expo-av';
import FastImage from 'react-native-fast-image';

const Container = (props) => {
  const { auth, setAuth, setSnackBar, myUpcomingMeetups, setLoading } = useContext(GlobalContext);
  const appMenuBottomSheetRef = useRef(null);
  const timeMachineBottomSheetRef = useRef(null);
  const cameraModeBottomSheetRef = useRef(null);
  const flipBottomSheetRef = useRef(null);
  const tagPeopleBottomSheetRef = useRef(null);
  const videoEffectBottomSheetRef = useRef(null);
  const photoEffectBottomSheetRef = useRef(null);
  const cameraRef = useRef(null);
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
    console.log('camera compo');
    const meetupList = Object.values(myUpcomingMeetups);
    if (meetupList.length) {
      meetupList.forEach((meetup) => {
        if (meetup.state === 'ongoing') {
          return setOngoingMeetup(meetup._id);
        }
      });
    }
  }, [myUpcomingMeetups]);

  // useEffect(() => {
  //   if (!ongoingMeetup) {
  //     setSnackBar({
  //       isVisible: true,
  //       barType: 'warning',
  //       message: 'You can take photos/videos during your meetup time',
  //       duration: 7000,
  //     });
  //   }
  // }, [ongoingMeetup]);

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

  if (hasCameraPermission === undefined || hasMicrophonePermission === undefined) {
    return (
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        <Text style={{ color: baseTextColor }}>Accessing your camera...</Text>
      </View>
    );
  } else if (!hasCameraPermission) {
    return (
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        <Text style={{ color: baseTextColor }}>
          Permission for camera not granted. Please change this in settings of your phone.
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
      formData.append('meetupId', ongoingMeetup);
      formData.append('userId', auth.data._id);
      formData.append('type', cameraMode); // photo
      formData.append('effect', videoEffect);
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
    formData.append('meetupId', ongoingMeetup);
    formData.append('userId', auth.data._id);
    formData.append('type', cameraMode); // photo
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

  if (video) {
  }

  const renderCameraButton = () => {
    if (cameraMode === 'photo') {
      return (
        <TouchableOpacity
          style={{ position: 'absolute', bottom: 100, alignSelf: 'center' }}
          onPress={() => takePhoto()}
          disabled={ongoingMeetup ? false : true}
        >
          <View
            style={{
              backgroundColor: 'white',
              // padding: 10,
              flexDirection: 'row',
              borderRadius: 30,
              width: 60,
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          ></View>
          {/* {isCameraButtonReady()} */}
        </TouchableOpacity>
      );
    } else if (cameraMode === 'video') {
      return (
        <TouchableOpacity
          style={{ position: 'absolute', bottom: 100, alignSelf: 'center' }}
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
          <View
            style={{
              backgroundColor: backgroundColorsTable['violet1'],
              position: 'absolute',
              bottom: 20,
              borderRadius: 10,
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}
          >
            <TouchableOpacity style={{}} onPress={() => appMenuBottomSheetRef.current.snapToIndex(0)}>
              <View
                style={{
                  backgroundColor: iconColorsTable['violet1'],
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 10,
                }}
              >
                <Ionicons name='ios-apps' size={25} color={'white'} />
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity style={{}} onPress={() => takePhoto()} disabled={currentMeetup ? false : true}>
              <View
                style={{
                  backgroundColor: iconColorsTable['violet1'],
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 10,
                }}
              >
                <MaterialCommunityIcons name='camera-iris' size={25} color='white' />
              </View>
              {isCameraButtonReady()}
            </TouchableOpacity> */}
          </View>
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
        <LoadingSpinner />
      </View>
    </CameraContext.Provider>
  );
};

export default Container;
