import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { IconButton } from 'react-native-paper';
import ButtonToggleGroup from 'react-native-button-toggle-group';

// icon
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

// components
import FABMenu from './Utils/FABMenu';

export default function App(props) {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [cameraMode, setCameraMode] = useState('Photo');

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

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  // if (photo) {
  //   let sharePic = () => {
  //     shareAsync(photo.uri).then(() => {
  //       setPhoto(undefined);
  //     });
  //   };

  //   let savePhoto = () => {
  //     MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
  //       setPhoto(undefined);
  //     });
  //   };

  //   return (
  //     <SafeAreaView style={styles.container}>
  //       <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
  //       <Button title="Share" onPress={sharePic} />
  //       <Button title="Discard" onPress={() => setPhoto(undefined)} />
  //     </SafeAreaView>
  //   );
  // }

  // 基本的に、10秒以内の動画は保存しないようにする。そのためにサーバー動かすのめんどくさいから。
  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={() => console.log('took a shot')}>
      <Camera style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} ref={cameraRef}>
        <StatusBar hidden={true} style='auto' />
        <View style={{ position: 'absolute', bottom: 10, flexDirection: 'row' }}>
          <View style={{ width: 200 }}>
            <ButtonToggleGroup
              highlightBackgroundColor={'rgb(58, 126, 224)'}
              highlightTextColor={'white'}
              inactiveBackgroundColor={'transparent'}
              inactiveTextColor={'white'}
              values={['Photo', 'Video']}
              value={cameraMode}
              onSelect={(val) => setCameraMode(val)}
            />
          </View>
        </View>
        <FABMenu mode={cameraMode} />
        <IconButton
          icon='close'
          iconColor='white'
          containerColor='rgb(74, 74, 74)'
          style={{ position: 'absolute', top: 35, left: 10 }}
          onPress={() => props.navigation.navigate('Map')}
        />
      </Camera>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  buttonContainer: {
    alignSelf: 'flex-end',
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1,
  },
});
