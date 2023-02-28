import React, { useEffect, useRef, useState, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import GlobalContext from '../../GlobalContext';
import CameraContext from './CameraContext';
import { Text, View, TouchableOpacity } from 'react-native';
import lampostAPI from '../../apis/lampost';
import { Camera, CameraType } from 'expo-camera';
import AppMenuBottomSheet from './AppMenuBotttomSheet/Container';
import TimeMachineBottomSheet from './TimeMachineBottomSheet/Container';
import CameraModeBottomSheet from './ChangeModeBottomSheet/Container';
import FlipCameraBottomSheet from './FlipBottomSheet';
import TagPeopleBottomSheet from './TagPeopleBottomSheet/Container';
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

const Container = (props) => {
  const { auth, setAuth, setSnackBar, myUpcomingMeetups } = useContext(GlobalContext);
  const appMenuBottomSheetRef = useRef(null);
  const timeMachineBottomSheetRef = useRef(null);
  const cameraModeBottomSheetRef = useRef(null);
  const flipBottomSheetRef = useRef(null);
  const tagPeopleBottomSheetRef = useRef(null);
  const cameraRef = useRef(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [cameraMode, setCameraMode] = useState('photo');
  const [photoEffect, setPhotoEffect] = useState('auto');
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();
  const [havingMeetup, setHavingMeetup] = useState(false);
  const [currentMeetup, setCurrentMeetup] = useState(null);
  const [taggedPeople, setTaggedPeople] = useState([]);

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
  useFocusEffect(
    React.useCallback(() => {
      loadMe();
    }, [])
  );

  useEffect(() => {
    for (const meetup in myUpcomingMeetups) {
      if (myUpcomingMeetups[meetup].state === 'ongoing') {
        return setCurrentMeetup(meetup);
      }
      // console.log(myUpcomingMeetups[meetup]);
    }
  }, []);

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
    if (currentMeetup) {
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

  const recordVideo = () => {
    setIsRecording(true);
    const options = {
      quality: '1080p',
      maxDuration: 60,
      mute: false,
    };
    cameraRef.current.recordAsync(options).then((recordedVideo) => {
      setVideo(recordedVideo);
    });
    setIsRecording(false);
  };

  const stopRecording = () => {
    setIsRecording(false);
    cameraRef.current.stopRecording();
  };

  // 基本的に、10秒以内の動画は保存しないようにする
  let takePhoto = async () => {
    if (!auth.data) {
      setIsWarningModalOpen(true);
      setWarningMessage('Please signup or login at first.');
    } else {
      // ここでいちなりapi requestをするんだよ。
      if (auth.data.ongoingMeetup.state) {
        setSnackBar({
          isVisible: true,
          message: 'Nice shot!',
          barType: 'success',
          duration: 1500,
        });
        let options = {
          quality: 1,
          base64: true,
          exif: false,
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        const formData = new FormData();
        // photo fieldよりも後にmeetupIdをappendするとダメなんだよな。。。何でだろ。。。
        formData.append('meetupId', auth.data.ongoingMeetup.meetup);
        formData.append('userId', auth.data._id);
        formData.append('asset', {
          name: newPhoto.uri.split('/').pop(),
          uri: newPhoto.uri,
          type: 'image/jpg',
        });
        // userIdを使ってまず、userのmeetup中かを調べる。
        try {
          const result = await lampostAPI.post(`/assets/photos`, formData, {
            headers: { 'Content-type': 'multipart/form-data' },
          });
          console.log('Youu are now in the meetup');
        } catch (error) {
          console.log(error);
          console.log(error.response.data);
          // まあとりあえず、ここでerror catchできている。
          // modalかなんかでerrorの内容を表示してあげればいい。
        }
      } else {
        setIsWarningModalOpen(true);
        setWarningMessage('Camera is only available during the meetup.');
      }
    }
  };
  // incandescent, cloudy, sunny, shadow, fluorescent, auto

  if (video) {
  }

  return (
    <CameraContext.Provider
      value={{
        appMenuBottomSheetRef,
        timeMachineBottomSheetRef,
        cameraModeBottomSheetRef,
        flipBottomSheetRef,
        tagPeopleBottomSheetRef,
        cameraMode,
        setCameraMode,
        cameraType,
        setCameraType,
        CameraType,
        photoEffect,
        setPhotoEffect,
        isWarningModalOpen,
        setIsWarningModalOpen,
        warningMessage,
        setWarningMessage,
        taggedPeople,
        setTaggedPeople,
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            flashMode={'on'}
            ref={cameraRef}
            type={cameraType}
            whiteBalance={photoEffect}
          >
            {cameraMode === 'video' ? (
              <View
                style={{
                  backgroundColor: appBottomSheetBackgroundColor,
                  position: 'absolute',
                  top: 80,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <MaterialIcons name='hourglass-top' size={25} color='white' />
                <Text style={{ color: baseTextColor, fontSize: 15, fontWeight: 'bold' }}>3:00</Text>
              </View>
            ) : null}
          </Camera>
        </View>
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
            <TouchableOpacity style={{ marginRight: 10 }} onPress={() => appMenuBottomSheetRef.current.snapToIndex(0)}>
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
            <TouchableOpacity style={{}} onPress={() => console.log('taking')} disabled={currentMeetup ? false : true}>
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
            </TouchableOpacity>
          </View>
        ) : null}
        <AppMenuBottomSheet />
        <TimeMachineBottomSheet />
        <CameraModeBottomSheet />
        <FlipCameraBottomSheet />
        <TagPeopleBottomSheet />
        <WarningModal />
      </View>
    </CameraContext.Provider>
  );
};

export default Container;
