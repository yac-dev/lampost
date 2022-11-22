import React from 'react';
import { View, Text } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

const RollDescription = (props) => {
  return (
    <View>
      <Text>Roll description</Text>
      <BottomSheetTextInput
        style={{ borderWidth: 0.3, height: 100, backgroundColor: '#E9E9E9', borderRadius: 5, padding: 10 }}
        value={props.state.description}
        onChangeText={(text) => props.dispatch({ type: 'SET_ROLL_DESCRIPTION', payload: text })}
        // left={<TextInput.Icon name='eye' />}
        mode='outlined'
        autoCapitalize='none'
      />
      {/* <BottomSheetTextInput
        style={{ height: 100, backgroundColor: '#E9E9E9', borderRadius: 5, padding: 10 }}
        // label='Meetup title'
        multiline
        value={props.state.description}
        onChangeText={(text) => props.dispatch({ type: 'SET_DESCRIPTION', payload: text })}
        // left={<TextInput.Icon name='eye' />}
        mode='outlined'
        autoCapitalize='none'
      /> */}
    </View>
  );
};

export default RollDescription;
