import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import FormContext from '../../FormContext';

import { Ionicons } from '@expo/vector-icons';
import {
  iconColorsTable,
  backgroundColorsTable,
  baseTextColor,
  sectionBackgroundColor,
} from '../../../../../utils/colorsTable';

const LibraryName = (props) => {
  const { formData, setFormData } = useContext(FormContext);

  return (
    <View style={{ marginBottom: 25 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <View
          style={{
            backgroundColor: iconColorsTable['red1'],
            padding: 5,
            borderRadius: 7,
            width: 35,
            height: 35,
            alignItems: 'center',
          }}
        >
          <Ionicons name='library-outline' size={25} color='white' />
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 15, color: 'white' }}>Library name</Text>
      </View>
      <Text style={{ fontWeight: 'bold', fontSize: 12, color: baseTextColor, marginBottom: 10 }}>
        Please write the library name. 0/40
      </Text>
      <BottomSheetTextInput
        placeholder='Library name'
        placeholderTextColor={baseTextColor}
        style={{
          borderWidth: 0.3,
          padding: 10,
          borderRadius: 10,
          backgroundColor: sectionBackgroundColor,
          color: baseTextColor,
        }}
        value={formData.name}
        onChangeText={(text) =>
          setFormData((previous) => {
            return {
              ...previous,
              name: text,
            };
          })
        }
        mode='outlined'
        autoCapitalize='none'
      />
    </View>
  );
};

export default LibraryName;
