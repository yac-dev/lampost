import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';

const Dummy = (props) => {
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => props.navigation.navigate('Dummy2')}>
        <Text>Dummy component here</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Dummy;
