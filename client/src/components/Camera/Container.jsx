import React, { useEffect, useRef, useState, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import GlobalContext from '../../GlobalContext';
import CameraContext from './CameraContext';
import { Text, View, TouchableOpacity } from 'react-native';
import lampostAPI from '../../apis/lampost';
import { Camera, CameraType } from 'expo-camera';
import AppMenuBottomSheet from './AppMenuBotttomSheet/Container';
import { appBottomSheetBackgroundColor, baseBackgroundColor, baseTextColor } from '../../utils/colorsTable';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import WarningModal from './WarningModal';

const Container = (props) => {
  const { auth, setAuth } = useContext(GlobalContext);
  const appMenuBottomSheetRef = useRef(null);
  const cameraRef = useRef();
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [cameraMode, setCameraMode] = useState('photo');
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [hasCameraPermission, setHasCameraPermission] = useState();

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

  const askCameraPermission = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraPermission.status === 'granted');
  };
  useEffect(() => {
    askCameraPermission();
  }, []);

  if (hasCameraPermission === undefined) {
    return (
      <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
        <Text style={{ color: baseTextColor }}>Accessing your camera...</Text>;
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

  // 基本的に、10秒以内の動画は保存しないようにする.
  let takePhoto = async () => {
    if (!auth.data) {
      setIsWarningModalOpen(true);
      setWarningMessage('Please signup or login at first.');
    } else {
      // ここでいちなりapi requestをするんだよ。
      if (auth.data.ongoingMeetup.state) {
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

  return (
    <CameraContext.Provider
      value={{
        appMenuBottomSheetRef,
        cameraMode,
        setCameraMode,
        isWarningModalOpen,
        setIsWarningModalOpen,
        warningMessage,
        setWarningMessage,
      }}
    >
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => takePhoto()}>
          <Camera style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} ref={cameraRef} type={cameraType}>
            {/* <StatusBar hidden={true} style='auto' /> */}
            {/* <IconButton
          icon='close'
          iconColor='white'
          containerColor='rgb(74, 74, 74)'
          style={{ position: 'absolute', top: 35, left: 10 }}
          onPress={() => props.navigation.navigate('Map')}
        /> */}
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
            <View style={{ flexDirection: 'column', position: 'absolute', top: 80, right: 10 }}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderRadius: 10,
                  marginBottom: 10,
                  backgroundColor: appBottomSheetBackgroundColor,
                }}
                onPress={() => {
                  setCameraType((currentCameraType) =>
                    currentCameraType === CameraType.back ? CameraType.front : CameraType.back
                  );
                }}
              >
                <Ionicons name='ios-camera-reverse' size={35} color='white' />
              </TouchableOpacity>
            </View>
          </Camera>
        </TouchableOpacity>
        <AppMenuBottomSheet />
        <WarningModal />
      </View>
    </CameraContext.Provider>
  );
};

export default Container;
