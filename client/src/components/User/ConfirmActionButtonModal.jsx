import React, { useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import UserContext from './UserContext';
import { View, Text } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import { baseTextColor, appBottomSheetBackgroundColor } from '../../utils/colorsTable';

const ConfirmActionButtonModal = (props) => {
  const { auth } = useContext(GlobalContext);
  const {
    isMyPage,
    confirmActionButtonModal,
    setConfirmActionButtonModal,
    badgeDetailBottomSheetRef,
    addLinkOrBadgeTagsBottomSheetRef,
    setAddLinkOrBadgeTagsBottomSheetType,
  } = useContext(UserContext);

  const renderModalText = () => {
    if (confirmActionButtonModal.type === 'Add my links') {
      return (
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: baseTextColor }}>
          Add your personal links of this badge and explain more.
        </Text>
      );
    } else if (confirmActionButtonModal.type === 'Add badge tags') {
      return <Text style={{ fontWeight: 'bold', fontSize: 15, color: baseTextColor }}>Add tags of this badges.</Text>;
    } else {
      return null;
    }
  };

  return (
    <Portal>
      <Dialog
        visible={confirmActionButtonModal.isOpen}
        style={{ backgroundColor: appBottomSheetBackgroundColor, padding: 30 }}
      >
        {renderModalText()}
        <Dialog.Actions>
          <Button
            textColor='rgb(58, 126, 224)'
            onPress={() => {
              setConfirmActionButtonModal({ isOpen: false, type: '' });
            }}
          >
            Cancel
          </Button>
          <Button
            textColor='rgb(58, 126, 224)'
            onPress={() => {
              setAddLinkOrBadgeTagsBottomSheetType(confirmActionButtonModal.type);
              setConfirmActionButtonModal({ isOpen: false, type: '' });
              badgeDetailBottomSheetRef.current.close();
              addLinkOrBadgeTagsBottomSheetRef.current.snapToIndex(0);
            }}
          >
            Next
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmActionButtonModal;
