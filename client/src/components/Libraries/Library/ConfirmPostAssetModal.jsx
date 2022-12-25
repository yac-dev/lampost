import React, { useContext } from 'react';
import LibraryContext from './LibraryContext';
import { View, Text } from 'react-native';
import { Button, Dialog, Portal, Provider, withTheme } from 'react-native-paper';
import { appBottomSheetBackgroundColor, baseTextColor } from '../../../utils/colorsTable';
//

const ConfirmPostAssetModal = () => {
  const { isConfirmPostAssetsModalOpen, setIsConfirmPostAssetsModalOpen, navigation, library } =
    useContext(LibraryContext);

  return (
    <Portal>
      <Dialog
        visible={isConfirmPostAssetsModalOpen}
        style={{ backgroundColor: appBottomSheetBackgroundColor, padding: 30 }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: baseTextColor }}>
          Please select your assets you wanna post.
        </Text>
        <Dialog.Actions>
          <Button
            textColor='rgb(58, 126, 224)'
            onPress={() => {
              setIsConfirmPostAssetsModalOpen(false);
              // appMenuBottomSheetRef.current.snapToIndex(0);
            }}
          >
            Cancel posting
          </Button>
          <Button
            textColor='rgb(58, 126, 224)'
            onPress={() => {
              navigation.navigate('Add assets', { libraryId: library._id, fromComponent: 'ADD_ASSETS_FOR_POSTING' });
              setIsConfirmPostAssetsModalOpen(false);
            }}
          >
            Next
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmPostAssetModal;
