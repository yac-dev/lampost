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
  const {
    auth,
    setAuth,
    setSnackBar,
    setLoading,
    setMyUpcomingMeetups,
    setMyJoinedLibraries,
    setChatsNotificationCount,
  } = useContext(GlobalContext);
  const emailInputAccessoryViewID = 'DELETE_ACCOUNT_EMAIL_INPUT';
  const passwordInputAccessoryViewID = 'DELETE_ACCOUNT_PASSWORD_INPUT';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const deleteAccount = async () => {
    setLoading(true);
    const result = await lampostAPI.delete(`/auth/${auth.data._id}`);
    await SecureStore.deleteItemAsync('secure_token');
    // ここで、front側のdataを全て消す。
    // auth.socket.disconnect();
    setMyUpcomingMeetups({});
    setMyJoinedLibraries([]);
    setChatsNotificationCount(0);
    setAuth({
      data: null,
      socket: null,
      currentLocation: null,
    });
    setLoading(false);
    setSnackBar({
      isVisible: true,
      barType: 'success',
      message: 'Bye bye.',
      duration: 5000,
    });
    props.navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
      <Text
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: 20,
          marginBottom: 20,
          textAlign: 'center',
          marginTop: 20,
        }}
      >
        Please enter your account's email and password
      </Text>
      <Text style={{ color: baseTextColor, marginBottom: 5 }}>Email</Text>
      <TextInput
        inputAccessoryViewID={emailInputAccessoryViewID}
        // placeholder='email'
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
        placeholderTextColor={baseTextColor}
        style={{
          padding: 10,
          backgroundColor: inputBackgroundColor,
          borderRadius: 5,
          color: baseTextColor,
          marginBottom: 20,
        }}
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
      <Text style={{ color: baseTextColor, marginBottom: 5 }}>Password</Text>
      <TextInput
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
        inputAccessoryViewID={passwordInputAccessoryViewID}
        // placeholder='password'
        // placeholderTextColor={baseTextColor}
        style={{
          padding: 10,
          backgroundColor: inputBackgroundColor,
          borderRadius: 5,
          color: baseTextColor,
          marginBottom: 20,
        }}
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
      <TouchableOpacity
        style={{ padding: 10, backgroundColor: iconColorsTable['red1'], alignSelf: 'center', borderRadius: 5 }}
        onPress={() => deleteAccount()}
      >
        <Text style={{ color: 'white' }}>Permanently delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeleteAccount;
