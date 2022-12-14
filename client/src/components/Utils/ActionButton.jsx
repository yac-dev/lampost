import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ActionButtonNew = (props) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 2,
        paddingBottom: 2,
        paddingRight: 10,
        paddingLeft: 5,
        backgroundColor: props.backgroundColor,
        marginRight: 10,
        borderRadius: 10,
      }}
      onPress={() => props.onActionButtonPress()}
    >
      <View
        style={{
          width: 40,
          height: 40,
          alignItems: 'center', // これと
          justifyContent: 'center', // これで中のimageを上下左右真ん中にする
        }}
      >
        {props.icon}
      </View>
      <Text style={{ color: 'white' }}>{props.label}</Text>
    </TouchableOpacity>
  );
};

export default ActionButtonNew;
