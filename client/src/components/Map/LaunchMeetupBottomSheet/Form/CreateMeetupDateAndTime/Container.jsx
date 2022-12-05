import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActionButton from '../../../../Utils/ActionButton';
import { iconColorsTable } from '../../../../../utils/colorsTable';

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
        <ActionButton
          label='Back'
          backgroundColor={iconColorsTable['blue1']}
          icon={<MaterialCommunityIcons name='hand-pointing-left' color={'white'} size={25} />}
          onActionButtonPress={() => props.dispatch({ type: 'BACK_TO_MEETUP_PEOPLE', payload: '' })}
        />
        <ActionButton
          label='Next'
          backgroundColor={iconColorsTable['blue1']}
          icon={<MaterialCommunityIcons name='hand-pointing-right' color={'white'} size={25} />}
          onActionButtonPress={() => props.dispatch({ type: 'GO_TO_MEETUP_DETAIL', payload: '' })}
        />
      </View>
    </View>
  );
};

export default Container;
