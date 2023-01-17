import React, { useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import LibraryContext from './LibraryContext';
import lampostAPI from '../../../apis/lampost';
import { View, Text } from 'react-native';
import { Button, Dialog, Portal, Provider, withTheme } from 'react-native-paper';
import { baseTextColor, appBottomSheetBackgroundColor } from '../../../utils/colorsTable';

const ConfirmLeaveLibrary = (props) => {
  const { auth } = useContext(GlobalContext);
  const { isLeaveLibraryConfirmationModalOpen, setIsLeaveLibraryConfirmationModalOpen, navigation, library } =
    useContext(LibraryContext);

  const leaveLibrary = async () => {
    // setIsLeaveLibraryConfirmationModalOpen(false);
    const result = await lampostAPI.delete(`/libraryanduserrelationships/${auth.data._id}/${library._id}`);
    navigation.navigate('Libraries', { leftLibraryId: library._id, time: Date.now() });
  };

  return (
    <Portal>
      <Dialog
        visible={isLeaveLibraryConfirmationModalOpen}
        style={{ backgroundColor: appBottomSheetBackgroundColor, padding: 30 }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: baseTextColor }}>
          Are you sure you want to leave this library? You can't post your photos or videos any more.
        </Text>
        <Dialog.Actions>
          <Button
            textColor='rgb(58, 126, 224)'
            onPress={() => {
              setIsLeaveLibraryConfirmationModalOpen(false);
              // appMenuBottomSheetRef.current.snapToIndex(0);
            }}
          >
            Cancel
          </Button>
          <Button textColor='rgb(58, 126, 224)' onPress={() => leaveLibrary()}>
            Yes, I leave this library.
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmLeaveLibrary;
