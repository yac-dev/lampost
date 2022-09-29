// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text } from 'react-native';
import { FAB, Portal, Provider, IconButton, withTheme } from 'react-native-paper';

// icon
import { FontAwesome } from '@expo/vector-icons';

//ac
import { logout } from '../../../redux/actionCreators/auth';

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

  if (props.auth.data._id === props.user._id) {
    return (
      <Provider>
        <Portal>
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
              icon={'account-settings'} // locationっていう感じ。
              size='small'
              color={'white'}
              style={{
                // position: 'absolute', marginRight: 24, right: 0, bottom: 310
                marginBottom: 20,
                backgroundColor: 'rgb(58, 126, 224)',
              }}
              onPress={() => props.logout()}
            />
            <FAB
              visible={open ? true : false}
              icon={'access-point-network'} // locationっていう感じ。
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
              icon={'library-shelves'}
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
              icon={'timeline-clock'}
              size='small'
              color={'white'}
              style={{
                // position: 'absolute', marginRight: 24, right: 0, bottom: 310
                marginBottom: 20,
                backgroundColor: 'rgb(58, 126, 224)',
              }}
              onPress={() => props.navigation.navigate('Crew', { meetup: props.meetup })}
            />
            <FAB
              icon={open ? 'close' : 'account'}
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
    return (
      <Provider>
        <Portal>
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
              icon={'youtube'} // locationっていう感じ。
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
              icon={'facebook'} // locationっていう感じ。
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
              icon={'access-point-network'} // locationっていう感じ。
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
              icon={'library-shelves'}
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
              icon={'timeline-clock'}
              size='small'
              color={'white'}
              style={{
                // position: 'absolute', marginRight: 24, right: 0, bottom: 310
                marginBottom: 20,
                backgroundColor: 'rgb(58, 126, 224)',
              }}
              onPress={() => props.navigation.navigate('Crew', { meetup: props.meetup })}
            />
            <FAB
              icon={open ? 'close' : 'account'}
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
  }
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { logout })(withTheme(FABMenu));
