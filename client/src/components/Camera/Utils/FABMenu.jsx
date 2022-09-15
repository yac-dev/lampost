// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FAB, Portal, Provider, IconButton } from 'react-native-paper';

// icon
import { FontAwesome } from '@expo/vector-icons';

//ac

const FABMenu = (props) => {
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const createIconObject = (icon, label, onPress) => {
    return {
      icon,
      // (props) => (
      //   <Image
      //     source={require('../../../../assets/badgeIcons/foodAndBeverage/baskinRobbins.pk.png')}
      //     style={{ width: 25, height: 25, tintColor: 'white' }}
      //   /> // これ、カメラのコンポーネントではこれでいい。ここでは、通常どおりmatrrialのiconを使う。
      // ),
      label,
      onPress,
      color: 'white',
      labelTextColor: 'black',
      style: {
        backgroundColor: 'rgb(58, 126, 224)',
      },
    };
  };

  const renderFABGroupIcon = () => {
    if (props.mode === 'photo') {
      if (open) {
        return 'camera';
      } else {
        return 'camera-image';
      }
    } else if (props.mode === 'video') {
      if (open) {
        return 'video';
      } else {
        return 'video-image';
      }
    }
  };

  if (!props.hostMeetup.isOpen) {
    return (
      <Provider>
        <Portal>
          <FAB.Group
            fabStyle={{ backgroundColor: 'rgb(58, 126, 224)' }}
            color={'white'}
            backdropColor={'white'}
            open={open}
            icon={renderFABGroupIcon()}
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
                onPress: () => console.log('camera component'),
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

export default connect(mapStateToProps)(FABMenu);
