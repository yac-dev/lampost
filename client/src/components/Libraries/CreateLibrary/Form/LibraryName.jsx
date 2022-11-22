import React from 'react';
import { View, Text } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

const RollName = (props) => {
  return (
    <View>
      <Text>Roll name here</Text>
      <BottomSheetTextInput
        placeholder='Roll name'
        style={{ borderWidth: 0.3 }}
        value={props.state.name}
        onChangeText={(text) => props.dispatch({ type: 'SET_ROLL_NAME', payload: text })}
        // left={<TextInput.Icon name='eye' />}
        mode='outlined'
        autoCapitalize='none'
      />
    </View>
  );
};

export default RollName;
