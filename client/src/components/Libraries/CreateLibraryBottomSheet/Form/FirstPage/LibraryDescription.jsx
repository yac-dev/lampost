import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import FormContext from '../../FormContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {
  iconColorsTable,
  backgroundColorsTable,
  baseTextColor,
  sectionBackgroundColor,
} from '../../../../../utils/colorsTable';

const RollDescription = (props) => {
  const { formData, setFormData } = useContext(FormContext);

  return (
    <View style={{ marginBottom: 15 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <View
          style={{
            backgroundColor: iconColorsTable['orange1'],
            padding: 5,
            borderRadius: 7,
            width: 35,
            height: 35,
            alignItems: 'center',
          }}
        >
          <AntDesign name='edit' size={25} color='white' />
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 15, color: 'white' }}>Description</Text>
      </View>
      <Text style={{ fontWeight: 'bold', fontSize: 12, color: baseTextColor, marginBottom: 10 }}>
        Please describe about your library.
      </Text>
      <BottomSheetTextInput
        style={{
          borderWidth: 0.3,
          height: 100,
          backgroundColor: sectionBackgroundColor,
          borderRadius: 5,
          padding: 10,
          color: baseTextColor,
        }}
        value={formData.description}
        onChangeText={(text) =>
          setFormData((previous) => {
            return {
              ...previous,
              description: text,
            };
          })
        }
        mode='outlined'
        autoCapitalize='none'
        multiline={true}
      />
    </View>
  );
};

export default RollDescription;
