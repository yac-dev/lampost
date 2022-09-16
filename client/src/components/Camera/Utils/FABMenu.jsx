// main libraries
import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';

import { FAB, Portal, Provider, IconButton } from 'react-native-paper';

// icon
import { FontAwesome } from '@expo/vector-icons';

//ac

const FABMenu = (props) => {
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const createIconObject = (params) => {
    const { icon } = params;
    const { ImageComponent } = params;
    const { label } = params;
    const { onPress } = params;
    return {
      icon: ImageComponent ? ImageComponent : icon,
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
    if (props.mode === 'Photo') {
      if (open) {
        return 'close';
      } else {
        return 'camera';
      }
    } else if (props.mode === 'Video') {
      if (open) {
        return 'close';
      } else {
        return 'video';
      }
    }
  };

  // 後でやる{
  //   icon: 'camera-timer',
  //   label: 'Timer setting',
  //   color: 'white',
  //   labelTextColor: 'black',
  //   style: {
  //     backgroundColor: 'rgb(58, 126, 224)',
  //   },
  //   // onPress: () => props.setIsHostMeetupOpen(true),
  //   onPress: () => console.log('camera component'),
  // },

  const fabActions = () => {
    if (props.mode === 'Photo') {
      return [
        createIconObject({ icon: 'flash', label: 'Set flash', onPress: () => console.log('flash setting') }),
        createIconObject({
          icon: 'lightbulb-fluorescent-tube-outline',
          label: 'Fluorescent cam',
          onPress: () => console.log('fluorescent'),
        }),
        createIconObject({
          icon: 'lightbulb-on-outline',
          label: 'Incandescent cam',
          onPress: () => console.log('Incandescent'),
        }),
        createIconObject({
          icon: (props) => (
            <Image
              source={require('../../../../assets/app/icons8-yin-yang-100.png')}
              style={{ width: 25, height: 25, tintColor: 'white' }}
            />
          ),
          label: 'Black and White cam',
          onPress: () => console.log('black and white'),
        }),
        createIconObject({ icon: 'weather-cloudy', label: 'Cloudy cam', onPress: () => console.log('cloudy') }),
        createIconObject({ icon: 'weather-sunny', label: 'Sunny cam', onPress: () => console.log('sunny') }),
        createIconObject({ icon: 'camera', label: 'Original cam', onPress: () => console.log('original') }),
        createIconObject({ icon: 'camera-flip', label: 'Set flip', onPress: () => console.log('set flip') }),
      ];
    } else if (props.mode === 'Video') {
      return [
        createIconObject({ icon: 'camera-flip', label: 'Set flip', onPress: () => console.log('set flip') }),
        createIconObject({
          icon: (props) => (
            <Image
              source={require('../../../../assets/app/icons8-vintage-camera-100.png')}
              style={{ width: 25, height: 25, tintColor: 'white' }}
            />
          ),
          label: "80's vintage film",
          onPress: () => console.log('80s vintage'),
        }),
        createIconObject({
          icon: (props) => (
            <Image
              source={require('../../../../assets/app/icons8-film-roll-100.png')}
              style={{ width: 25, height: 25, tintColor: 'white' }}
            />
          ),
          label: '8mm',
          onPress: () => console.log('8mm'),
        }),
        createIconObject({ icon: 'video', label: 'Original', onPress: () => console.log('normal vid') }),
      ];
    }
  };

  return (
    <Provider>
      <Portal>
        <FAB.Group
          fabStyle={{ backgroundColor: 'rgb(58, 126, 224)' }}
          color={'white'}
          backdropColor={'white'}
          open={open}
          icon={renderFABGroupIcon()}
          actions={fabActions()}
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
};

const mapStateToProps = (state) => {
  return { hostMeetup: state.hostMeetup };
};

export default connect(mapStateToProps)(FABMenu);
