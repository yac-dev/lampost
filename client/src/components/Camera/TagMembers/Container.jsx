import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import {
  baseBackgroundColor,
  appBottomSheetBackgroundColor,
  screenSectionBackgroundColor,
} from '../../../utils/colorsTable';
import FastImage from 'react-native-fast-image';
import LoadingSpinner from '../../Utils/LoadingSpinner';
import lampostAPI from '../../../apis/lampost';

const Container = (props) => {
  const { auth, setLoading, setSnackBar } = useContext(GlobalContext);
  const [members, setMembers] = useState(props.route.params.members);
  const [taggedMembers, setTaggedMembers] = useState({});

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => sendPhotoDatas()}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Send</Text>
        </TouchableOpacity>
      ),
    });
  }, [taggedMembers]);

  const sendPhotoDatas = async () => {
    const taggedMembersJSON = JSON.stringify(Object.keys(taggedMembers));
    const placeJSON = JSON.stringify(props.route.params.ongoingMeetup.place);
    const formData = new FormData();
    // photo fieldよりも後にmeetupIdをappendするとダメなんだよな。。。何でだろ。。。
    // const taggedUserIds = Object.keys(taggedPeople);
    // // if (taggedUserIds.length) {
    // //   for (var i = 0; i < taggedUserIds.length; i++) {
    // //     formData.append(`taggedUser${i}`, taggedUserIds[i]);
    // //   }
    // // }
    formData.append('taggedPeople', taggedMembersJSON);
    formData.append('place', placeJSON);
    formData.append('meetupId', props.route.params.ongoingMeetup._id);
    formData.append('userId', auth.data._id);
    formData.append('type', props.route.params.cameraMode); // photo
    formData.append('mood', props.route.params.mood);
    formData.append('asset', {
      name: props.route.params.photo.uri.split('/').pop(),
      uri: props.route.params.photo.uri,
      type: 'image/jpg',
    });
    // userIdを使ってまず、userのmeetup中かを調べる。
    // console.log(formData);
    try {
      setLoading(true);
      const result = await lampostAPI.post(`/assets/photos`, formData, {
        headers: { 'Content-type': 'multipart/form-data' },
      });
      setLoading(false);
      props.navigation.goBack();
      setSnackBar({
        isVisible: true,
        message: 'Sent photo',
        barType: 'success',
        duration: 1500,
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
    }
  };

  const renderMembers = () => {
    const list = Object.values(members).map((userData, index) => {
      if (userData.user && userData.user._id !== auth.data._id) {
        return (
          <TouchableOpacity
            key={index}
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'space-between' }}
            onPress={() => {
              if (taggedMembers[userData.user._id]) {
                setTaggedMembers((previous) => {
                  const updating = { ...previous };
                  delete updating[userData.user._id];
                  return updating;
                });
              } else {
                setTaggedMembers((previous) => {
                  return {
                    ...previous,
                    [userData.user._id]: true,
                  };
                });
              }
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FastImage
                source={{ uri: userData.user.photo ? userData.user.photo : '' }}
                style={{ width: 40, height: 40, borderRadius: 12, marginRight: 15 }}
              />
              <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>{userData.user.name}</Text>
            </View>
            {taggedMembers[userData.user._id] ? <Text style={{ fontSize: 20 }}>{props.route.params.mood}</Text> : null}
          </TouchableOpacity>
        );
      } else {
        return null;
      }
    });
    return <ScrollView>{list}</ScrollView>;
  };

  return (
    <View style={{ backgroundColor: baseBackgroundColor, flex: 1, padding: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, alignSelf: 'center' }}>
        <Image
          source={{ uri: props.route.params.photo.uri }}
          style={{ width: 70, height: 70, marginRight: 10, borderRadius: 12 }}
        />
        <Text style={{ color: 'white', fontSize: 17 }}>Tag members?</Text>
      </View>
      {renderMembers()}
      <LoadingSpinner />
    </View>
  );
};

export default Container;
