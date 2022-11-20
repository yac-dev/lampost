import React, { useState } from 'react';
import UserContext from '../Context';
import { useContext } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text } from 'react-native';

const AppMenu = (props) => {
  const { user, navigation } = useContext(UserContext);
  if (user._id === props.auth.data._id) {
    return (
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
          icon={'history'}
          size='small'
          color={'white'}
          style={{
            // position: 'absolute', marginRight: 24, right: 0, bottom: 310
            marginBottom: 20,
            backgroundColor: 'rgb(58, 126, 224)',
          }}
          onPress={() => navigation.navigate('Log', { userId: user._id })}
        />
        <FAB
          icon={open ? 'close' : 'human-edit'}
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

export default connect(mapStateToProps)(AppMenu);
