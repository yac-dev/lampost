// main libraries
import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { IconButton, Center, VStack, TextArea, Box, Button, Select, CheckIcon } from 'native-base';

// components
import Buttons from './Buttons';
import NBProvider from '../../Utils/NativeBaseProvider';

const Form = () => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [genre, setGenre] = useState('food');
  const [limit, setLimit] = useState('1');

  return (
    <ScrollView>
      <TextInput
        style={{ height: 200, padding: 20 }}
        multiline={true}
        numberOfLines={7}
        onChangeText={setTextAreaValue}
        value={textAreaValue}
        placeholder="What's going on around you?"
      />
      <NBProvider>
        <Buttons textAreaValue={textAreaValue} genre={genre} limit={limit} />
      </NBProvider>
    </ScrollView>
  );
};

export default Form;
