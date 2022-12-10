import React, { useContext, useState } from 'react';
import FormContext from '../../FormContext';
import { View, Text } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { baseTextColor, sectionBackgroundColor } from '../../../../../utils/colorsTable';

const RollInput = (props) => {
  const { setFormData, formData } = useContext(FormContext);
  const [text, setText] = useState('');

  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ color: baseTextColor, marginBottom: 10 }}>{`Roll ${props.index + 1}`}</Text>
      <BottomSheetTextInput
        placeholder='Library name'
        placeholderTextColor={baseTextColor}
        value={formData.rolls[props.index]}
        onChangeText={(text) =>
          setFormData((previous) => {
            const updating = { ...previous };
            updating.rolls[props.index] = text;
            return updating;
          })
        }
        style={{
          borderWidth: 0.3,
          padding: 10,
          borderRadius: 10,
          backgroundColor: sectionBackgroundColor,
          color: baseTextColor,
        }}
        mode='outlined'
        autoCapitalize='none'
      />
    </View>
  );
};

export default RollInput;
