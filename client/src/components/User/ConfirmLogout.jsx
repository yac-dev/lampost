import React, { useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import UserContext from './UserContext';
import { View, Text } from 'react-native';
import lampostAPI from '../../apis/lampost';
import * as SecureStore from 'expo-secure-store';
import { Button, Dialog, Portal, Provider, withTheme } from 'react-native-paper';
import { baseTextColor, appBottomSheetBackgroundColor } from '../../utils/colorsTable';

const ConfirmLogout = (props) => {
  const { auth, setAuth, setMyUpcomingMeetupAndChatsTable, setTotalUnreadChatsCount } = useContext(GlobalContext);
  const { isConfirmLogoutModalOpen, setIsConfirmLogoutModalOpen, navigation } = useContext(UserContext);

  const logout = async () => {
    await SecureStore.deleteItemAsync('secure_token');
    setAuth({
      data: null,
      socket: null,
      currentLocation: null,
    });
    setMyUpcomingMeetupAndChatsTable({});
    setTotalUnreadChatsCount(0);
    auth.socket.disconnect();
    navigation.navigate('LogInOrSignUp', { userHasGone: true });
    // navigation.goBack();
  };

  return (
    <Portal>
      <Dialog
        visible={isConfirmLogoutModalOpen}
        style={{ backgroundColor: appBottomSheetBackgroundColor, padding: 30 }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: baseTextColor }}>Are you sure you want to logout?</Text>
        <Dialog.Actions>
          <Button textColor='rgb(58, 126, 224)' onPress={() => setIsConfirmLogoutModalOpen(false)}>
            No
          </Button>
          <Button textColor='rgb(58, 126, 224)' onPress={() => logout()}>
            Yes
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmLogout;
