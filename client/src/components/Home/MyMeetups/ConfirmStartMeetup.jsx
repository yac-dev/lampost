import React, { useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import MyMeetupsContext from './MyMeetupsContext';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Dialog, Portal, Provider, withTheme } from 'react-native-paper';
import { baseTextColor, appBottomSheetBackgroundColor } from '../../../utils/colorsTable';
import lampostAPI from '../../../apis/lampost';

const ConfirmStartMeetup = (props) => {
  const { auth, setAuth, setMyUpcomingMeetups } = useContext(GlobalContext);
  const { isStartMeetupConfirmationModalOpen, setIsStartMeetupConfirmationModalOpen, startingMeetup } =
    useContext(MyMeetupsContext);

  return (
    <Portal>
      <Dialog
        visible={isStartMeetupConfirmationModalOpen}
        style={{ backgroundColor: appBottomSheetBackgroundColor, padding: 30 }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: baseTextColor }}>
          Are you ready to start this meetup?{'\n'}The camera will be available just now untill the end of meetup.
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
              setMyUpcomingMeetups((previous) => {
                return {
                  ...previous,
                  [startingMeetup]: {
                    ...previous[startingMeetup],
                    state: 'ongoing',
                  },
                };
              });
              const result2 = await lampostAPI.post(`/meetupanduserrelationships/meetup/startnotification`, {
                meetupId: startingMeetup,
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
