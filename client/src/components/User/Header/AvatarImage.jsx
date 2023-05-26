import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import UserContext from '../UserContext';
import GlobalContext from '../../../GlobalContext';
import {
  backgroundColorsTable,
  iconColorsTable,
  baseTextColor,
  screenSectionBackgroundColor,
} from '../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';
import * as ImagePicker from 'expo-image-picker';
import lampostAPI from '../../../apis/lampost';

const AvatarImage = () => {
  const { auth, isIpad, setAuth, setLoading, setSnackBar } = useContext(GlobalContext);
  const { user, isMyPage, setIsConfirmEditProfileModalOpen, flagUserMenuBottomSheetRef } = useContext(UserContext);
  const oneContainerWidth = (Dimensions.get('window').width * 2) / 5;
  const avatarWidth = oneContainerWidth * 0.5;

  const editProfile = async () => {
    // setIsConfirmEditProfileModalOpen(false);
    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0,
    });

    if (!pickedImage.cancelled && pickedImage.uri) {
      const formData = new FormData();
      // photo fieldよりも後にmeetupIdをappendするとダメなんだよな。。。何でだろ。。。
      formData.append('userId', auth.data._id);

      formData.append('avatar', {
        name: `user-${auth.data._id}`,
        uri: pickedImage.uri,
        type: 'image/jpg',
      });
      setLoading(true);
      const result = await lampostAPI.patch(`/users/${auth.data._id}/profile`, formData, {
        headers: { 'Content-type': 'multipart/form-data' },
      });
      setLoading(false);
      // console.log(res);
      // setSelectedProfileImage(result.uri);
      const { photo } = result.data;
      console.log('this is my photo', photo);
      setAuth((previous) => {
        return {
          ...previous,
          data: {
            ...previous.data,
            photo: photo,
          },
        };
      });
      setSnackBar({
        isVisible: true,
        barType: 'success',
        message: 'Profile picture has been updated.',
        duration: 3000,
      });
      // setUser((previous) => {
      //   return {
      //     ...previous,
      //     photo: photo,
      //   };
      // });
    }
  };

  return (
    <View
      style={{
        width: 65,
        aspectRatio: 1,
        // backgroundColor: 'green', //確認用で使える
      }}
    >
      <View
        style={{
          backgroundColor: iconColorsTable['blue1'],
          borderRadius: isIpad ? 22 : 12,
          width: '100%',
          aspectRatio: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 5,
        }}
      >
        {isMyPage ? (
          <FastImage
            style={{
              width: '100%',
              height: '100%',
              borderRadius: isIpad ? 22 : 12,
            }}
            source={{
              uri: auth.data.photo
                ? auth.data.photo
                : 'https://lampost-dev.s3.us-east-2.amazonaws.com/avatars/default.png',
              // priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
            tintColor={user.photo ? null : 'white'}
          />
        ) : (
          <FastImage
            style={{
              width: '100%',
              height: '100%',
              borderRadius: isIpad ? 22 : 12,
            }}
            source={{
              uri: user.photo ? user.photo : 'https://lampost-dev.s3.us-east-2.amazonaws.com/avatars/default.png',
              // priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
            tintColor={user.photo ? null : 'white'}
          />
        )}
        {isMyPage ? (
          <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0 }} onPress={() => editProfile()}>
            <MaterialCommunityIcons name='camera-plus' size={20} color={baseTextColor} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default AvatarImage;
