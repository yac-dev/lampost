import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput, Divider, IconButton, Button, Menu, Switch } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { baseTextColor, iconColorsTable } from '../../../../../utils/colorsTable';
import ActionButton from '../../../../Utils/ActionButton';

const DateAndTime = (props) => {
  const onStartDateConfirm = (date) => {
    props.dispatch({ type: 'SET_START_DATE_AND_TIME', payload: date });
    props.dispatch({ type: 'SET_IS_START_DATE_PICKER_VISIBLE', payload: false });
  };

  const onDurationConfirm = (date) => {
    const minutes = date.getMinutes() + date.getHours() * 60;
    props.dispatch({ type: 'SET_DURATION', payload: minutes });
    props.dispatch({ type: 'SET_IS_DURATION_PICKER_VISIBLE', payload: false });
  };

  const onEndDateConfirm = (date) => {
    props.dispatch({ type: 'SET_END_DATE_AND_TIME', payload: date });
    props.dispatch({ type: 'SET_IS_END_DATE_PICKER_VISIBLE', payload: false });
  };

  const renderDate = (date) => {
    if (date) {
      return (
        <Text style={{ color: baseTextColor }}>{`${new Date(date).toLocaleString('en-US', {
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

  const renderDuration = (duration) => {
    if (duration) {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return <Text style={{ color: baseTextColor }}>{`${hours} hours ${minutes} minutes`}</Text>;
    } else {
      return null;
    }
  };

  return (
    <View>
      {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome name='calendar' size={24} /> */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 13, color: baseTextColor, marginBottom: 10 }}>
          When does your meetup start? And how long is it?
        </Text>
        {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
          <View
            style={{
              backgroundColor: iconColorsTable['blue1'],
              padding: 5,
              borderRadius: 7,
              width: 35,
              height: 35,
              alignItems: 'center',
            }}
          >
            <MaterialCommunityIcons name='calendar-clock' size={25} color='white' />
          </View>
          <View style={{ marginLeft: 15 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Date and time</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#9E9E9E' }}>
              When do you meetup? And how long is it?
            </Text>
          </View>
        </View> */}
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <ActionButton
              label='Start'
              backgroundColor={iconColorsTable['blue1']}
              onActionButtonPress={() => props.dispatch({ type: 'SET_IS_START_DATE_PICKER_VISIBLE', payload: true })}
              icon={<MaterialIcons name='hourglass-top' size={25} color='white' />}
            />
            {renderDate(props.state.startDateAndTime)}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ActionButton
              label='Duration'
              backgroundColor={iconColorsTable['blue1']}
              onActionButtonPress={() => props.dispatch({ type: 'SET_IS_DURATION_PICKER_VISIBLE', payload: true })}
              icon={<MaterialIcons name='hourglass-bottom' size={25} color='white' />}
            />
            {renderDuration(props.state.duration)}
          </View>
          {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Button
              style={{ marginRight: 10 }}
              mode='outlined'
              onPress={() => props.dispatch({ type: 'SET_IS_END_DATE_PICKER_VISIBLE', payload: true })}
            >
              end
            </Button>
            {renderDate(props.state.endDateAndTime)}
          </View> */}
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
        isVisible={props.state.isDurationPickerVisible}
        mode='time'
        date={new Date(new Date().setHours(0, 0, 0, 0))}
        onConfirm={(date) => onDurationConfirm(date)}
        onCancel={() => props.dispatch({ type: 'SET_IS_DURATION_PICKER_VISIBLE', payload: false })}
        locale='en_GB'
        {...props}
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

export default DateAndTime;
