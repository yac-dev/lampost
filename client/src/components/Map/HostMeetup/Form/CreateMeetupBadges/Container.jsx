import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import Title from './Title';
import Badge from './Badge';
import RequiredBadges from './RequiredBadges';

const Container = (props) => {
  const validateForm = () => {
    if (props.state.title.length <= 41) {
      // ここでsnackbarを出す。
    }
  };

  return (
    <View>
      <Title state={props.state} dispatch={props.dispatch} />
      <Badge state={props.state} dispatch={props.dispatch} navigation={props.navigation} route={props.route} />
      <RequiredBadges state={props.state} dispatch={props.dispatch} navigation={props.navigation} route={props.route} />
      <View style={{ alignSelf: 'center' }}>
        <Button
          icon='arrow-right'
          mode='outlined'
          // buttonColor='blue'
          contentStyle={{ flexDirection: 'row-reverse' }}
          onPress={() => props.dispatch({ type: 'GO_TO_MEETUP_DATE_AND_TIME', payload: '' })}
        >
          Next
        </Button>
      </View>
    </View>
  );
};

export default Container;
