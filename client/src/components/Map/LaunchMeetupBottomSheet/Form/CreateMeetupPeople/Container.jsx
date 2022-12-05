import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActionButton from '../../../../Utils/ActionButton';
import { iconColorsTable } from '../../../../../utils/colorsTable';

import Header from './Header';
import AttendeesLimit from './AttendeesLimit';

const Container = (props) => {
  return (
    <View style={{}}>
      <Header />
      {/* <WelcomeBadges state={props.state} dispatch={props.dispatch} navigation={props.navigation} route={props.route} /> */}
      <AttendeesLimit state={props.state} dispatch={props.dispatch} />
      <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
        <ActionButton
          label='Back'
          backgroundColor={iconColorsTable['blue1']}
          icon={<MaterialCommunityIcons name='hand-pointing-left' color={'white'} size={25} />}
          onActionButtonPress={() => props.dispatch({ type: 'BACK_TO_MEETUP_TITLE', payload: '' })}
        />
        <ActionButton
          label='Next'
          backgroundColor={iconColorsTable['blue1']}
          icon={<MaterialCommunityIcons name='hand-pointing-right' color={'white'} size={25} />}
          onActionButtonPress={() => props.dispatch({ type: 'GO_TO_MEETUP_DATE_AND_TIME', payload: '' })}
        />
      </View>
    </View>
  );
};

export default Container;
