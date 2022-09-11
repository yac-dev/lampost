// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FAB, Portal, Provider, IconButton } from 'react-native-paper';

// icon
import { FontAwesome } from '@expo/vector-icons';

//ac
import { setIsConfirmHostMeetupModalOpen } from '../../../redux/actionCreators/modal';

const FABMenu = (props) => {
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  if (!props.hostMeetup.isOpen) {
    return (
      <Provider>
        <Portal>
          <FAB.Group
            open={open}
            icon={open ? 'close' : 'party-popper'}
            actions={[
              {
                icon: (props) => <FontAwesome {...props} name='search' />,
                label: 'Search',
                disabled: true,
                onPress: () => console.log('Search engine'),
              },

              {
                icon: (props) => <FontAwesome {...props} name='calendar' />,
                label: 'Schedule',
                onPress: () => props.navigation.navigate('CalendarNavigator'),
              },
              {
                icon: 'plus',
                label: 'Host',
                // onPress: () => props.setIsHostMeetupOpen(true),
                onPress: () => props.setIsConfirmHostMeetupModalOpen(true),
              },
              {
                icon: (props) => <FontAwesome {...props} name='camera' />,
                label: 'Camera/Live',
                onPress: () => props.navigation.navigate('Camera'),
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </Provider>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return { hostMeetup: state.hostMeetup };
};

export default connect(mapStateToProps, { setIsConfirmHostMeetupModalOpen })(FABMenu);
