import React, { useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import UserContext from './UserContext';
import { View, Text } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import { baseTextColor, appBottomSheetBackgroundColor } from '../../utils/colorsTable';
import lampostAPI from '../../apis/lampost';

const ConfirmActionButtonModal = (props) => {
  const { auth } = useContext(GlobalContext);
  const {
    isMyPage,
    pressedBadgeData,
    confirmActionButtonModal,
    setConfirmActionButtonModal,
    badgeDetailBottomSheetRef,
    addBadgeTagsBottomSheetRef,
    addLinkBottomSheetRef,
    setFetchedBadgeTags,
    isOpenCreateBadgeTagTextInput,
    setIsOpenCreateBadgeTagTextInput,
  } = useContext(UserContext);

  const renderModalText = () => {
    if (confirmActionButtonModal.type === 'Add my link') {
      return (
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: baseTextColor }}>
          Add your personal link and explain more about your {pressedBadgeData.badge.name} badge.{'\n'}
          {'\n'} e.g. https://youtube.com/@mychannel
        </Text>
      );
    } else if (confirmActionButtonModal.type === 'Add badge tags') {
      return (
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: baseTextColor }}>
          Add any tags such as your position, role,level, how much you experienced etc and explain more about your{' '}
          {pressedBadgeData.badge.name} badge.
          {'\n'}
          {'\n'} e.g. senior, addicted, enthusiast, inspired etc.
        </Text>
      );
    } else {
      return null;
    }
  };

  const onNextPress = async () => {
    if (confirmActionButtonModal.type === 'Add badge tags') {
      badgeDetailBottomSheetRef.current.snapToIndex(0);
      setConfirmActionButtonModal({ isOpen: false, type: '' });
      const result = await lampostAPI.get(`/badgetags/${pressedBadgeData.badge._id}`);
      const { badgeTags } = result.data;
      setFetchedBadgeTags(badgeTags);
      if (!badgeTags.length) {
        setIsOpenCreateBadgeTagTextInput(true);
      }
      addBadgeTagsBottomSheetRef.current.snapToIndex(0);
    } else if (confirmActionButtonModal.type === 'Add my link') {
      badgeDetailBottomSheetRef.current.snapToIndex(0);
      setConfirmActionButtonModal({ isOpen: false, type: '' });
      addLinkBottomSheetRef.current.snapToIndex(0);
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
          <Button textColor='rgb(58, 126, 224)' onPress={() => onNextPress()}>
            Next
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmActionButtonModal;
