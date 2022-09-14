import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { IconButton } from 'react-native-paper';

// icon
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import FABMenu from './Utils/FABMenu';

export default function App(props) {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [mode, setMode] = useState('photo');
  const [photo, setPhoto] = useState();

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

  return (
    // <View style={{ backgroundColor: 'red' }}>
    <View style={styles.container} onPress={() => console.log('Take the shot!!')}>
      <Camera ref={cameraRef}>
        <StatusBar hidden={true} style='auto' />
        <View style={styles.buttonContainer}>
          <Entypo icon='camera' onPress={() => setMode('photo')} />
          <Entypo icon='video-camera' onPress={() => setMode('video')} />
          <AntDesign
            icon='close'
            onPress={() => {
              props.navigation.navigate('Map');
            }}
          />
        </View>
      </Camera>
      <Text>{mode}</Text>
      <FABMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignSelf: 'flex-end',
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1,
  },
});
