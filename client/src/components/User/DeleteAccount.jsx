import React, { useState, useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import { View, Text, TextInput, TouchableOpacity, InputAccessoryView, Keyboard } from 'react-native';
import {
  iconColorsTable,
  baseBackgroundColor,
  baseTextColor,
  inputBackgroundColor,
  sectionBackgroundColor,
} from '../../utils/colorsTable';

const DeleteAccount = (props) => {
  const { auth } = useContext(GlobalContext);
  const emailInputAccessoryViewID = 'DELETE_ACCOUNT_EMAIL_INPUT';
  const passwordInputAccessoryViewID = 'DELETE_ACCOUNT_PASSWORD_INPUT';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, paddingLeft: 20, paddingRight: 20, paddingTop: 10 }}>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ color: baseTextColor, marginBottom: 5 }}>Please type your account's email</Text>
        <TextInput
          inputAccessoryViewID={emailInputAccessoryViewID}
          placeholder='email'
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          placeholderTextColor={baseTextColor}
          style={{ padding: 10, backgroundColor: inputBackgroundColor, borderRadius: 10, color: baseTextColor }}
        />
        <InputAccessoryView
          nativeID={emailInputAccessoryViewID}
          backgroundColor={sectionBackgroundColor}
          // style={{ paddingTop: 10, paddingBottom: 10, paddingRight: 10 }}
        >
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
              }}
            >
              <Text style={{ color: iconColorsTable['blue1'], padding: 10, fontWeight: 'bold' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </InputAccessoryView>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ color: baseTextColor, marginBottom: 5 }}>Please type your account's password</Text>
        <TextInput
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          inputAccessoryViewID={passwordInputAccessoryViewID}
          placeholder='password'
          placeholderTextColor={baseTextColor}
          style={{ padding: 10, backgroundColor: inputBackgroundColor, borderRadius: 10, color: baseTextColor }}
          secureTextEntry={true}
        />
        <InputAccessoryView
          nativeID={passwordInputAccessoryViewID}
          backgroundColor={sectionBackgroundColor}
          // style={{ paddingTop: 10, paddingBottom: 10, paddingRight: 10 }}
        >
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
              }}
            >
              <Text style={{ color: iconColorsTable['blue1'], padding: 10, fontWeight: 'bold' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </InputAccessoryView>
      </View>
      <TouchableOpacity
        style={{ padding: 10, backgroundColor: iconColorsTable['red1'], alignSelf: 'center', borderRadius: 7 }}
        onPress={() => console.log('deleting')}
      >
        <Text style={{ color: 'white' }}>Permanently delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeleteAccount;
