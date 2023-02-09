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
  const { isConfirmFlagUserModalOpen, setIsConfirmFlagUserModalOpen, navigation, user } = useContext(UserContext);

  const onYesPress = async () => {
    setIsConfirmFlagUserModalOpen(false);
    navigation.navigate('Flag user', { name: user.name, id: user._id });
  };

  // launcherをblockしたら、同時に参加中のそのmeetupからも自動で抜けるようにするか。。。でもめんどいな。。。betaだよ。今作っているのは。。。
  return (
    <Portal>
      <Dialog
        visible={isConfirmFlagUserModalOpen}
        style={{ backgroundColor: appBottomSheetBackgroundColor, padding: 30 }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: baseTextColor }}>
          Are you sure you want to block this user? You can no longer join the meetup which are created by this.
        </Text>
        <Dialog.Actions>
          <Button textColor='rgb(58, 126, 224)' onPress={() => setIsConfirmFlagUserModalOpen(false)}>
            No
          </Button>
          <Button textColor='rgb(58, 126, 224)' onPress={() => onYesPress()}>
            Yes, go to next.
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmLeaveLibrary;
