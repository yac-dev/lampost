// main libraries
import React from 'react';
import { View, Text } from 'react-native';
import { Menu, Switch, TextInput } from 'react-native-paper';

const MeetupAttendeesLimit = (props) => {
  // switchを使おう。
  const renderSwitchState = () => {
    if (props.state.isMeetupAttendeesLimitFree) {
      return <Text style={{ marginRight: 5, fontSize: 15 }}>It's free</Text>;
    } else {
      return <Text style={{ marginRight: 5, fontSize: 15 }}></Text>;
    }
  };

  const renderAttendeesLimitForm = () => {
    if (!props.state.isMeetupAttendeesLimitFree) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={{ width: 200, marginLeft: 10 }}
            mode='outlined'
            label='How many?'
            value={props.state.fee}
            onChangeText={(text) => props.dispatch({ type: 'SET_MEETUP_FEE', payload: text })}
          />
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>How many people can join this meetup?</Text>
      <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
        {renderSwitchState()}
        <Switch
          value={props.state.isMeetupAttendeesLimitFree}
          onValueChange={() => props.dispatch({ type: 'SET_IS_MEETUP_ATTENDEES_LIMIT_FREE', payload: '' })}
        />
        {renderAttendeesLimitForm()}
      </View>
    </View>
  );
};

export default MeetupAttendeesLimit;
