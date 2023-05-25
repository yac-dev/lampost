import React, { useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import CameraContext from './CameraContext';
import { View, Text, TouchableOpacity } from 'react-native';

const Shutter = () => {
  const { auth, setLoading } = useContext(GlobalContext);
  const {
    cameraMode,
    ongoingMeetup,
    isRecording,
    setIsRecording,
    cameraRef,
    navigation,
    meetupAttendees,
    mood,
    duration,
    setDuration,
    durationRef,
  } = useContext(CameraContext);

  const startRecording = async () => {
    setIsRecording(true);
    const options = {
      quality: '720p',
      maxDuration: 180,
      mute: false,
    };

    const recordedVideo = await cameraRef.current.recordAsync(options);
    setDuration(0);
    setIsRecording(false);
    navigation.navigate('Tag members', {
      video: recordedVideo,
      members: meetupAttendees,
      mood,
      cameraMode,
      ongoingMeetup,
      duration: durationRef.current,
    });

    // .then(async (recordedVideo) => {
    // setVideo(recordedVideo);
    // console.log(recordedVideo);
    // setIsRecording(false);
    // const formData = new FormData();
    // formData.append('meetupId', ongoingMeetup._id);
    // formData.append('userId', auth.data._id);
    // formData.append('type', cameraMode); // photo
    // formData.append('effect', videoEffect);
    // formData.append('place', ongoingMeetup.place);
    // formData.append('mood', mood);
    // formData.append('duration', durationRef.current);
    // formData.append('asset', {
    //   name: recordedVideo.uri.split('/').pop(),
    //   uri: recordedVideo.uri,
    //   type: 'video/mov',
    // });
    // console.log(formData);
    // // ここでapi requestを送る感じか。
    // const result = await lampostAPI.post(`/assets/videos`, formData, {
    //   headers: { 'Content-type': 'multipart/form-data' },
    // });
    // setDuration(0);
    // setSnackBar({
    //   isVisible: true,
    //   message: 'Nice shot 📸',
    //   barType: 'success',
    //   duration: 1500,
    // });
    // });
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
    setLoading(false);
    navigation.navigate('Tag members', {
      photo: newPhoto,
      members: meetupAttendees,
      mood,
      cameraMode,
      ongoingMeetup,
    });
    // const formData = new FormData();
    // // photo fieldよりも後にmeetupIdをappendするとダメなんだよな。。。何でだろ。。。
    // const taggedUserIds = Object.keys(taggedPeople);
    // if (taggedUserIds.length) {
    //   for (var i = 0; i < taggedUserIds.length; i++) {
    //     formData.append(`taggedUser${i}`, taggedUserIds[i]);
    //   }
    // }
    // formData.append('meetupId', ongoingMeetup._id);
    // formData.append('userId', auth.data._id);
    // formData.append('type', cameraMode); // photo
    // formData.append('place', ongoingMeetup.place);
    // formData.append('mood', mood);
    // formData.append('effect', photoEffect);
    // formData.append('asset', {
    //   name: newPhoto.uri.split('/').pop(),
    //   uri: newPhoto.uri,
    //   type: 'image/jpg',
    // });
    // // userIdを使ってまず、userのmeetup中かを調べる。
    // // console.log(formData);
    // try {
    //   const result = await lampostAPI.post(`/assets/photos`, formData, {
    //     headers: { 'Content-type': 'multipart/form-data' },
    //   });
    //   setLoading(false);
    //   setSnackBar({
    //     isVisible: true,
    //     message: 'Nice shot 📸',
    //     barType: 'success',
    //     duration: 1500,
    //   });
    // } catch (error) {
    //   console.log(error);
    //   console.log(error.response.data);
    // }
  };

  if (cameraMode === 'photo') {
    return (
      <View
        style={{ position: 'absolute', bottom: 120, alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            borderRadius: 38,
            width: 76,
            height: 76,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => takePhoto()}
          disabled={ongoingMeetup ? false : true}
        ></TouchableOpacity>
      </View>
    );
  } else if (cameraMode === 'video') {
    return (
      <TouchableOpacity
        style={{ position: 'absolute', bottom: 120, alignSelf: 'center' }}
        onPress={() => {
          if (isRecording) {
            stopRecording();
          } else {
            startRecording();
          }
        }}
        disabled={ongoingMeetup ? false : true}
      >
        {isRecording ? (
          <View
            style={{
              backgroundColor: 'white',
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              width: 76,
              height: 76,
              borderRadius: 38,
            }}
          >
            <Text style={{ color: 'black', fontSize: 18 }}>Stop</Text>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: 'white',
              padding: 10,
              width: 76,
              height: 76,
              borderRadius: 38,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'black', fontSize: 18 }}>Start</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
};

export default Shutter;
