import React, { useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import MapContext from './MeetupContext';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Dialog, Portal, Provider, withTheme } from 'react-native-paper';
import { baseTextColor, appBottomSheetBackgroundColor } from '../../utils/colorsTable';
import lampostAPI from '../../apis/lampost';

const ConfirmStartMeetup = (props) => {
  const { auth, setAuth, setMyUpcomingMeetups } = useContext(GlobalContext);
  const {
    isStartMeetupConfirmationModalOpen,
    setIsStartMeetupConfirmationModalOpen,

    startingMeetup,
  } = useContext(MapContext);

  return (
    <Portal>
      <Dialog
        visible={isStartMeetupConfirmationModalOpen}
        style={{ backgroundColor: appBottomSheetBackgroundColor, padding: 30 }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: baseTextColor }}>
          Do you want to start a meetup?{'\n'}From now, you and your members can use a camera until the end of meetup.
        </Text>
        <Dialog.Actions>
          <Button textColor='rgb(58, 126, 224)' onPress={() => setIsStartMeetupConfirmationModalOpen(false)}>
            Cancel
          </Button>
          {/* <TouchableOpacity>
            <Text style={{ color: 'red' }}>Cancel</Text>
          </TouchableOpacity> */}
          <Button
            textColor='rgb(58, 126, 224)'
            onPress={async () => {
              const result = await lampostAPI.patch(`/meetups/${startingMeetup}/start`);
              // const {} = result.data;
              // setAuth((previous) => {
              //   return {
              //     ...previous,
              //     data: {
              //       ...previous.data,
              //       ongoingMeetup: {
              //         meetup: startingMeetup,
              //         state: true,
              //       },
              //     },
              //   };
              // });
              setMyUpcomingMeetups((previous) => {
                return {
                  ...previous,
                  [startingMeetup]: {
                    ...previous[startingMeetup],
                    state: 'ongoing',
                  },
                };
              });
              setIsStartMeetupConfirmationModalOpen(false);
            }}
          >
            Yes 👍
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmStartMeetup;
