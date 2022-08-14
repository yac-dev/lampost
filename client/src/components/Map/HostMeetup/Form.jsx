// main libraries
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native';

const Form = () => {
  // ここ多分useReducerを使えそうだよな。
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  // const [date, setDate] = useState(null);
  const [fee, setFee] = useState('');
  const [attendeesLimit, setAttendeesLimit] = useState('');

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

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
        <Button title='Open' onPress={() => setOpen(true)} />
        <DatePicker
          modal
          mode='datetime'
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    </View>
  );
};

export default Form;
