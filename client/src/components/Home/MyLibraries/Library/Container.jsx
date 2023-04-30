import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { baseBackgroundColor } from '../../../../utils/colorsTable';

const Container = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
      <Text>LibraryCon</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate('Page1')}>
        <Text style={{ color: 'red' }}>hi</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Container;
