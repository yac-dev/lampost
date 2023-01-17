import React, { useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import MapContext from './MeetupContext';
import { View, Text } from 'react-native';
import { Button, Dialog, Portal, Provider, withTheme } from 'react-native-paper';
import { baseTextColor, appBottomSheetBackgroundColor } from '../../utils/colorsTable';
import lampostAPI from '../../apis/lampost';

const ConfirmFinishMeetup = (props) => {
  const { auth } = useContext(GlobalContext);
  const { isFinishMeetupConfirmationModalOpen, setIsFinishMeetupConfirmationModalOpen, finishingMeetup } =
    useContext(MapContext);

  return (
    <Portal>
      <Dialog
        visible={isFinishMeetupConfirmationModalOpen}
        style={{ backgroundColor: appBottomSheetBackgroundColor, padding: 30 }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: baseTextColor }}>
          Are you sure you want to finish? You and attendees can't user a camera any more for this meetup.
        </Text>
        <Dialog.Actions>
          <Button textColor='rgb(58, 126, 224)' onPress={() => setIsFinishMeetupConfirmationModalOpen(false)}>
            No
          </Button>
          <Button
            textColor='rgb(58, 126, 224)'
            onPress={async () => {
              const result = await lampostAPI.patch(`/meetups/${finishingMeetup}/finish`);
              // upcomingから取り除いて、自分のisInMeetupを''に直して。pastmeetupに加える。
              setAuth((previous) => {
                return {
                  ...previous,
                  data: {
                    ...previous.data,
                    isInMeetup: '',
                  },
                };
              });
              setMyUpcomingMeetupAndChatsTable((previous) => {
                const updating = { ...previous };
                delete updating[finishingMeetup];
                return updating;
              });
              setIsFinishMeetupConfirmationModalOpen(false);
              // ここで、meetupを地図から消さないといかん。
            }}
          >
            Yes
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmFinishMeetup;
