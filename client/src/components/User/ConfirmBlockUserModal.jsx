import React, { useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import UserContext from './UserContext';
import { View, Text } from 'react-native';
import lampostAPI from '../../apis/lampost';
import { Button, Dialog, Portal, Provider, withTheme } from 'react-native-paper';
import { baseTextColor, appBottomSheetBackgroundColor } from '../../utils/colorsTable';

const ConfirmBlockUserModal = (props) => {
  const { auth, setAuth, setLoading, setSnackBar } = useContext(GlobalContext);
  const { isConfirmBlockUserModalOpen, setIsConfirmBlockUserModalOpen, user, setIsBlocked } = useContext(UserContext);

  const onYesPress = async () => {
    setIsConfirmBlockUserModalOpen(false);
    const payload = {
      userId: auth.data._id,
      blockingUserId: user._id,
    };
    setLoading(true);
    const result = await lampostAPI.post('/userblockingrelationships/block', payload);
    setLoading(false);
    setSnackBar({
      isVisible: true,
      barType: 'success',
      message: 'Blocked user successfully.',
      duration: 5000,
    });
    setIsBlocked(true);
  };

  return (
    <Portal>
      <Dialog
        visible={isConfirmBlockUserModalOpen}
        style={{ backgroundColor: appBottomSheetBackgroundColor, padding: 30 }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: baseTextColor }}>
          Are you sure you want to block this accout? You will not be able to recieve any chat messages from this user
          or view any content.
        </Text>
        <Dialog.Actions>
          <Button textColor='rgb(58, 126, 224)' onPress={() => setIsConfirmBlockUserModalOpen(false)}>
            No
          </Button>
          <Button
            textColor='rgb(58, 126, 224)'
            onPress={() => {
              onYesPress();
            }}
          >
            Yes, block this user.
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmBlockUserModal;
