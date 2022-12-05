import React from 'react';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActionButton from '../../../../Utils/ActionButton';
import { iconColorsTable } from '../../../../../utils/colorsTable';

// components
import HeaderDescription from './HeaderDescription';
import HeaderLink from './HeaderLink';
import Description from './Description';
import Reference from './Reference';

const Container = (props) => {
  return (
    <View>
      <HeaderDescription />
      <Description state={props.state} dispatch={props.dispatch} />
      <HeaderLink />
      <Reference state={props.state} dispatch={props.dispatch} />
      <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
        <ActionButton
          label='Back'
          backgroundColor={iconColorsTable['blue1']}
          icon={<MaterialCommunityIcons name='hand-pointing-left' color={'white'} size={25} />}
          onActionButtonPress={() => props.dispatch({ type: 'BACK_TO_MEETUP_DETAIL', payload: '' })}
        />
        <ActionButton
          label='Launch'
          backgroundColor={iconColorsTable['blue1']}
          icon={<MaterialCommunityIcons name='rocket-launch' color={'white'} size={25} />}
          onActionButtonPress={() => props.onSubmit()}
        />
      </View>
      <View></View>
    </View>
  );
};

export default Container;
