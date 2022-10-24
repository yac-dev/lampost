import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

// components
import Description from './Description';
import Reference from './Reference';

const Container = (props) => {
  return (
    <View>
      <Description state={props.state} dispatch={props.dispatch} />
      <Reference state={props.state} dispatch={props.dispatch} />
      <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
        <Button
          icon='arrow-left'
          mode='outlined'
          onPress={() => props.dispatch({ type: 'BACK_TO_MEETUP_DETAIL', payload: '' })}
        >
          Back
        </Button>
        <Button
          icon='rocket-launch'
          mode='outlined'
          contentStyle={{ flexDirection: 'row-reverse' }}
          onPress={() => props.onSubmit()}
        >
          Launch
        </Button>
      </View>
      <View></View>
    </View>
  );
};

export default Container;
