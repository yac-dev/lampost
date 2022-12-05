import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Header from './Header';
import Title from './Title';
import Badges from './Badges';
import ActionButton from '../../../../Utils/ActionButton';
import { iconColorsTable } from '../../../../../utils/colorsTable';

const Container = (props) => {
  const validateForm = () => {
    if (props.state.title.length <= 41) {
      // ここでsnackbarを出す。
    }
  };

  return (
    <View style={{}}>
      <Header />
      <Title state={props.state} dispatch={props.dispatch} />
      <Badges state={props.state} dispatch={props.dispatch} navigation={props.navigation} route={props.route} />
      {/* <RequiredBadges state={props.state} dispatch={props.dispatch} navigation={props.navigation} route={props.route} /> */}
      <View style={{ alignSelf: 'center' }}>
        <ActionButton
          label='Next'
          backgroundColor={iconColorsTable['blue1']}
          icon={<MaterialCommunityIcons name='hand-pointing-right' color={'white'} size={25} />}
          onActionButtonPress={() => props.dispatch({ type: 'GO_TO_MEETUP_PEOPLE', payload: '' })}
        />
      </View>
    </View>
  );
};

export default Container;
