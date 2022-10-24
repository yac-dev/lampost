import React from 'react';
import { View, Text } from 'react-native';
import { TextInput, Divider, IconButton, Button, Menu, Switch } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Deadline = (props) => {
  const onStartDateConfirm = (date) => {
    props.dispatch({ type: 'SET_START_DATE_AND_TIME', payload: date });
    props.dispatch({ type: 'SET_IS_START_DATE_PICKER_VISIBLE', payload: false });
  };

  const onEndDateConfirm = (date) => {
    props.dispatch({ type: 'SET_END_DATE_AND_TIME', payload: date });
    props.dispatch({ type: 'SET_IS_END_DATE_PICKER_VISIBLE', payload: false });
  };

  const renderDate = (date) => {
    if (date) {
      return (
        <Text>{`${new Date(date).toLocaleString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}`}</Text>
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
            backgroundColor: 'rgba(158, 20, 236, 0.85)',
            padding: 5,
            borderRadius: 7,
            width: 35,
            height: 35,
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons name='login' size={25} color='white' />
        </View>
        <View style={{ marginLeft: 15 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Application deadline</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#9E9E9E' }}>
            Until when can the users apply for join your meetup?
          </Text>
        </View>
      </View>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Button
            style={{ marginRight: 10, marginBottom: 10 }}
            mode='outlined'
            onPress={() => props.dispatch({ type: 'SET_IS_START_DATE_PICKER_VISIBLE', payload: true })}
          >
            Start
          </Button>
          {renderDate(props.state.startDateAndTime)}
        </View>
      </View>
    </View>
  );
};

export default Deadline;
