import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GlobalContext from '../../GlobalContext';
import HomeNavigatorContext from '../Navigator/Home/HomeNavigatorContext';
import { baseBackgroundColor, baseTextColor, iconColorsTable } from '../../utils/colorsTable';
import FormTextInput from './FormTextInput';
import ActionButton from '../Utils/ActionButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import lampostAPI from '../../apis/lampost';
import * as SecureStore from 'expo-secure-store';
import LoadingSpinner from '../Utils/LoadingSpinner';

const SignUp = () => {
  const { setAuth, setLoading, setSnackBar } = useContext(GlobalContext);
  const [isDisabledDone, setIsDisabledDone] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState('');
  const { topLevelHomeNavigation } = useContext(HomeNavigatorContext);

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
      setSnackBar({
        isVisible: true,
        barType: 'success',
        message: 'Signed up successfully. Welcome to Lampost.',
        duration: 5000,
      });
      topLevelHomeNavigation.goBack();
    } catch (error) {
      console.log(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
    // props.signUp(formData);
  };

  const validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setEmail(text);
      setIsEmailValid(false);
      return false;
    } else {
      setEmail(text);
      setIsEmailValid(true);
    }
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
        Please set your fullname, email and password.
      </Text>
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
      <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <Text style={{ color: baseTextColor }}>By signing up, you accept and read Lampost's&nbsp;</Text>
          <TouchableOpacity
            style={{ borderBottomWidth: 0.5, borderBottomColor: baseTextColor }}
            onPress={() => topLevelHomeNavigation.navigate('Home eula')}
          >
            <Text style={{ color: baseTextColor }}>EULA.</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LoadingSpinner />
    </View>
  );
};

export default SignUp;
