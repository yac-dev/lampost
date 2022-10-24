// main libraries
import React from 'react';
import { View, Text } from 'react-native';
import { Menu, Switch, TextInput } from 'react-native-paper';

import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MeetupAttendeesLimit = (props) => {
  // switchを使おう。
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
    <View style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <View
          style={{
            backgroundColor: 'rgba(242, 126, 164, 0.85)',
            padding: 5,
            borderRadius: 7,
            width: 35,
            height: 35,
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons name='account-group' size={25} color='white' />
        </View>
        <View style={{ marginLeft: 15 }}>
          <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Attendees limit</Text>
            <Switch
              value={props.state.isMeetupAttendeesLimitFree}
              onValueChange={() => props.dispatch({ type: 'SET_IS_MEETUP_ATTENDEES_LIMIT_FREE', payload: '' })}
              style={{ marginRight: 10 }}
            />
            {renderSwitchState()}
          </View>
          {/* <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Attendees limit</Text> */}
          <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#9E9E9E' }}>
            How many people can join this meetup?
          </Text>
        </View>
      </View>
      {/* <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
        {renderSwitchState()}
        <Switch
          value={props.state.isMeetupAttendeesLimitFree}
          onValueChange={() => props.dispatch({ type: 'SET_IS_MEETUP_ATTENDEES_LIMIT_FREE', payload: '' })}
        />
      </View> */}
      {renderAttendeesLimitForm()}
    </View>
  );
};

export default MeetupAttendeesLimit;
