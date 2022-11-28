import React from 'react';
import { View, Text } from 'react-native';
import { Menu, Switch, TextInput } from 'react-native-paper';
import { baseTextColor } from '../../../../../utils/colorsTable';

const AttendeesLimit = (props) => {
  const renderSwitchState = () => {
    if (props.state.isMeetupAttendeesLimitFree) {
      return <Text style={{ marginRight: 5, fontSize: 15, color: baseTextColor }}>It's free.</Text>;
    } else {
      return <Text style={{ marginRight: 5, fontSize: 15, color: baseTextColor }}>It's not free.</Text>;
    }
  };

  const renderAttendeesLimitForm = () => {
    if (!props.state.isMeetupAttendeesLimitFree) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <TextInput
            style={{ width: 200, marginLeft: 10, color: baseTextColor }}
            mode='outlined'
            label='How many people?'
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
      <Text style={{ fontWeight: 'bold', fontSize: 13, color: baseTextColor, marginBottom: 10 }}>
        How many people can join this meetup?
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginBottom: 10 }}>
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
