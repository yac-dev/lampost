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
      style={{ padding: 20 }}
      onPress={() => {
        selectedDateBottomSheetRef.current.close();
        navigation.navigate('Impressions', {
          meetupId: meetupObject.meetup._id,
          launcher: meetupObject.meetup.launcher,
        });
      }}
    >
      <Text style={{ color: 'white', fontSize: 17, textAlign: 'center' }}>
        {meetupObject.impression ? (
          <View>
            <View style={{ marginBottom: 10 }}>
              <FlatList
                horizontal={true}
                data={meetupObject.impression.emojis}
                renderItem={({ item }) => {
                  return <Text style={{ marginRight: 5 }}>{item}</Text>;
                }}
                keyExtractor={(item, index) => `${item}-${index}`}
              />
            </View>
            <Text style={{ color: 'white' }}>{meetupObject.impression.content}</Text>
          </View>
        ) : (
          '🤔 What are your thought on this meetup?'
        )}
      </Text>
    </TouchableOpacity>
  );
};

export default MyImpression;
