import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LogContext from '../../LogContext';
import MeetupContext from './MeetupContext';

const MyImpression = () => {
  const { navigation } = useContext(LogContext);
  const { meetupObject } = useContext(MeetupContext);

  return (
    <TouchableOpacity
      style={{ padding: 20, marginBottom: 10 }}
      onPress={() => navigation.navigate('Impressions', { meetupId: meetupObject.meetup._id })}
    >
      <Text style={{ color: 'white', fontSize: 17, textAlign: 'center' }}>
        {meetupObject.impression ? 'My imression' : '🤔 What are your thought on this meetup?'}
      </Text>
    </TouchableOpacity>
  );
};

export default MyImpression;
