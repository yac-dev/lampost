// main libraries
import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { IconButton, Center, VStack, TextArea, Box, Button, Select, CheckIcon } from 'native-base';

const Form = () => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [postType, setPostType] = useState('');
  const [hourType, setHourType] = useState('');

  return (
    <Center flex={1} px='3'>
      <Box alignItems='center' w='100%'>
        <ScrollView>
          {/* <TextArea
            borderWidth={0}
            fontSize={20}
            h={300}
            placeholder="What's going on around you?"
            w='100%'
            value={textAreaValue}
            onChange={(event) => setTextAreaValue(event.currentTarget.value)}
            // style={{ borderWidth: 0 }}
          /> */}
          <TextInput
            multiline
            numberOfLines={10}
            // style={styles.input}
            // onChangeText={onChangeNumber}
            // value={number}
            placeholder='useless placeholder'
            keyboardType='numeric'
          />
          <Select
            selectedValue={postType}
            width='100%'
            height={50}
            accessibilityLabel='Post about what?'
            placeholder='Post about what?'
            style={{ height: 30 }}
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size='5' />,
            }}
            mt={1}
            onValueChange={(itemValue) => setPostType(itemValue)}
          >
            <Select.Item label='Food' value='food' />
            <Select.Item label='Cafe' value='cafe' />
            <Select.Item label='Bar' value='bar' />
            <Select.Item label='Sports' value='sport' />
            <Select.Item label='Live concert' value='liveConcert' />
            <Select.Item label='Hospital' value='hospital' />
            <Select.Item label='Street performance' value='street performance' />
            <Select.Item label='Question' value='question' />
            <Select.Item label='Help' value='help' />
          </Select>
          <Select
            selectedValue={hourType}
            width='100%'
            height={50}
            accessibilityLabel='Post about what?'
            placeholder='Post about what?'
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size='5' />,
            }}
            mt={1}
            onValueChange={(itemValue) => setHourType(itemValue)}
          >
            <Select.Item label='1 hour' value='oneHour' />
            <Select.Item label='Infinity' value='infinity' />
          </Select>
          {/* <Button
          size={'lg'}
          onPress={() => console.log('hello world')}
          style={{ color: 'red', height: 60, width: '100%' }}
        >
          Post
        </Button> */}
        </ScrollView>
      </Box>
    </Center>
  );
};

export default Form;
