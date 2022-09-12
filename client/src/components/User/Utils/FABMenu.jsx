// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FAB, Portal, Provider, IconButton } from 'react-native-paper';

// icon
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

//ac
import { setIsConfirmHostMeetupModalOpen } from '../../../redux/actionCreators/modal';

const FABMenu = (props) => {
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const renderMenuIcon = () => {
    if (open) {
      return <FontAwesome5 {...props} name='user-ninja' size={24} />;
    } else {
      return <FontAwesome5 {...props} name='user-astronaut' size={24} />;
    }
  };

  // if (!props.hostMeetup.isOpen) {
  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={() => renderMenuIcon()}
          actions={[
            {
              icon: (props) => <FontAwesome {...props} name='search' />,
              label: 'Search',
              disabled: true,
              onPress: () => console.log('settings'),
            },

            {
              icon: (props) => <FontAwesome {...props} name='calendar' />,
              label: 'Schedule',
              onPress: () => console.log('Friends component'),
            },
            {
              icon: 'plus',
              label: 'Host',
              // onPress: () => props.setIsHostMeetupOpen(true),
              onPress: () => console.log('timeline'),
            },
            {
              icon: (props) => <FontAwesome {...props} name='camera' />,
              label: 'Camera/Live',
              onPress: () => console.log('Medias'),
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
  // } else {
  //   return null;
  // }
};

const mapStateToProps = (state) => {
  return { hostMeetup: state.hostMeetup };
};

export default connect(mapStateToProps, { setIsConfirmHostMeetupModalOpen })(FABMenu);
