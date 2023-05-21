import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import LogContext from '../../LogContext';
import MeetupContext from './MeetupContext';

const MyImpression = () => {
  const { navigation, selectedDateBottomSheetRef } = useContext(LogContext);
  const { meetupObject } = useContext(MeetupContext);
  console.log(meetupObject);

  return (
    <TouchableOpacity
      style={{ marginBottom: 10 }}
      onPress={() => {
        selectedDateBottomSheetRef.current.close();
        navigation.navigate('Impressions', {
          meetupId: meetupObject.meetup._id,
          launcher: meetupObject.meetup.launcher,
        });
      }}
    >
      {meetupObject.impression ? (
        <View>
          <View style={{ marginBottom: 10 }}>
            <FlatList
              horizontal={true}
              data={meetupObject.impression.emojis}
              renderItem={({ item }) => {
                return <Text style={{ fontSize: 25 }}>{item}</Text>;
              }}
              keyExtractor={(item, index) => `${item}-${index}`}
            />
          </View>
          <Text style={{ color: 'white' }}>{meetupObject.impression.content}</Text>
        </View>
      ) : (
        <Text style={{ color: 'white', fontSize: 17, textAlign: 'center' }}>
          🤔 What are your thought on this meetup?
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default MyImpression;
