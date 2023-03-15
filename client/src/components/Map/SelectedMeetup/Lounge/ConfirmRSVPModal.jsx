import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import GlobalContext from '../../../../GlobalContext';
import LoungeContext from './LoungeContext';
import lampostAPI from '../../../../apis/lampost';
import { Button, Dialog, Portal, Provider, withTheme } from 'react-native-paper';
import { baseTextColor, appBottomSheetBackgroundColor } from '../../../../utils/colorsTable';

const ConfirmRSVPModal = (props) => {
  const { auth, setLoading, setSnackBar } = useContext(GlobalContext);
  const { isConfirmRSVPModalOpen, setIsConfirmRSVPModalOpen, isRSVPed, setIsRSVPed, meetupId } =
    useContext(LoungeContext);

  const sendRSVP = async () => {
    setLoading(true);
    const result = await lampostAPI.patch(`/meetupanduserrelationships/meetup/${meetupId}/user/${auth.data._id}/rsvp`, {
      rsvp: true,
    });
    const { rsvp } = result.data;
    setIsRSVPed(true);
    setLoading(false);
    setSnackBar({
      isVisible: true,
      barType: 'success',
      message: 'RSVPed successfully👍',
      duration: 5000,
    });
  };

  return (
    <Portal>
      <Dialog visible={isConfirmRSVPModalOpen} style={{ backgroundColor: appBottomSheetBackgroundColor, padding: 30 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: baseTextColor }}>Are you ready for this meetup?</Text>
        <Dialog.Actions>
          <Button
            textColor='rgb(58, 126, 224)'
            onPress={() => {
              setIsConfirmRSVPModalOpen(false);
            }}
          >
            No
          </Button>
          <Button
            textColor='rgb(58, 126, 224)'
            onPress={() => {
              sendRSVP();
              setIsConfirmRSVPModalOpen(false);
            }}
          >
            Sure 👍
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmRSVPModal;
