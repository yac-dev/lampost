import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RollsContext from '../RollsContext';

const Container = (props) => {
  return (
    <View>
      <Text>{props.route.params.rollId}</Text>
      <TouchableOpacity>
        <Text>Post</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Join</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Container;
