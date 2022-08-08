// main libraries
import React, { useState } from 'react';
import { View } from 'react-native';
import { IconButton, Center, VStack, TextArea, Box, Button } from 'native-base';

const Form = () => {
  const [textAreaValue, setTextAreaValue] = useState('');

  return (
    <Center flex={1} px='3'>
      <Box alignItems='center' w='100%'>
        <TextArea
          borderWidth={0}
          fontSize={20}
          h={300}
          placeholder="What's going on around you?"
          w='100%'
          value={textAreaValue}
          onChange={(event) => setTextAreaValue(event.currentTarget.value)}
          // style={{ borderWidth: 0 }}
        />
        <Button
          size={'lg'}
          onPress={() => console.log('hello world')}
          style={{ color: 'red', height: 60, width: '100%' }}
        >
          Post
        </Button>
      </Box>
    </Center>
  );
};

export default Form;
