// main libraries
import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { TextInput, Divider, IconButton, Button } from 'react-native-paper';
// import { Button } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// components
import HostMeetupHeader from '../../Utils/Header';

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
    <ScrollView>
      <HostMeetupHeader title='Host Meetup' />
      <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesome name='calendar' size={24} />
          <Text style={{ fontSize: 17, color: 'rgb(135, 135, 135)', marginLeft: 10 }}>Date & Time</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Button mode='contained' onPress={() => setStartDatePickerVisibility(true)}>
            Start
          </Button>
          <Text>{`${new Date(startDate)}`}</Text>
        </View>
        <DateTimePickerModal
          isVisible={isStartDatePickerVisible}
          mode='datetime'
          onConfirm={(date) => handleStartDateConfirm(date)}
          onCancel={() => setStartDatePickerVisibility(false)}
          is24Hour={true}
        />
        <View style={{ flexDirection: 'row' }}>
          <Button mode='contained' onPress={() => setEndDatePickerVisibility(true)}>
            end
          </Button>
          <Text>{`${new Date(endDate)}`}</Text>
        </View>
        <DateTimePickerModal
          isVisible={isEndDatePickerVisible}
          mode='datetime'
          onConfirm={(date) => handleEndDateConfirm(date)}
          onCancel={() => setEndDatePickerVisibility(false)}
          is24Hour={true}
        />
      </View>
      <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        <TextInput
          style={{ marginTop: 10 }}
          label='Title'
          value={title}
          onChangeText={(text) => setTitle(text)}
          left={<TextInput.Icon name='eye' />}
          mode='outlined'
          right={<TextInput.Affix text='/65' />}
        />
        <View style={{ height: 250 }}>
          <TextInput
            style={{ flex: 1, marginTop: 10 }}
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
        <View style={{ width: 160, marginTop: 10 }}>
          <TextInput
            label='Attendees limit'
            placeholder='e.g) 10, 15'
            value={attendeesLimit}
            // onChangeText={text => setText(text)}
            left={<TextInput.Icon name='eye' />}
            mode='outlined'
          />
        </View>
        <View style={{ width: 160, marginTop: 10 }}>
          <TextInput
            label='Attendees limit'
            placeholder='e.g) 10, 15'
            value={attendeesLimit}
            // onChangeText={text => setText(text)}
            left={<TextInput.Icon name='eye' />}
            mode='outlined'
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Form;
