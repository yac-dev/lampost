import React, { useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import MyMeetupsContext from './MyMeetupsContext';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Dialog, Portal, Provider, withTheme } from 'react-native-paper';
import { baseTextColor, appBottomSheetBackgroundColor } from '../../../utils/colorsTable';
import lampostAPI from '../../../apis/lampost';

const ConfirmRSVP = (props) => {
  const { auth, setAuth, setMyUpcomingMeetups, setLoading, setSnackBar } = useContext(GlobalContext);
  const { isRSVPConfirmationModalOpen, setIsRSVPConfirmationModalOpen, RSVPingMeetup, setRSVPingMeetup } =
    useContext(MyMeetupsContext);

  const sendRSVP = async () => {
    setLoading(true);
    const result = await lampostAPI.patch(
      `/meetupanduserrelationships/meetup/${RSVPingMeetup._id}/user/${auth.data._id}/rsvp`,
      {
        meetup: RSVPingMeetup,
        user: {
          _id: auth.data._id,
          name: auth.data.name,
        },
        rsvp: true,
        launcherId: RSVPingMeetup.launcherId,
      }
    );
    const { rsvp } = result.data;
    setLoading(false);
    setMyUpcomingMeetups((previous) => {
      return {
        ...previous,
        [RSVPingMeetup._id]: {
          ...previous[RSVPingMeetup._id],
          isRSVPed: true,
        },
      };
    });
    setIsRSVPConfirmationModalOpen(false);
    setSnackBar({
      isVisible: true,
      barType: 'success',
      message: 'RSVPed successfully👍',
      duration: 5000,
    });
  };

  return (
    <Portal>
      <Dialog
        visible={isRSVPConfirmationModalOpen}
        style={{ backgroundColor: appBottomSheetBackgroundColor, padding: 30 }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: baseTextColor }}>
          Are you sure you are ready to join {RSVPingMeetup ? RSVPingMeetup.title : null}?{'\n'}RSVP cannot be cancelled
          later.
        </Text>
        <Dialog.Actions>
          <Button
            textColor='rgb(58, 126, 224)'
            onPress={() => {
              setIsRSVPConfirmationModalOpen(false);
              setRSVPingMeetup(null);
            }}
          >
            No. I'm not ready.
          </Button>
          <Button textColor='rgb(58, 126, 224)' onPress={() => sendRSVP()}>
            Yes. I'm ready 😃
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmRSVP;
