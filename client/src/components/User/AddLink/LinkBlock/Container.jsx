import React from 'react';
import { View, Text } from 'react-native';
import SocialMediasList from './SocialMediasList';
import TextInputs from './TextInputs';

const LinkBlockContainer = (props) => {
  return (
    <View>
      <SocialMediasList />
      <TextInputs />
    </View>
  );
};

export default LinkBlockContainer;
