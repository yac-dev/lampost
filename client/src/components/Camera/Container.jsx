import React, { useEffect, useRef, useState, useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import CameraContext from './CameraContext';
import { Text, View, TouchableOpacity } from 'react-native';
import lampostAPI from '../../apis/lampost';
import { Camera } from 'expo-camera';
import AppMenuBottomSheet from './AppMenuBotttomSheet/Container';
import { appBottomSheetBackgroundColor } from '../../utils/colorsTable';
import { Ionicons } from '@expo/vector-icons';
import WarningModal from './WarningModal';

const Container = (props) => {
  const { auth } = useContext(GlobalContext);
  const appMenuBottomSheetRef = useRef(null);
  const cameraRef = useRef();
  const [cameraMode, setCameraMode] = useState('photo');
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [hasCameraPermission, setHasCameraPermission] = useState();

  // ここで、camera permissionをokにすると。
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>;
  }

  let takePhoto = async () => {
    if (!auth.data) {
      setIsWarningModalOpen(true);
      setWarningMessage('Please signup or login at first.');
    } else {
      if (auth.data.state === 'ongoing') {
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
      } else {
        setIsWarningModalOpen(true);
        setWarningMessage('Camera is only available when you are in the meetup.');
      }
    }
  };

  const takeShot = () => {
    // modeによって、screen押した時の挙動を変えないといかん。
    if (cameraMode === 'photo') {
      takePhoto();
      // 写真をとったらそのままその写真をbackendに送る。
    } else if (cameraMode === 'video') {
      console.log('start recording video');
    }
  };

  // 基本的に、10秒以内の動画は保存しないようにする。そのためにサーバー動かすのめんどくさいから。

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
            <View style={{ flexDirection: 'column', position: 'absolute', top: 80, right: 10 }}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderRadius: 10,
                  marginBottom: 10,
                  backgroundColor: appBottomSheetBackgroundColor,
                }}
              >
                <Ionicons name='ios-camera-reverse' size={35} color='white' />
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={{
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: appBottomSheetBackgroundColor,
                }}
              >
                <Ionicons name='ios-camera-reverse' size={35} color='white' />
              </TouchableOpacity> */}
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
