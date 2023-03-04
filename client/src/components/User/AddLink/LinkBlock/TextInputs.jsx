import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { baseTextColor, inputBackgroundColor } from '../../../../utils/colorsTable';

const TextInputs = () => {
  const [linkNameTextInput, setLinkNameTextInput] = useState('');
  const [linkAddressTextInput, setLinkAddressTextInput] = useState('');

  return (
    <View>
      <Text style={{ color: 'white', marginBottom: 10 }}>Link name</Text>
      <TextInput
        placeholder='e.g.) My youtube channel'
        placeholderTextColor={baseTextColor}
        style={{ borderRadius: 5, padding: 10, backgroundColor: inputBackgroundColor }}
        value={linkNameTextInput}
        onChangeText={(text) => setLinkNameTextInput(text)}
      />
      <Text style={{ color: 'white', marginBottom: 10 }}>Link address</Text>
      <TextInput
        placeholder='e.g.) https://youtube/@mychannel'
        placeholderTextColor={baseTextColor}
        style={{ borderRadius: 5, padding: 10, backgroundColor: inputBackgroundColor }}
        value={linkNameTextInput}
        onChangeText={(text) => setLinkNameTextInput(text)}
      />
    </View>
  );
};

export default TextInputs;
