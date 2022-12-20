import React, { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import GlobalContext from '../../GlobalContext';
import { baseTextColor, iconColorsTable } from '../../utils/colorsTable';
import FormTextInput from './FormTextInput';
import ActionButton from '../Utils/ActionButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import lampostAPI from '../../apis/lampost';

const SignUp = () => {
  const { setAuth, setLoading } = useContext(GlobalContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        };
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    // props.signUp(formData);
  };

  return (
    <View>
      <View>
        <View style={{ marginBottom: 15 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5, color: 'white' }}>Signup</Text>
          <Text style={{ color: baseTextColor }}>Please fill in your fullname, email and password.</Text>
        </View>
        <View style={{ marginBottom: 15 }}>
          <FormTextInput label='Name' value={name} onChangeText={(text) => setName(text)} />
        </View>
        <View style={{ marginBottom: 15 }}>
          <FormTextInput label='Email' value={email} onChangeText={(text) => setEmail(text)} />
        </View>
        <View style={{ marginBottom: 15 }}>
          <FormTextInput label='Password' value={password} onChangeText={(text) => setPassword(text)} />
        </View>
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <ActionButton
            label='Signup'
            backgroundColor={iconColorsTable['blue1']}
            icon={<MaterialCommunityIcons name='plus' color='white' size={25} />}
            onActionButtonPress={() => onPressSubmit()}
          />
        </View>

        {/* <TouchableOpacity onPress={() => onPressSubmit()}>
          <Text>Press</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default SignUp;
