import React, { useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import UserContext from './UserContext';
import { View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import lampostAPI from '../../apis/lampost';
import { Button, Dialog, Portal, Provider, withTheme } from 'react-native-paper';
import { baseTextColor, appBottomSheetBackgroundColor } from '../../utils/colorsTable';

const ConfirmDeleteAccount = (props) => {
  const { auth, setAuth } = useContext(GlobalContext);
  const { isConfirmDeleteAccountModalOpen, setIsConfirmDeleteAccountModalOpen, navigation } = useContext(UserContext);

  return (
    <Portal>
      <Dialog
        visible={isConfirmDeleteAccountModalOpen}
        style={{ backgroundColor: appBottomSheetBackgroundColor, padding: 30 }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: baseTextColor }}>
          Are you sure you want to delete your account?
        </Text>
        <Dialog.Actions>
          <Button textColor='rgb(58, 126, 224)' onPress={() => setIsConfirmDeleteAccountModalOpen(false)}>
            No
          </Button>
          <Button
            textColor='rgb(58, 126, 224)'
            onPress={() => {
              console.log('ok lets delete.');
              setIsConfirmDeleteAccountModalOpen(false);
              navigation.navigate('Delete my account', { userId: auth.data._id });
            }}
          >
            Yes, go to next.
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmDeleteAccount;
