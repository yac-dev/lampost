import React, { useContext, useEffect } from 'react';
import { View, Text, TextInput, InputAccessoryView, Keyboard, TouchableOpacity } from 'react-native';
import FormContext from './FormContext';
import {
  backgroundColorsTable,
  baseBackgroundColor,
  iconColorsTable,
  baseTextColor,
  inputBackgroundColorNew,
  sectionBackgroundColor,
  screenSectionBackgroundColor,
  disabledTextColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';

const Description = () => {
  const { AntDesign, Ionicons } = iconsTable;
  const { formData, setFormData, stageCleared, setStageCleared } = useContext(FormContext);
  const inputAccessoryViewID = 'DESCRIPTION_INPUT';

  return (
    <View style={{ backgroundColor: screenSectionBackgroundColor, padding: 7, borderRadius: 10, marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <View
          style={{
            backgroundColor: backgroundColorsTable['pink1'],
            padding: 5,
            borderRadius: 7,
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
          }}
        >
          <Ionicons name='ios-heart' size={25} color={iconColorsTable['pink1']} />
        </View>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>Trust</Text>
            <View>
              <Ionicons
                name='checkmark-circle'
                size={20}
                color={stageCleared.trust ? iconColorsTable['green1'] : disabledTextColor}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 13, color: baseTextColor, marginRight: 20 }}>
              Required to have certain trust for people to join this library?
            </Text>
          </View>
        </View>
      </View>
      <TextInput />
    </View>
  );
};

export default Description;
