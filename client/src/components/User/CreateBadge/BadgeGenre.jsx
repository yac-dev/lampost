import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const BadgeGenre = (props) => {
  return (
    <TouchableOpacity>
      <Text>{props.label}</Text>
    </TouchableOpacity>
  );
};

export default BadgeGenre;
