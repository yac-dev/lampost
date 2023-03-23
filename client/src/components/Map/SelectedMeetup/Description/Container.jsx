import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { baseBackgroundColor } from '../../../../utils/colorsTable';

const Container = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor, padding: 10 }}>
      <Text style={{ color: 'white', fontSize: 17 }}>{props.route.params.description}</Text>
      <TouchableOpacity>
        <Text style={{ color: 'red' }}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Container;
