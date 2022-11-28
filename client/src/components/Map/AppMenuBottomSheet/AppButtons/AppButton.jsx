import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const AppButton = (props) => {
  return (
    <View style={{ padding: 10, alignItems: 'center' }}>
      <TouchableOpacity
        style={{
          backgroundColor: '#EFEFEF',
          width: 50,
          height: 50,
          borderRadius: 7,
          marginBottom: 5,
        }}
        onPress={() => props.onActionButtonPress()}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: props.backgroundColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {props.icon}
        </View>
      </TouchableOpacity>
      <Text style={{ color: 'white' }}>{props.label}</Text>
    </View>
  );
};

export default AppButton;
