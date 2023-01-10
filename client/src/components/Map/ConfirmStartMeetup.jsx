import React, { useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import MapContext from './MeetupContext';
import { View, Text } from 'react-native';
import { Button, Dialog, Portal, Provider, withTheme } from 'react-native-paper';
import { baseTextColor, appBottomSheetBackgroundColor } from '../../utils/colorsTable';

const ConfirmStartMeetup = (props) => {
  const { auth } = useContext(GlobalContext);
  const { isStartMeetupConfirmationModalOpen } = useContext(MapContext);

  return (
    <Portal>
      <Dialog
        visible={isStartMeetupConfirmationModalOpen}
        style={{ backgroundColor: appBottomSheetBackgroundColor, padding: 30 }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: baseTextColor }}>
          Do you want to start your meetup now?
        </Text>
        <Dialog.Actions>
          <Button textColor='rgb(58, 126, 224)' onPress={() => setIsWarningModalOpen(false)}>
            No
          </Button>
          <Button textColor='rgb(58, 126, 224)' onPress={() => setIsWarningModalOpen(false)}>
            Yes
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmStartMeetup;
