import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

const ActionButton = (props) => {
  const [checked, setChecked] = useState(false);

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
        borderRadius: 7,
        borderStyle: 'solid',
        borderColor: '#D7D7D7',
        borderWidth: 1,
        padding: 5,
        marginRight: 10,
      }}
      onPress={() => {
        // tab.onPress();
        setChecked((previous) => !previous);
      }}
    >
      <View style={{ marginRight: 5 }}>{props.tab.icon}</View>
      <Text style={{ marginRight: 5 }}>{props.tab.label}</Text>
      {checked ? (
        <MaterialCommunityIcons name='check' color={'#22DC10'} size={24} />
      ) : (
        <MaterialCommunityIcons name='check' color={'#CDCDCD'} size={24} />
      )}
    </TouchableOpacity>
  );
};

export default ActionButton;
