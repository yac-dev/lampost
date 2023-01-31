import React, { useContext } from 'react';
import AuthContext from './AuthContext';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import {
  View,
  Text,
  InputAccessoryView,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import { baseTextColor, iconColorsTable, inputBackgroundColor, sectionBackgroundColor } from '../../utils/colorsTable';

const FormTextInput = (props) => {
  const { loginOrSignupBottomSheetRef } = useContext(AuthContext);

  return (
    <View>
      <Text style={{ marginBottom: 10, color: 'white' }}>{props.label}</Text>
      {/* <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'> */}
      <TextInput
        secureTextEntry={props.isSecure ? true : false}
        placeholderTextColor={baseTextColor}
        inputAccessoryViewID={props.inputAccessoryViewID}
        style={{
          borderRadius: 10,
          padding: 10,
          backgroundColor: inputBackgroundColor,
          width: '100%',
        }}
        color={baseTextColor}
        value={props.value}
        onChangeText={props.onChangeText}
        autoCapitalize='none'
      />
      <InputAccessoryView
        nativeID={props.inputAccessoryViewID}
        backgroundColor={sectionBackgroundColor}
        // style={{ paddingTop: 10, paddingBottom: 10 }}
      >
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <View></View>
          <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <Text style={{ color: iconColorsTable['blue1'], fontWeight: 'bold' }}>Done</Text>
          </TouchableOpacity>
        </View>
      </InputAccessoryView>
      {/* </KeyboardAvoidingView> */}
    </View>
  );
};

export default FormTextInput;
