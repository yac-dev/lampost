import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MeetupContext from './MeetupContext';

const MyImpression = () => {
  const { meetupObject } = useContext(MeetupContext);

  return (
    <TouchableOpacity style={{ padding: 20, marginBottom: 10 }}>
      <Text style={{ color: 'white', fontSize: 17, textAlign: 'center' }}>
        {meetupObject.impression ? 'My imression' : '🤔 What are your thoughts on this meetup?'}
      </Text>
    </TouchableOpacity>
  );
};

export default MyImpression;
