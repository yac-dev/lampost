// main libraries
import React, { Children } from 'react';
import { IconButton, Center, VStack, NativeBaseProvider, TextArea, Box, Button, Stack } from 'native-base';

const NBProvider = ({ children }) => {
  return <NativeBaseProvider>{children}</NativeBaseProvider>;
};

export default NBProvider;
