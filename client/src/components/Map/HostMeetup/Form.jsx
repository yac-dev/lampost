// main libraries
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Form = () => {
  // ここ多分useReducerを使えそうだよな。
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  // const [date, setDate] = useState(null);
  const [fee, setFee] = useState('');
  const [attendeesLimit, setAttendeesLimit] = useState('');

  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [endDate, setEndDate] = useState('');

  const handleStartDateConfirm = (date) => {
    console.log('start date is', date);
    setStartDate(date);
    setStartDatePickerVisibility(false);
  };

  const handleEndDateConfirm = (date) => {
    console.log('end date is', date);
    setEndDate(date);
    setEndDatePickerVisibility(false);
  };

  return (
    <View>
      <View>
        <Text>Header</Text>
      </View>
      <View style={{ padding: 20 }}>
        <TextInput
          label='Title'
          value={title}
          onChangeText={(text) => setTitle(text)}
          left={<TextInput.Icon name='eye' />}
          mode='outlined'
          right={<TextInput.Affix text='/65' />}
        />
        <View style={{ height: 250 }}>
          <TextInput
            style={{ flex: 1 }}
            // style={{ height: '100%' }} にすると、bug waringが出る。しかし、一応使える。ただ、left iconありにすると。エラーが出て無理。なんだろうな。このflex: 1って一体。。。もっと精査しないとな。
            mode='outlined'
            value={detail}
            onChangeText={(text) => setDetail(text)}
            left={<TextInput.Icon name='application-edit-outline' />}
            placeholder='Please write the detail about your meetup.'
            label='Detail'
            multiline={true}
            // numberOfLines={10}
          />
        </View>
        {/* <View style={{ width: 160 }}>
        <TextInput
          // style={{ flex: 1 }}
          label='Entrance fee'
          placeholder='e.g.) free, $10'
          value={fee}
          // onChangeText={text => setText(text)}
          left={<TextInput.Icon name='eye' />}
          mode='outlined'
        />
      </View> */}
        <View style={{ width: 160 }}>
          <TextInput
            label='Attendees limit'
            placeholder='e.g) 10, 15'
            value={attendeesLimit}
            // onChangeText={text => setText(text)}
            left={<TextInput.Icon name='eye' />}
            mode='outlined'
          />
        </View>
        <Text>Date & time</Text>
        <Button title='Start' onPress={() => setStartDatePickerVisibility(true)} />
        <DateTimePickerModal
          isVisible={isStartDatePickerVisible}
          mode='datetime'
          onConfirm={(date) => handleStartDateConfirm(date)}
          onCancel={() => setStartDatePickerVisibility(false)}
          is24Hour={true}
        />
        <Text>{`${new Date(startDate)}`}</Text>

        <Button title='End' onPress={() => setEndDatePickerVisibility(true)} />
        <DateTimePickerModal
          isVisible={isEndDatePickerVisible}
          mode='datetime'
          onConfirm={(date) => handleEndDateConfirm(date)}
          onCancel={() => setEndDatePickerVisibility(false)}
          is24Hour={true}
        />
        <Text>{`${new Date(endDate)}`}</Text>
        {/* <Button title='Show Date Picker' onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode='datetime'
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          is24Hour={true}
        /> */}
      </View>
    </View>
  );
};

export default Form;
