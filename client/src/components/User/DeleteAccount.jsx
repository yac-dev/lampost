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
import lampostAPI from '../../apis/lampost';
import * as SecureStore from 'expo-secure-store';

const DeleteAccount = (props) => {
  const { auth, setAuth, setMyUpcomingMeetupAndChatsTable, setTotalUnreadChatsCount } = useContext(GlobalContext);
  const emailInputAccessoryViewID = 'DELETE_ACCOUNT_EMAIL_INPUT';
  const passwordInputAccessoryViewID = 'DELETE_ACCOUNT_PASSWORD_INPUT';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const deleteAccount = async () => {
    const result = await lampostAPI.delete(`/auth/${auth.data._id}`);
    // ここで、front側のdataを全て消す。
    auth.socket.disconnect();
    setAuth({
      data: null,
      socket: null,
      currentLocation: null,
    });
    await SecureStore.deleteItemAsync('secure_token');
    setMyUpcomingMeetupAndChatsTable({});
    setTotalUnreadChatsCount(0);
    auth.socket.disconnect();
    props.navigation.goBack('Deleted account');
  };

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
        onPress={() => deleteAccount()}
      >
        <Text style={{ color: 'white' }}>Permanently delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeleteAccount;
