import React, { useContext, useState } from 'react';
import FormContext from '../../FormContext';
import { View, Text, TouchableOpacity } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { baseTextColor, sectionBackgroundColor } from '../../../../../utils/colorsTable';
import { AntDesign } from '@expo/vector-icons';

const RollInput = (props) => {
  const { setFormData, formData } = useContext(FormContext);

  return (
    <View style={{ marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: baseTextColor, marginBottom: 10 }}>{`Roll ${props.index + 1}`}</Text>
        {props.index >= 2 ? (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
              alignSelf: 'flex-end',
            }}
            onPress={() => {
              setFormData((previous) => {
                const updating = { ...previous };
                updating.rolls.push('');
                return updating;
              });
            }}
          >
            <AntDesign name='plus' size={15} style={{ marginRight: 5 }} color={baseTextColor} />
            <Text style={{ color: baseTextColor }}>Remove this</Text>
          </TouchableOpacity>
        ) : null}
      </View>
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
