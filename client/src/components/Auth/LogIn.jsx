// main libraries
import React, { useState, useContext } from 'react';
import lampostAPI from '../../apis/lampost';
import GlobalContext from '../../GlobalContext';
import { connect } from 'react-redux';
import { View, Text, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';

// import { Button as ButtonRNE, Icon } from 'react-native-elements';

// ac
import { logIn } from '../../redux/actionCreators/auth';

const Login = (props) => {
  const { setAuth, setLoading } = useContext(GlobalContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const onPressSubmit = () => {
  //   const formData = {
  //     email,
  //     password,
  //   };
  //   // props.navigation.navigate('LogInOrSignUp', { screen: 'Map' });
  //   props.logIn(formData);
  // };

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
        };
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
      {/* <Button
      style={styles.button}
      title='< Back'
      onPress={() => {
        props.navigation.goBack(null);
      }}
    /> */}
      <View style={styles.formContainer}>
        <Text>Welcome to Lampost</Text>

        <Text>Email</Text>
        <TextInput
          placeholder='Email'
          onChangeText={(text) => setEmail(text)}
          value={email}
          style={{
            borderColor: 'skyblue',
            borderWidth: 1,
            borderRadius: 5,
            margin: 12,
            padding: 10,
            height: 40,
            width: 200,
          }}
        />
        <Text>Password</Text>
        <TextInput
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder='Password'
          style={{
            borderColor: 'skyblue',
            borderWidth: 1,
            borderRadius: 5,
            margin: 12,
            padding: 10,
            height: 40,
            width: 200,
          }}
        />
      </View>

      {/* <ButtonRNE
        icon={<Icon name='mail' size={50} type='entypo' color='white' />}
        iconRight
        onPress={() => {
          onPressSubmit();
        }}
      /> */}
      <Button onPress={() => login()}>Login</Button>
    </SafeAreaView>
  );
};

export default connect(null, { logIn })(Login);

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    left: 0,
    top: 100,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
