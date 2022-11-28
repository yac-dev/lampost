// main libraries
import React, { useContext } from 'react';
import MapContext from '../MeetupContext';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Button, Dialog, Portal, Provider, withTheme } from 'react-native-paper';
import { appBottomSheetBackgroundColor, baseTextColor } from '../../../utils/colorsTable';

// ac
import { setIsHostMeetupOpen } from '../../../redux/actionCreators/hostMeetup';

const CancelLaunchMeetupModal = (props) => {
  const {
    launchMeetupBottomSheetRef,
    isCancelLaunchMeetupConfirmationModalOpen,
    setIsCancelLaunchMeetupConfirmationModalOpen,
    setIsLaunchMeetupConfirmed,
    setLaunchLocation,
  } = useContext(MapContext);

  return (
    <Portal>
      <Dialog
        visible={isCancelLaunchMeetupConfirmationModalOpen}
        style={{ backgroundColor: appBottomSheetBackgroundColor, padding: 30 }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: baseTextColor }}>
          Are you sure you want to cancel launching?
        </Text>
        <Dialog.Actions>
          <Button
            textColor='rgb(58, 126, 224)'
            onPress={() => {
              setIsCancelLaunchMeetupConfirmationModalOpen(false);
            }}
          >
            No
          </Button>
          <Button
            textColor='rgb(58, 126, 224)'
            onPress={() => {
              setIsCancelLaunchMeetupConfirmationModalOpen(false);
              setIsLaunchMeetupConfirmed(false);
              setLaunchLocation(null);
              launchMeetupBottomSheetRef.current.close();
            }}
          >
            Yes
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const mapStateToProps = (state) => {
  return { hostMeetup: state.hostMeetup };
};

export default connect(mapStateToProps, { setIsHostMeetupOpen })(CancelLaunchMeetupModal);
