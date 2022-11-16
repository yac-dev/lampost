// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import lampostAPI from '../../apis/lampost';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { IconButton } from 'react-native-paper';
import ButtonToggleGroup from 'react-native-button-toggle-group';

import SnackBar from '../Utils/SnackBar';
import { addSnackBar } from '../../redux/actionCreators/snackBar';

// icon
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

// components
import FABMenu from './Utils/FABMenu';

const Container = (props) => {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [cameraMode, setCameraMode] = useState('photo');

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
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync();
    const result = await lampostAPI.post('/medias/photos', {});
    console.log(newPhoto);
  };

  const takeShot = () => {
    // modeによって、screen押した時の挙動を変えないといかん。
    if (cameraMode === 'photo') {
      takePhoto();
      props.addSnackBar('Nice shot! A photo has been sent!', 'success', 1500);
      // 写真をとったらそのままその写真をbackendに送る。
    } else if (cameraMode === 'video') {
      console.log('start recording video');
    }
  };

  // 基本的に、10秒以内の動画は保存しないようにする。そのためにサーバー動かすのめんどくさいから。

  const renderBottomMenu = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => setCameraMode('photo')}>
          <Text style={{ color: 'white' }}>Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCameraMode('video')}>
          <Text style={{ color: 'white' }}>Video</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={() => takeShot()}>
      <Camera style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} ref={cameraRef}>
        {/* <StatusBar hidden={true} style='auto' /> */}
        <View style={{ position: 'absolute', bottom: 30, flexDirection: 'row' }}>
          <View style={{ width: 200 }}>{renderBottomMenu()}</View>
        </View>
        <FABMenu cameraMode={cameraMode} />
        <IconButton
          icon='close'
          iconColor='white'
          containerColor='rgb(74, 74, 74)'
          style={{ position: 'absolute', top: 35, left: 10 }}
          onPress={() => props.navigation.navigate('Map')}
        />
      </Camera>
      <SnackBar />
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => {
  return { snackBar: state.snackBar };
};

export default connect(mapStateToProps, { addSnackBar })(Container);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'relative',
//   },
//   buttonContainer: {
//     alignSelf: 'flex-end',
//   },
//   preview: {
//     alignSelf: 'stretch',
//     flex: 1,
//   },
// });
