import React, { useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import CameraContext from './CameraContext';
import { View, Text } from 'react-native';
import { Button, Dialog, Portal, Provider, withTheme } from 'react-native-paper';
import { baseTextColor, appBottomSheetBackgroundColor } from '../../utils/colorsTable';

const ConfirmLeaveLibrary = (props) => {
  const { auth } = useContext(GlobalContext);
  const { isWarningModalOpen, setIsWarningModalOpen, warningMessage } = useContext(CameraContext);

  return (
    <Portal>
      <Dialog visible={isWarningModalOpen} style={{ backgroundColor: appBottomSheetBackgroundColor, padding: 30 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: baseTextColor }}>{warningMessage}</Text>
        <Dialog.Actions>
          <Button textColor='rgb(58, 126, 224)' onPress={() => setIsWarningModalOpen(false)}>
            Got it.
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmLeaveLibrary;
