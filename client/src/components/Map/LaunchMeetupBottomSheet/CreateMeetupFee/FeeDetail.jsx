import React, { useContext } from 'react';
import { View, Text, InputAccessoryView, Keyboard, TouchableOpacity } from 'react-native';
import LaunchMeetupContext from '../LaunchMeetupContrext';
import {
  iconColorsTable,
  baseTextColor,
  inputBackgroundColor,
  sectionBackgroundColor,
} from '../../../../utils/colorsTable';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

const FeeDetail = () => {
  const inputAccessoryViewID = 'FEE_DETAIL';
  const { formData, setFormData } = useContext(LaunchMeetupContext);

  return (
    <View>
      <Text style={{ color: baseTextColor, marginBottom: 7, fontSize: 13 }}>Fee detail if you need it (optional)</Text>
      <BottomSheetTextInput
        style={{
          flex: 1,
          backgroundColor: inputBackgroundColor,
          borderRadius: 5,
          padding: 10,
          color: baseTextColor,
        }}
        multiline={true}
        scrollEnabled={false}
        inputAccessoryViewID={inputAccessoryViewID}
        value={formData.feeDetail}
        onChangeText={(text) =>
          setFormData((previous) => {
            return {
              ...previous,
              feeDetail: text,
            };
          })
        }
        autoCapitalize='none'
      />
      <InputAccessoryView nativeID={inputAccessoryViewID} backgroundColor={sectionBackgroundColor}>
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <Text style={{ color: 'white', padding: 10, fontWeight: 'bold' }}>Done</Text>
          </TouchableOpacity>
        </View>
      </InputAccessoryView>
    </View>
  );
};

export default FeeDetail;
