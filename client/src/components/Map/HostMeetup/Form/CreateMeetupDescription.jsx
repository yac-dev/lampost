// main libraries
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const MeetupDates = (props) => {
  // dateと、attendees limit, feeの3項目だけ。
  return (
    <View>
      <TouchableOpacity onPress={() => props.dispatch({ type: 'GO_TO_MEETUP_DETAIL', payload: '' })}>
        <Text>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.dispatch({ type: 'BACK_TO_MEETUP_BADGE', payload: '' })}>
        <Text>Back</Text>
      </TouchableOpacity>

      {/* <View style={styles.bodyDateAndTime}>
        <View style={styles.bodyDateAndTime.header}>
          <FontAwesome name='calendar' size={24} />
          <Text style={{ fontSize: 17, color: 'rgb(135, 135, 135)', marginLeft: 10 }}>When do you host this meetup?</Text>
        </View>
        <View style={styles.bodyDateAndTime.startEndWrapper}>

          <View style={styles.bodyDateAndTime.startEndWrapper.date}>
            <Button
              style={styles.bodyDateAndTime.startEndWrapper.date.button}
              mode='outlined'
              onPress={() => props.dispatch({ type: 'SET_IS_START_DATE_PICKER_VISIBLE', payload: true })}
            >
              Start
            </Button>
            {renderDate(props.state.startDateAndTime)}
          </View>

          <View style={styles.bodyDateAndTime.startEndWrapper.date}>
            <Button
              style={styles.bodyDateAndTime.startEndWrapper.date.button}
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
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({});

export default MeetupDates;
