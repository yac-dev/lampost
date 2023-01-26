import React, { useState, useEffect, useContext } from 'react';
import MapContext from '../../../MeetupContext';
import { View, Text, TouchableOpacity } from 'react-native';
import ActionButton from '../../../../Utils/ActionButton';
import { iconColorsTable } from '../../../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Header from './Header';
import DateAndTime from './DateAndTime';
import Deadline from './Deadline';

const Container = (props) => {
  const { setIsCancelLaunchMeetupConfirmationModalOpen } = useContext(MapContext);
  const [isDisabledNext, setIsDisabledNext] = useState(true);

  useEffect(() => {
    if (props.state.startDateAndTime && props.state.duration && props.state.applicationDeadline) {
      setIsDisabledNext(false);
    }
  }, [props.state.startDateAndTime, props.state.duration, props.state.applicationDeadline]);

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            isDisabled={isDisabledNext}
          />
        </View>
        <View>
          <ActionButton
            label='Cancel'
            backgroundColor={iconColorsTable['red1']}
            icon={<AntDesign name='close' size={20} color={'white'} style={{ marginRight: 5 }} />}
            onActionButtonPress={() => setIsCancelLaunchMeetupConfirmationModalOpen(true)}
          />
        </View>
      </View>
      <Header />
      <DateAndTime state={props.state} dispatch={props.dispatch} />
      <Deadline state={props.state} dispatch={props.dispatch} />
    </View>
  );
};

export default Container;
