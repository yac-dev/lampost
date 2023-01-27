import React, { useContext } from 'react';
import LibrariesContext from './LibrariesContext';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import { appBottomSheetBackgroundColor, baseTextColor } from '../../utils/colorsTable';

const ConfirmCancelCreatingLibraryModal = (props) => {
  const {
    isConfirmCancelCreatingLibraryModalOpen,
    setIsConfirmCancelCreatingLibraryModalOpen,
    createLibraryBottomSheetRef,
  } = useContext(LibrariesContext);

  return (
    <Portal>
      <Dialog
        visible={isConfirmCancelCreatingLibraryModalOpen}
        style={{ backgroundColor: appBottomSheetBackgroundColor, padding: 30 }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: baseTextColor }}>
          Are you sure you want to cancel creating library?
        </Text>
        <Dialog.Actions>
          <Button
            textColor='rgb(58, 126, 224)'
            onPress={() => {
              null;
            }}
          >
            No
          </Button>
          <Button
            textColor='rgb(58, 126, 224)'
            onPress={() => {
              setIsConfirmCancelCreatingLibraryModalOpen(false);
              createLibraryBottomSheetRef.current.close();
              // ここで、全部からにしたいが、まあいいや、stateLibrariesのcontainerにないから。
            }}
          >
            Yes
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmCancelCreatingLibraryModal;
