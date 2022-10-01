// main libraries
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { IconButton, Button, Searchbar, Dialog, Portal, Provider } from 'react-native-paper';

const CreateMeetupDescription = (props) => {
  // dateと、attendees limit, feeの3項目だけ。
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ alignItems: 'flex-start' }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => props.dispatch({ type: 'BACK_TO_MEETUP_DETAIL', payload: '' })}
          >
            <IconButton
              icon='arrow-left'
              iconColor={'blue'}
              size={20}
              // disabled={disableIconButton()}
            />
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => props.onSubmit()}>
            <Text>Done!</Text>
            <IconButton
              icon='arrow-right'
              iconColor={'blue'}
              size={20}
              // disabled={disableIconButton()}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        Description&nbsp;{props.state.description.length}/300
      </Text>
      <TextInput
        style={{ height: 150 }}
        // label='Meetup title'
        multiline
        value={props.state.description}
        onChangeText={(text) => props.dispatch({ type: 'SET_DESCRIPTION', payload: text })}
        // left={<TextInput.Icon name='eye' />}
        mode='outlined'
        // right={<TextInput.Affix text={`${props.state.description.length}/300`} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CreateMeetupDescription;
