// main libraries
import React, { useState } from 'react';
import { View, Text } from 'react-native';

// components
import Header from '../../../Utils/Header';
import Body from './Body';

const Container = () => {
  const [content, setContent] = useState('');
  const [selectedPostType, setSelectedPostType] = useState('');
  const [selectedPostLength, setSelectedPostLength] = useState('');
  const [isPostTypeMenuVisible, setIsPostTypeMenuVisible] = useState('');
  const [isPostLengthMenuVisible, setIsPostLengthMenuVisible] = useState('');

  return (
    <View>
      <Header title='Post' />
      <Body
        selectedPostType={selectedPostType}
        setSelectedPostType={setSelectedPostType}
        isPostTypeMenuVisible={isPostTypeMenuVisible}
        setIsPostTypeMenuVisible={setIsPostTypeMenuVisible}
        selectedPostLength={selectedPostLength}
        setSelectedPostLength={setSelectedPostLength}
        isPostLengthMenuVisible={isPostLengthMenuVisible}
        setIsPostLengthMenuVisible={setIsPostLengthMenuVisible}
      />
    </View>
  );
};

export default Container;
