import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import DateAndTime from './DateAndTime';
import Deadline from './Deadline';

const Container = (props) => {
  return (
    <View>
      <DateAndTime state={props.state} dispatch={props.dispatch} />
      <Deadline state={props.state} dispatch={props.dispatch} />
      <View>
        <TouchableOpacity
          style={{ alignSelf: 'center' }}
          onPress={() => props.dispatch({ type: 'BACK_TO_MEETUP_BADGE', payload: '' })}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text>Back (1/4)</Text>
            <Entypo name='arrow-with-circle-left' size={25} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignSelf: 'center' }}
          onPress={() => props.dispatch({ type: 'GO_TO_MEETUP_DETAIL', payload: '' })}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text>Next (3/4)</Text>
            <Entypo name='arrow-with-circle-right' size={25} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Container;
