// main libraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Divider, IconButton, Button, Menu, Switch } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { FontAwesome } from '@expo/vector-icons';

const MeetupDate = (props) => {
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
    <View>
      {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome name='calendar' size={24} /> */}
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>When do you meetup?</Text>
      {/* </View> */}
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Button
            style={{ marginRight: 10 }}
            mode='outlined'
            onPress={() => props.dispatch({ type: 'SET_IS_END_DATE_PICKER_VISIBLE', payload: true })}
          >
            end
          </Button>
          {renderDate(props.state.endDateAndTime)}
        </View>
      </View>
      <DateTimePickerModal
        isVisible={props.state.isStartDatePickerVisible}
        mode='datetime'
        onConfirm={(date) => onStartDateConfirm(date)}
        onCancel={() => props.dispatch({ type: 'SET_IS_START_DATE_PICKER_VISIBLE', payload: false })}
        is24Hour={true}
      />
      <DateTimePickerModal
        isVisible={props.state.isEndDatePickerVisible}
        mode='datetime'
        onConfirm={(date) => onEndDateConfirm(date)}
        onCancel={() => setEndDatePickerVisibility(false)}
        is24Hour={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default MeetupDate;
