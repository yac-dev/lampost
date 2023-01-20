import React from 'react';
import GlobalContext from '../../GlobalContext';
import { View, Text } from 'react-native';
import { Button, Dialog, Portal, Provider, withTheme } from 'react-native-paper';
import { baseTextColor, appBottomSheetBackgroundColor } from '../../utils/colorsTable';
import { useContext } from 'react';

const NotAvailableModal = () => {
  const { isNotAvailableModalOpen, setIsNotAvailableModalOpen } = useContext(GlobalContext);

  return (
    <Portal>
      <Dialog visible={isNotAvailableModalOpen} style={{ backgroundColor: appBottomSheetBackgroundColor, padding: 30 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: baseTextColor }}>
          I'm sorry. This function is not available now.
        </Text>
        <Dialog.Actions>
          <Button
            textColor='rgb(58, 126, 224)'
            onPress={() => {
              // modalを閉じる。
              setIsNotAvailableModalOpen(false);
            }}
          >
            Got it
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default NotAvailableModal;
