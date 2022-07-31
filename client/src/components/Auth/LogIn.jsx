// main libraries
import React from 'react';
import { View, Text, Button } from 'react-native';

const Login = () => {
  return (
    <View>
      <Button
        title='Go to Page'
        onPress={() => {
          /* pass key down to *EditPage* */
          // navigate('EditPage', { go_back_key: state.key });
          props.navigation.goBack();
        }}
      />
      <Text>Login here</Text>
    </View>
  );
};

export default Login;
