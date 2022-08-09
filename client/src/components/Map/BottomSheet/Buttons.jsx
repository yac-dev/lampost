// main libraries
import React from 'react';
import { View, Text } from 'react-native';
import { IconButton, Icon, Box, Center, NativeBaseProvider, Stack, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

const Buttons = (props) => {
  const onPressButton = () => {
    // text value, post type, hour, userId, userの現在地をpostする。
    console.log(props.textAreaValue, props.postType, props.hour);
  };

  return (
    <Center>
      <Stack
        direction={{
          base: 'row',
        }}
        space={3}
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

export default Buttons;
