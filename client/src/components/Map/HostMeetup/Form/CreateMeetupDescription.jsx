// main libraries
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CreateMeetupDescription = (props) => {
  // dateと、attendees limit, feeの3項目だけ。
  return (
    <View>
      <TouchableOpacity onPress={() => props.onSubmit()}>
        <Text>Done</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.dispatch({ type: 'BACK_TO_MEETUP_DETAIL', payload: '' })}>
        <Text>Back</Text>
      </TouchableOpacity>
      <TextInput
        style={{ marginTop: 10, height: 200 }}
        // label='Meetup title'
        multiline
        value={props.state.description}
        onChangeText={(text) => props.dispatch({ type: 'SET_DESCRIPTION', payload: text })}
        // left={<TextInput.Icon name='eye' />}
        mode='outlined'
        right={<TextInput.Affix text={`${props.state.description.length}/300`} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CreateMeetupDescription;
