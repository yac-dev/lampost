import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import LogContext from './LogContext';
import ActionButtons from './ActionButtons';

const Log = (props) => {
  const { meetup, isMyPage } = useContext(LogContext);

  return (
    <View>
      <Text>{meetup.title}</Text>
      <ActionButtons />
    </View>
  );
};

export default Log;
