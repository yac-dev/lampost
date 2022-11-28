// main libraries
import React, { useContext } from 'react';
import MapContext from '../MeetupContext';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Button, Dialog, Portal, Provider, withTheme } from 'react-native-paper';
import { baseTextColor, appBottomSheetBackgroundColor } from '../../../utils/colorsTable';

const ConfirmLaunchMeetupModal = (props) => {
  const {
    isLaunchMeetupConfirmed,
    setIsLaunchMeetupConfirmed,
    appMenuBottomSheetRef,
    isLaunchMeetupConfirmationModalOpen,
    setIsLaunchMeetupConfirmationModalOpen,
  } = useContext(MapContext);

  // return (
  //   <View>
  //     <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Please tap the place where you wanna host the meetup 🚀</Text>
  //   </View>
  // );
  if (!props.auth.isAuthenticated) {
    return (
      <Portal>
        <Dialog visible={props.modalOpen} style={{ backgroundColor: 'white' }}>
          <Dialog.Content>
            <Text>Please login or signup from top left corner before using.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button textColor='rgb(58, 126, 224)' onPress={() => props.onPressCancel()}>
              Got it
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  } else {
    return (
      <Portal>
        <Dialog
          visible={isLaunchMeetupConfirmationModalOpen}
          style={{ backgroundColor: appBottomSheetBackgroundColor, padding: 30 }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 15, color: baseTextColor }}>
            Please tap the place where you wanna host the meetup 🚀
          </Text>
          <Dialog.Actions>
            <Button
              textColor='rgb(58, 126, 224)'
              onPress={() => {
                setIsLaunchMeetupConfirmationModalOpen(false);
                appMenuBottomSheetRef.current.snapToIndex(0);
              }}
            >
              Cancel
            </Button>
            <Button
              textColor='rgb(58, 126, 224)'
              onPress={() => {
                setIsLaunchMeetupConfirmationModalOpen(false);
                setIsLaunchMeetupConfirmed(true);
              }}
            >
              OK
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
    // } else {
    //   return null;
    // }
  }
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(ConfirmLaunchMeetupModal);
