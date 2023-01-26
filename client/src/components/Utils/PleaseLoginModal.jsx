import React from 'react';
import GlobalContext from '../../GlobalContext';
import { View, Text } from 'react-native';
import { Button, Dialog, Portal, Provider, withTheme } from 'react-native-paper';
import { baseTextColor, appBottomSheetBackgroundColor } from '../../utils/colorsTable';
import { useContext } from 'react';

const PleaseLoginModal = () => {
  const { isPleaseLoginModalOpen, setIsPleaseLoginModalOpen } = useContext(GlobalContext);

  return (
    <Portal>
      <Dialog visible={isPleaseLoginModalOpen} style={{ backgroundColor: appBottomSheetBackgroundColor, padding: 30 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: baseTextColor }}>
          Please login or signup at first from top right corner.
        </Text>
        <Dialog.Actions>
          <Button
            textColor='rgb(58, 126, 224)'
            onPress={() => {
              // modalを閉じる。
              setIsPleaseLoginModalOpen(false);
            }}
          >
            Got it
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default PleaseLoginModal;
