import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import Header from './Header';
import DateAndTime from './DateAndTime';
import Deadline from './Deadline';

const Container = (props) => {
  return (
    <View>
      <Header />
      <DateAndTime state={props.state} dispatch={props.dispatch} />
      <Deadline state={props.state} dispatch={props.dispatch} />
      <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
        <Button
          icon='arrow-left'
          mode='outlined'
          onPress={() => props.dispatch({ type: 'BACK_TO_MEETUP_PEOPLE', payload: '' })}
        >
          Back
        </Button>
        <Button
          icon='arrow-right'
          mode='outlined'
          contentStyle={{ flexDirection: 'row-reverse' }}
          onPress={() => props.dispatch({ type: 'GO_TO_MEETUP_DETAIL', payload: '' })}
        >
          Next
        </Button>
      </View>
    </View>
  );
};

export default Container;
