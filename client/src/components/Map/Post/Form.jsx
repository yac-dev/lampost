// main libraries
import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton, Center, VStack, TextArea, Box, Button, Select, CheckIcon } from 'native-base';

// components
import Buttons from './Buttons';
import NBProvider from '../../Utils/NativeBaseProvider';

const Form = () => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [genre, setGenre] = useState('food');
  const [limit, setLimit] = useState('1');
  const [service, setService] = React.useState('');

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
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TouchableOpacity style={styles.genre}>
          <Text style={styles.text}>Food & Drink →</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.genre}>
          <View>
            <Text style={styles.text}>1 hour →</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.genre}>
        <Text style={styles.text}>Post</Text>
      </TouchableOpacity>
      {/* <NBProvider>
        <Buttons textAreaValue={textAreaValue} genre={genre} limit={limit} />
      </NBProvider> */}
    </ScrollView>
  );
};

export default Form;

const styles = StyleSheet.create({
  genre: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  text: {
    // fontSize: 18,
    color: '#fff',
    // fontWeight: 'bold',
    alignSelf: 'center',
    // textTransform: 'uppercase',
  },
  limitHour: {},
});
