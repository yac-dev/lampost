import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const MeetupDetail = (props) => {
  return (
    <View>
      <Text>Done</Text>
      <TouchableOpacity onPress={() => props.dispatch({ type: 'BACK_TO_MEETUP_DATES', payload: '' })}>
        <Text>Back</Text>
      </TouchableOpacity>
      <Text>Meetup detail page here!</Text>
    </View>
  );
};

export default MeetupDetail;
