import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

const ActionButton = (props) => {
  const [checked, setChecked] = useState(false);

  const onPressButton = () => {
    if (!checked) {
      props.setQueryType((previous) => [...previous, props.tab.query]);
      setChecked((previous) => !previous);
    } else {
      // もし、これがcheckついている状態なら、、、、
      props.setQueryType((previous) => {
        const nw = previous.filter((element) => {
          return element !== props.tab.query;
        });
        return nw;
      });
      // console.log('index is →', props.indexVal);
      // const arr = [...props.queryType];
      // arr.splice(props.indexVal, 1);
      // props.setQueryType(arr);
      setChecked((previous) => !previous);
    }
  };

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
        // props.setQueryType((previous) => [...previous, props.tab.query]);
        // setChecked((previous) => !previous);
        onPressButton();
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
