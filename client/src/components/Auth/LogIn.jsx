import React, { useState, useContext, useEffect } from 'react';
import lampostAPI from '../../apis/lampost';
import GlobalContext from '../../GlobalContext';
import AuthContext from './AuthContext';
import { View, Text, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { baseBackgroundColor, baseTextColor, iconColorsTable } from '../../utils/colorsTable';
import ActionButton from '../Utils/ActionButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import FormTextInput from './FormTextInput';
import LoadingSpinner from '../Utils/LoadingSpinner';
import SnackBar from '../Utils/SnackBar';

const Login = () => {
  const [isDisabledDone, setIsDisabledDone] = useState(true);
  const { setAuth, setLoading, setSnackBar } = useContext(GlobalContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (email.length && password.length) {
      setIsDisabledDone(false);
    } else {
      setIsDisabledDone(true);
    }
  }, [email, password]);

  const login = async () => {
    try {
      setLoading(true);
      const formData = {
        email,
        password,
      };
      const result = await lampostAPI.post('/auth/login', formData);
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
      setLoading(false);
      setSnackBar({
        isVisible: true,
        message: 'Something wrong with your email or password. Please type again.',
        barType: 'error',
        duration: 7000,
      });
      console.log(error);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: baseBackgroundColor, paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}
    >
      <View style={{ marginBottom: 15 }}>
        {/* <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5, color: 'white' }}>Login</Text> */}
        <Text style={{ color: baseTextColor }}>Please type your email and password.</Text>
      </View>
      <View style={{ marginBottom: 15 }}>
        <FormTextInput
          label='Email'
          value={email}
          onChangeText={(text) => setEmail(text)}
          inputAccessoryViewID={'LOGIN_EMAIL_IMPUT'}
        />
      </View>
      <View style={{ marginBottom: 15 }}>
        <FormTextInput
          label='Password'
          value={password}
          onChangeText={(text) => setPassword(text)}
          inputAccessoryViewID={'LOGIN_PASSWORD_IMPUT'}
          isSecure={true}
        />
      </View>
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        <ActionButton
          label='Done'
          backgroundColor={iconColorsTable['blue1']}
          icon={<MaterialIcons name='check' color='white' size={25} />}
          onActionButtonPress={() => login()}
          isDisabled={isDisabledDone}
        />
      </View>
      <LoadingSpinner />
      <SnackBar />
    </ScrollView>
  );
};

export default Login;
