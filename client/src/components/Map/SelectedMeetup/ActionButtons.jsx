// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

const ActionButtons = (props) => {
  return (
    <View style={{ flexDirection: 'row', marginBottom: 30 }}>
      <Button mode='outlined' icon={'account-group'} onPress={() => console.log('Pressed')} style={{ marginRight: 10 }}>
        {props.selectedMeetup.isAttendeesLimitFree ? (
          <Text style={{ marginRight: 40 }}>{props.selectedMeetup.totalAttendees}/&infin;&nbsp;</Text>
        ) : (
          <Text style={{ marginRight: 40 }}>{props.selectedMeetup.totalAttendees}/limit</Text>
        )}
        &nbsp;Crew
      </Button>
      <Button
        mode='outlined'
        icon={'comment-question'}
        onPress={() => console.log('Pressed')}
        style={{ marginRight: 10 }}
      >
        {props.selectedMeetup.totalQuestions}&nbsp;QA
      </Button>
      <Button mode='outlined' icon={'run'} onPress={() => console.log('Pressed')}>
        Join!
      </Button>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup };
};

export default connect(mapStateToProps, {})(ActionButtons);
