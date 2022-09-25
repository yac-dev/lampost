// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// react native elements
// import { Button as ButtonRNE, Icon } from 'react-native-elements';

import Map from '../Map/Map';

// ac
import { signUp } from '../../redux/actionCreators/auth';

const SignUp = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onPressSubmit = () => {
    const name = `${firstName} ${lastName}`;
    const formData = {
      name,
      email,
      password,
    };
    console.log(formData);
    // props.navigation.navigate('LogInOrSignUp', { screen: 'Map' });
    props.signUp(formData);
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
        <Text>First name</Text>
        <TextInput
          placeholder='first name'
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
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
        <Text>Last name</Text>
        <TextInput
          placeholder='last name'
          onChangeText={(text) => setLastName(text)}
          value={lastName}
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
        <TouchableOpacity onPress={() => onPressSubmit()}>
          <Text>Press</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{ position: 'absolute', right: 20, top: 45, zIndex: 10 }}
          onPress={() => props.navigation.navigate('LogIn')}
        >
          <Text>Back to Login</Text>
        </TouchableOpacity> */}
      </View>

      {/* <ButtonRNE
        icon={<Icon name='mail' size={50} type='entypo' color='white' />}
        iconRight
        onPress={() => {
          onPressSubmit();
        }}
      /> */}
    </SafeAreaView>
  );
};

export default connect(null, { signUp })(SignUp);

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
