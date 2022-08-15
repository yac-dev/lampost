// main libraries
import React, { useState } from 'react';
import { View, Text } from 'react-native';

// components
import Header from '../../../Utils/Header';
import Body from './Body';

const Container = () => {
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState('');
  const [limit, setLimit] = useState('1');

  return (
    <View>
      <Header title='Post' />
      <Body />
    </View>
  );
};

export default Container;
