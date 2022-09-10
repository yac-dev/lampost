// main libraries
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// component
import MeetupDate from './MeetupDate';
import MeetupAttendeesLimit from './MeetupAttendeesLimit';
import MeetupFee from './MeetupFee';

const Container = (props) => {
  return (
    <View>
      <TouchableOpacity onPress={() => props.dispatch({ type: 'BACK_TO_MEETUP_BADGE', payload: '' })}>
        <Text>Back</Text>
        <TouchableOpacity onPress={() => props.dispatch({ type: 'GO_TO_MEETUP_DESCRIPTION', payload: '' })}>
          <Text>NEXT</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <MeetupDate state={props.state} dispatch={props.dispatch} />
      <MeetupAttendeesLimit state={props.state} dispatch={props.dispatch} />
      <MeetupFee state={props.state} dispatch={props.dispatch} />
    </View>
  );
};

export default Container;
