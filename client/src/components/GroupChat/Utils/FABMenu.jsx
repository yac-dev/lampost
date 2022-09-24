// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text } from 'react-native';
import { FAB, Portal, Provider, IconButton, withTheme } from 'react-native-paper';

// icon
import { FontAwesome } from '@expo/vector-icons';

//ac

const FABMenu = (props) => {
  // const [state, setState] = React.useState({ open: false });
  // const onStateChange = ({ open }) => setState({ open });
  // const { open } = state;
  const [open, setOpen] = useState(false);
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
      labelStyle: {
        backgroundColor: 'rgb(58, 126, 224)',
      },
      onPress,
      color: 'white',
      labelTextColor: 'white',
      style: {
        backgroundColor: 'rgb(58, 126, 224)',
      },
    };
  };

  if (!props.hostMeetup.isOpen) {
    return (
      <Provider>
        <Portal>
          {/* <FAB.Group
            fabStyle={{ backgroundColor: 'rgb(58, 126, 224)' }}
            color={'white'}
            backdropColor={'transparent'}
            open={open}
            icon={open ? 'close' : 'party-popper'}
            actions={[
              createIconObject('map-search', 'Search', () => props.navigation.navigate('ModalExample')),
              createIconObject('calendar', 'Schedule', () => props.navigation.navigate('Calendar')),
              createIconObject('plus', 'Host', () => props.setIsConfirmHostMeetupModalOpen(true)),
              createIconObject('camera', 'Camera', () => props.navigation.navigate('Camera')),
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          /> */}
          <View
            style={{
              position: 'absolute',
              margin: 16,
              right: 0,
              bottom: 0,
              // flexDirection: 'column',
              alignItems: 'center',
              // justifyContent: 'space-between',
            }}
          >
            <FAB
              visible={open ? true : false}
              icon={'text-long'} // detail
              size='small'
              color={'white'}
              style={{
                // position: 'absolute', marginRight: 24, right: 0, bottom: 310
                marginBottom: 20,
                backgroundColor: 'rgb(58, 126, 224)',
              }}
              onPress={() => console.log('hey detail')}
            />
            <FAB
              visible={open ? true : false}
              icon={'map-marker-outline'} // locationっていう感じ。
              size='small'
              color={'white'}
              style={{
                // position: 'absolute', marginRight: 24, right: 0, bottom: 310
                marginBottom: 20,
                backgroundColor: 'rgb(58, 126, 224)',
              }}
              onPress={() => console.log('launch event')}
            />
            <FAB
              visible={open ? true : false}
              icon={'comment-edit-outline'}
              size='small'
              color={'white'}
              style={{
                // position: 'absolute', marginRight: 24, right: 0, bottom: 310
                marginBottom: 20,
                backgroundColor: 'rgb(58, 126, 224)',
              }}
              onPress={() => props.navigation.navigate('Add comment')}
            />
            <FAB
              visible={open ? true : false}
              icon={'account-group'}
              size='small'
              color={'white'}
              style={{
                // position: 'absolute', marginRight: 24, right: 0, bottom: 310
                marginBottom: 20,
                backgroundColor: 'rgb(58, 126, 224)',
              }}
              onPress={() => console.log('camera component')}
            />
            <FAB
              icon={open ? 'close' : 'account-question'}
              color={'white'}
              style={{
                backgroundColor: 'rgb(58, 126, 224)',
                // position: 'absolute',
                // margin: 16,
                // right: 0,
                // bottom: 0,
              }}
              onPress={() => setOpen((previous) => !previous)}
            />
          </View>
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

export default connect(mapStateToProps)(withTheme(FABMenu));
