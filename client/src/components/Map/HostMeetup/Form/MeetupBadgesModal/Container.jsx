// main libraries
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, Image } from 'react-native';
import { Button, Dialog, Portal, Provider } from 'react-native-paper';

// components
import SelectBadges from '../../../../Utils/SelectBadges';

// ac
import { setIsSelectMeetupBadgeElementsModalOpen } from '../../../../../redux/actionCreators/modal';
import { setIsSelectMeetupBadgesModalOpen } from '../../../../../redux/actionCreators/modal';

const Container = (props) => {
  if (props.modal.selectMeetupBadges.isOpen) {
    return (
      <Portal>
        <Dialog visible={props.modal.selectMeetupBadges.isOpen}>
          <Dialog.Content>
            <SelectBadges />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => props.setIsSelectMeetupBadgesModalOpen(false)}>Done</Button>
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

export default connect(mapStateToProps, { setIsSelectMeetupBadgesModalOpen })(Container);
