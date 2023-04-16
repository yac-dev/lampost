import React from 'react';
import { View, Text } from 'react-native';
import Header from './Header';
import MyImpression from './MyImpression';
import ActionButtons from './ActionButtons';

const MeetupContainer = () => {
  return (
    <View>
      <Header />
      <MyImpression />
      <ActionButtons />
    </View>
  );
};

export default MeetupContainer;
