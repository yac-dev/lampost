import React, { useContext, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import LaunchedMeetupContext from './LaunchedMeetup';
import { baseTextColor, inputBackgroundColor } from '../../../../utils/colorsTable';

const Impressions = () => {
  const [text, setText] = useState('');
  const { impressions, setImpressions } = useContext(LaunchedMeetupContext);

  const renderImpressions = () => {
    if (impressions.length) {
      const list = impressions.map((impression, index) => {
        return (
          <View key={index}>
            <Text>{impression.text}</Text>
          </View>
        );
      });

      return <View>{list}</View>;
    } else {
      return <Text style={{ color: baseTextColor, textAlign: 'center' }}>You'll see all the attendees comments.</Text>;
    }
  };

  return (
    <View>
      <TextInput
        placeholder='Add an impressions'
        placeholderTextColor={baseTextColor}
        style={{ borderRadius: 10, padding: 10, backgroundColor: inputBackgroundColor, marginBottom: 15 }}
      />
      {renderImpressions()}
    </View>
  );
};

export default Impressions;
