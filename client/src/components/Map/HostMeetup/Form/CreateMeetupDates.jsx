import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const MeetupDates = (props) => {
  return (
    <View>
      <TouchableOpacity onPress={() => props.dispatch({ type: 'GO_TO_MEETUP_DETAIL', payload: '' })}>
        <Text>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.dispatch({ type: 'BACK_TO_MEETUP_BADGE', payload: '' })}>
        <Text>Back</Text>
      </TouchableOpacity>
      <Text>Meetup date page here!</Text>
    </View>
  );
};

export default MeetupDates;
