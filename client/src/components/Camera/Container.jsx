import React, { useEffect, useRef, useState, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import GlobalContext from '../../GlobalContext';
import CameraContext from './CameraContext';
import { Text, View, TouchableOpacity } from 'react-native';
import lampostAPI from '../../apis/lampost';
import { Camera } from 'expo-camera';
import AppMenuBottomSheet from './AppMenuBotttomSheet/Container';
import { appBottomSheetBackgroundColor, baseTextColor } from '../../utils/colorsTable';
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
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>;
  }

  // 基本的に、10秒以内の動画は保存しないようにする.
  let takePhoto = async () => {
    if (!auth.data) {
      setIsWarningModalOpen(true);
      setWarningMessage('Please signup or login at first.');
    } else {
      if (auth.data.isInMeetup) {
        let options = {
          quality: 1,
          base64: true,
          exif: false,
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        const formData = new FormData();
        // photo fieldよりも後にmeetupIdをappendするとダメなんだよな。。。何でだろ。。。
        formData.append('meetupId', props.route.params.meetupId);
        formData.append('userId', props.auth.data._id);
        formData.append('asset', {
          name: newPhoto.uri.split('/').pop(),
          uri: newPhoto.uri,
          type: 'image/jpg',
        });
        const result = await lampostAPI.post(`/assets/photos`, formData, {
          headers: { 'Content-type': 'multipart/form-data' },
        });
        console.log(result.data);
        console.log('Youu are now in the meetup');
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
          <Camera style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} ref={cameraRef}>
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
                  setCameraType(
                    cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
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
