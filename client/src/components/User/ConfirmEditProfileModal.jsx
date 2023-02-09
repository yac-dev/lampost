import React, { useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import UserContext from './UserContext';
import { View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import lampostAPI from '../../apis/lampost';
import { Button, Dialog, Portal, Provider, withTheme } from 'react-native-paper';
import { baseTextColor, appBottomSheetBackgroundColor } from '../../utils/colorsTable';

const ConfirmLeaveLibrary = (props) => {
  const { auth, setAuth } = useContext(GlobalContext);
  const { isConfirmEditProfileModalOpen, setIsConfirmEditProfileModalOpen, setSelectedProfileImage, setUser, user } =
    useContext(UserContext);

  const onYesPress = async () => {
    setIsConfirmEditProfileModalOpen(false);
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
      const result = await lampostAPI.patch(`/users/${auth.data._id}/profile`, formData, {
        headers: { 'Content-type': 'multipart/form-data' },
      });
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
      setUser((previous) => {
        return {
          ...previous,
          photo: photo,
        };
      });
    }
  };

  // console.log('user data', user);

  return (
    <Portal>
      <Dialog
        visible={isConfirmEditProfileModalOpen}
        style={{ backgroundColor: appBottomSheetBackgroundColor, padding: 30 }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: baseTextColor }}>
          Are you gonna change your profile picture?
        </Text>
        <Dialog.Actions>
          <Button textColor='rgb(58, 126, 224)' onPress={() => setIsConfirmEditProfileModalOpen(false)}>
            No
          </Button>
          <Button textColor='rgb(58, 126, 224)' onPress={() => onYesPress()}>
            Yes
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmLeaveLibrary;
