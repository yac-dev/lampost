// main libraries
import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';

const SignUp = (props) => {
  return (
    <View>
      <Text>Here is the login</Text>
      <Text>Here is the login</Text>
      <Text>Here is the login</Text>
      <Button
        title='< Back'
        onPress={() => {
          /* pass key down to *EditPage* */
          // navigate('EditPage', { go_back_key: state.key });
          // props.navigation.goBack();
          props.navigation.goBack(null);
        }}
      />
      <Text>My Email</Text>
      <TextInput placeholder='Email' />
      <Text>My Password</Text>
      <TextInput secureTextEntry={true} placeholder='Password' />
    </View>
  );
};

export default SignUp;
