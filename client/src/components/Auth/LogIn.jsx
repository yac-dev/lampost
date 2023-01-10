import React, { useState, useContext } from 'react';
import lampostAPI from '../../apis/lampost';
import GlobalContext from '../../GlobalContext';
import AuthContext from './AuthContext';
import { View, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { baseTextColor, iconColorsTable } from '../../utils/colorsTable';
import ActionButton from '../Utils/ActionButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import FormTextInput from './FormTextInput';

const Login = () => {
  const { setAuth, setLoading } = useContext(GlobalContext);
  const { loginOrSignupBottomSheetRef, setIsLoginOrSignup } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      setIsLoginOrSignup('');
      loginOrSignupBottomSheetRef.current.close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <View style={{ marginBottom: 15 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5, color: 'white' }}>Login</Text>
        <Text style={{ color: baseTextColor }}>Please fill in your email and password.</Text>
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
        />
      </View>
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        <ActionButton
          label='Done'
          backgroundColor={iconColorsTable['blue1']}
          icon={<MaterialIcons name='check' color='white' size={25} />}
          onActionButtonPress={() => login()}
        />
      </View>
      {/* <Button onPress={() => login()}>Login</Button> */}
    </View>
  );
};

export default Login;
