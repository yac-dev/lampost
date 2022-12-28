import React, { useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import UserContext from './UserContext';
import { View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import lampostAPI from '../../apis/lampost';
import { Button, Dialog, Portal, Provider, withTheme } from 'react-native-paper';
import { baseTextColor, appBottomSheetBackgroundColor } from '../../utils/colorsTable';

const ConfirmLeaveLibrary = (props) => {
  const { auth } = useContext(GlobalContext);
  const { isConfirmEditProfileModalOpen, setIsConfirmEditProfileModalOpen, setSelectedProfileImage } =
    useContext(UserContext);

  const onYesPress = async () => {
    setIsConfirmEditProfileModalOpen(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      const formData = new FormData();
      // photo fieldよりも後にmeetupIdをappendするとダメなんだよな。。。何でだろ。。。
      // formData.append('userId', auth.data._id);
      formData.append('asset', {
        name: `user-${auth.data._id}`,
        uri: result.uri,
        type: 'image/jpg',
      });
      const result = await lampostAPI.patch(`/users/${auth.data._id}/profile`, formData, {
        headers: { 'Content-type': 'multipart/form-data' },
      });
      // setSelectedProfileImage(result.uri);
    }
  };

  return (
    <Portal>
      <Dialog
        visible={isConfirmEditProfileModalOpen}
        style={{ backgroundColor: appBottomSheetBackgroundColor, padding: 30 }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: baseTextColor }}>Wanna change your profile photo?</Text>
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
