// main libraries
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { IconButton, Button, Searchbar, Dialog, Portal, Provider } from 'react-native-paper';

// component
import MeetupDate from './MeetupDate';
import MeetupAttendeesLimit from './MeetupAttendeesLimit';
import MeetupFee from './MeetupFee';

const Container = (props) => {
  return (
    <View>
      <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
        <MeetupDate state={props.state} dispatch={props.dispatch} />
        <MeetupAttendeesLimit state={props.state} dispatch={props.dispatch} />
        <MeetupFee state={props.state} dispatch={props.dispatch} />
      </ScrollView>
    </View>
  );
};

{
  /* <View style={{ flexDirection: 'row' }}>
        <View style={{ alignItems: 'flex-start' }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => props.dispatch({ type: 'BACK_TO_MEETUP_BADGE', payload: '' })}
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
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => props.dispatch({ type: 'GO_TO_MEETUP_DESCRIPTION', payload: '' })}
          >
            <Text>Next</Text>
            <IconButton
              icon='arrow-right'
              iconColor={'blue'}
              size={20}
              // disabled={disableIconButton()}
            />
          </TouchableOpacity>
        </View>
      </View> */
}

export default Container;
