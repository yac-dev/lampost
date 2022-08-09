// main libraries
import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { IconButton, Icon, Box, Center, NativeBaseProvider, Stack, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

const Buttons = (props) => {
  const onPressButton = () => {
    console.log(props.textAreaValue, props.genre, props.limit, props.auth.currentLocation);
  };

  return (
    <Center>
      <Stack
        direction={{
          base: 'row',
        }}
        space={10}
      >
        <IconButton
          style={{ backgroundColor: 'rgb(54, 100, 207)' }}
          icon={<Icon as={Fontisto} name='clock' />}
          borderRadius='full'
          _icon={{
            color: 'white',
            size: 'md',
          }}
        />
        <IconButton
          style={{ backgroundColor: 'rgb(54, 100, 207)' }}
          icon={<Icon as={Ionicons} name='restaurant' />}
          borderRadius='full'
          _icon={{
            color: 'white',
            size: 'md',
          }}
        />
        <Button size='sm' style={{ backgroundColor: 'rgb(54, 100, 207)' }} onPress={() => onPressButton()}>
          Done
        </Button>
      </Stack>
    </Center>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Buttons);
