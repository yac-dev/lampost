// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

const ActionButtons = () => {
  return (
    <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginBottom: 20 }}>
      <Button
        mode='outlined'
        icon={'comment-question'}
        onPress={() => console.log('Pressed')}
        style={{ marginRight: 10 }}
      >
        Ask
      </Button>
      <Button mode='outlined' icon={'run'} onPress={() => console.log('Pressed')}>
        I'm in!
      </Button>
    </View>
  );
};

export default ActionButtons;
