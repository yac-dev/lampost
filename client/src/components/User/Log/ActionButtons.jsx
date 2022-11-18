import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import LogContext from './LogContext';

const ActionButtons = () => {
  const { meetup, isMyPage } = useContext(LogContext);

  if (isMyPage) {
    return (
      <View>
        <Text>Action butons of me</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Action butons of others</Text>
      </View>
    );
  }
};

export default ActionButtons;
