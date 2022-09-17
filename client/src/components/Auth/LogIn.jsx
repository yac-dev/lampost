// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-paper';

// import { Button as ButtonRNE, Icon } from 'react-native-elements';

// ac
import { logIn } from '../../redux/actionCreators/auth';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onPressSubmit = () => {
    const formData = {
      email,
      password,
    };
    console.log(formData);
    // props.navigation.navigate('LogInOrSignUp', { screen: 'Map' });
    props.logIn(formData);
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
      <Button onPress={() => onPressSubmit()}>Submit</Button>
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
