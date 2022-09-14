// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Image, View } from 'react-native';
import { FAB, Portal, Provider, IconButton, withTheme } from 'react-native-paper';

// icon
import { FontAwesome } from '@expo/vector-icons';

//ac
import { setIsConfirmHostMeetupModalOpen } from '../../../redux/actionCreators/modal';

const FABMenu = (props) => {
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  // const { colors } = props.theme;

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

  if (!props.hostMeetup.isOpen) {
    return (
      <Provider>
        <Portal>
          <FAB.Group
            fabStyle={{ backgroundColor: 'rgb(58, 126, 224)' }}
            color={'white'}
            backdropColor={'white'}
            open={open}
            icon={open ? 'map' : 'party-popper'}
            actions={[
              createIconObject('map-search', 'Search', () => console.log('Search engine')),
              createIconObject('calendar', 'Schedule', () => props.navigation.navigate('CalendarNavigator')),
              createIconObject('plus', 'Host', () => props.setIsConfirmHostMeetupModalOpen(true)),
              createIconObject('camera', 'Camera', () => props.navigation.navigate('Camera')),
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

export default connect(mapStateToProps, { setIsConfirmHostMeetupModalOpen })(withTheme(FABMenu));
