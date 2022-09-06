// main libraries
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, Image } from 'react-native';
import { Button, Dialog, Portal, Provider } from 'react-native-paper';
import lampostAPI from '../../../../../apis/lampost';

// components
import BadgeElements from './BadgeElements';

// ac
import { getBadgeElements } from '../../../../../redux/actionCreators/badgeElements';
import { setIsSelectMeetupBadgeElementsModalOpen } from '../../../../../redux/actionCreators/modal';

const MeetupBadgeElementsModal = (props) => {
  const [meetupBadgeElements, setMeetupBadgeElements] = useState([]);

  useEffect(() => {}, []);

  if (props.modal.selectMeetupBadgeElements.isOpen) {
    return (
      <Portal>
        <Dialog visible={props.modal.selectMeetupBadgeElements.isOpen}>
          <Dialog.Content>
            <Text>Meetup badge elements in here!!</Text>
            <BadgeElements />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => props.setIsSelectMeetupBadgeElementsModalOpen(false)}>Add this tag</Button>
          </Dialog.Actions>
          {/* <Image
            source={require('../../../../../../assets/badgeElements/music/the-weeknd-1585555957.8601027.2560x1440__1_-removebg-preview.png')}
            style={{ tintColor: 'rgb(81, 128, 196)', width: 25, height: 25 }}
          /> */}
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

export default connect(mapStateToProps, { setIsSelectMeetupBadgeElementsModalOpen })(MeetupBadgeElementsModal);
