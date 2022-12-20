import React from 'react';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { View, Text, TextInput } from 'react-native';
import { baseTextColor, inputBackgroundColor } from '../../utils/colorsTable';

const FormTextInput = (props) => {
  return (
    <View>
      <Text style={{ marginBottom: 10, color: 'white' }}>{props.label}</Text>
      <BottomSheetTextInput
        // placeholder='First name'
        placeholderTextColor={baseTextColor}
        // inputAccessoryViewID={inputAccessoryViewID}
        style={{
          borderRadius: 10,
          padding: 10,
          backgroundColor: inputBackgroundColor,
          width: '100%',
          // marginRight: 10,
        }}
        color={baseTextColor}
        value={props.value}
        onChangeText={props.onChangeText}
        autoCapitalize='none'
      />
    </View>
  );
};

export default FormTextInput;
