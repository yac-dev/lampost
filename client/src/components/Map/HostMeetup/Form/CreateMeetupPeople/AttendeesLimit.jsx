import React from 'react';
import { View, Text } from 'react-native';
import { Menu, Switch, TextInput } from 'react-native-paper';

const AttendeesLimit = (props) => {
  const renderSwitchState = () => {
    if (props.state.isMeetupAttendeesLimitFree) {
      return <Text style={{ marginRight: 5, fontSize: 15 }}>It's free.</Text>;
    } else {
      return <Text style={{ marginRight: 5, fontSize: 15 }}>It's not free.</Text>;
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
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#9E9E9E' }}>How many people can join this meetup?</Text>
      <View>
        <Switch
          value={props.state.isMeetupAttendeesLimitFree}
          onValueChange={() => props.dispatch({ type: 'SET_IS_MEETUP_ATTENDEES_LIMIT_FREE', payload: '' })}
          style={{ marginRight: 10 }}
        />
        {renderSwitchState()}
      </View>
      {renderAttendeesLimitForm()}
    </View>
  );
};

export default AttendeesLimit;
