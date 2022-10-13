// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text } from 'react-native';
import { FAB, Portal, Provider, IconButton, withTheme } from 'react-native-paper';

// icon
import { FontAwesome } from '@expo/vector-icons';

//ac

const FABMenu = (props) => {
  const [open, setOpen] = useState(false);
  if (!props.bottomSheet.textBox.isOpen) {
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
              icon={'account-group'}
              size='small'
              color={'white'}
              style={{
                // position: 'absolute', marginRight: 24, right: 0, bottom: 310
                marginBottom: 20,
                backgroundColor: 'rgb(58, 126, 224)',
              }}
              onPress={() => props.navigation.navigate('Schedule')}
            />
            <FAB
              visible={open ? true : false}
              icon={'send'}
              size='small'
              color={'white'}
              style={{
                // position: 'absolute', marginRight: 24, right: 0, bottom: 310
                marginBottom: 20,
                backgroundColor: 'rgb(58, 126, 224)',
              }}
              onPress={() => props.handleTextBoxBottomSheet()}
            />
            <FAB
              icon={open ? 'close' : 'plus'}
              // icon={open ? 'close' : 'plus'}
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
  return { bottomSheet: state.bottomSheet };
};

export default connect(mapStateToProps, {})(withTheme(FABMenu));
