import React, { useState, useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import GlobalContext from '../../GlobalContext';
import { baseBackgroundColor, baseTextColor, iconColorsTable } from '../../utils/colorsTable';
import FormTextInput from './FormTextInput';
import ActionButton from '../Utils/ActionButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import lampostAPI from '../../apis/lampost';
import * as SecureStore from 'expo-secure-store';
import LoadingSpinner from '../Utils/LoadingSpinner';

const SignUp = () => {
  const { setAuth, setLoading } = useContext(GlobalContext);
  const [isDisabledDone, setIsDisabledDone] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (name.length && email.length && isEmailValid && password.length) {
      if (password.length < 10) {
        setIsDisabledDone(true);
      } else {
        setIsDisabledDone(false);
      }
    } else {
      setIsDisabledDone(true);
    }
  }, [name, email, isEmailValid, password]);

  const onPressSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        name,
        email,
        password,
      };
      const result = await lampostAPI.post('/auth/signup', payload);
      const { user, jwtToken } = result.data;
      await SecureStore.setItemAsync('secure_token', jwtToken);
      setAuth((previous) => {
        return {
          ...previous,
          data: user,
          isAuthenticated: true,
        };
      });
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
    // props.signUp(formData);
  };

  const validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log('Email is Not Correct');
      setEmail(text);
      setIsEmailValid(false);
      return false;
    } else {
      setEmail(text);
      setIsEmailValid(true);
      console.log('Email is Correct');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
      <View style={{ marginBottom: 10 }}>
        <Text style={{ color: baseTextColor }}>Please fill in your fullname, email and password.</Text>
      </View>
      <View style={{ marginBottom: 15 }}>
        <FormTextInput
          label='Name'
          value={name}
          onChangeText={(text) => setName(text)}
          inputAccessoryViewID={'SIGNUP_NAME_IMPUT'}
        />
      </View>
      <View style={{ marginBottom: 15 }}>
        <FormTextInput
          label='Email'
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            validate(text);
          }}
          inputAccessoryViewID={'SIGNUP_EMAIL_IMPUT'}
        />
      </View>
      <View style={{ marginBottom: 15 }}>
        <FormTextInput
          isSecure={true}
          label='Password (at least 10 characters long)'
          value={password}
          onChangeText={(text) => setPassword(text)}
          inputAccessoryViewID={'SIGNUP_PASSWORD_IMPUT'}
        />
      </View>
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        <ActionButton
          label='Submit'
          backgroundColor={iconColorsTable['blue1']}
          icon={<MaterialIcons name='check' color='white' size={25} />}
          onActionButtonPress={() => onPressSubmit()}
          isDisabled={isDisabledDone}
        />
      </View>
      <LoadingSpinner />
    </View>
  );
};

export default SignUp;
