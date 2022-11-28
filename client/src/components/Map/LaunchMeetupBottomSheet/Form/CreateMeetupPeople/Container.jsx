import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

import Header from './Header';
import WelcomeBadges from './PreferredBadges';
import AttendeesLimit from './AttendeesLimit';

const Container = (props) => {
  return (
    <View style={{}}>
      <Header />
      {/* <WelcomeBadges state={props.state} dispatch={props.dispatch} navigation={props.navigation} route={props.route} /> */}
      <AttendeesLimit state={props.state} dispatch={props.dispatch} />
      <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
        <Button
          icon='arrow-left'
          mode='outlined'
          onPress={() => props.dispatch({ type: 'BACK_TO_MEETUP_TITLE', payload: '' })}
        >
          Back
        </Button>
        <Button
          icon='arrow-right'
          mode='outlined'
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
