// main libraries
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, Image } from 'react-native';
import { Button, Dialog, Portal, Provider } from 'react-native-paper';

// components
import MeetupBadges from './MeetupBadges';

// ac
import { setIsSelectMeetupBadgeElementsModalOpen } from '../../../../../redux/actionCreators/modal';

const Container = (props) => {
  if (props.modal.selectMeetupBadgeElements.isOpen) {
    return (
      <Portal>
        <Dialog visible={props.modal.selectMeetupBadgeElements.isOpen}>
          <Dialog.Content>
            <MeetupBadges />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => props.setIsSelectMeetupBadgeElementsModalOpen(false)}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return { modal: state.modal };
};

export default connect(mapStateToProps, { setIsSelectMeetupBadgeElementsModalOpen })(Container);
