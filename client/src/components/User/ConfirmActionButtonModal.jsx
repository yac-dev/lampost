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
    if (confirmActionButtonModal.type === 'Add my link') {
      return (
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: baseTextColor }}>
          Add your personal links and explain more about this badge.{'\n'} e.g.) https://youtube.com/@johndoe
        </Text>
      );
    } else if (confirmActionButtonModal.type === 'Add badge tags') {
      return (
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: baseTextColor }}>
          Add any tags such as position, role, how much experienced and explain more about this badge.
          {'\n'} e.g.) junior, senior, addicted, enthusiast etc.
        </Text>
      );
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
              badgeDetailBottomSheetRef.current.snapToIndex(0);
              setConfirmActionButtonModal({ isOpen: false, type: '' });
            }}
          >
            Cancel
          </Button>
          <Button
            textColor='rgb(58, 126, 224)'
            onPress={() => {
              badgeDetailBottomSheetRef.current.snapToIndex(0);
              setAddLinkOrBadgeTagsBottomSheetType(confirmActionButtonModal.type);
              setConfirmActionButtonModal({ isOpen: false, type: '' });
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
