import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActionButton from '../../../../Utils/ActionButton';
import { AntDesign } from '@expo/vector-icons';
import { iconColorsTable } from '../../../../../utils/colorsTable';

import Header from './Header';
import AttendeesLimit from './AttendeesLimit';

const Container = (props) => {
  const [isDisabledNext, setIsDisabledNext] = useState(false);

  useEffect(() => {
    if (props.state.isMeetupAttendeesLimitFree) {
      setIsDisabledNext(false);
    } else if (!props.state.isMeetupAttendeesLimitFree) {
      if (!props.state.meetupAttendeesLimit) {
        setIsDisabledNext(true);
      } else {
        setIsDisabledNext(false);
      }
    }
  }, [props.state.isMeetupAttendeesLimitFree, props.state.meetupAttendeesLimit]);

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ActionButton
            label='Back'
            backgroundColor={iconColorsTable['blue1']}
            icon={<MaterialCommunityIcons name='hand-pointing-left' color={'white'} size={25} />}
            onActionButtonPress={() => props.dispatch({ type: 'BACK_TO_MEETUP_BADGES', payload: '' })}
          />
          <ActionButton
            label='Next'
            backgroundColor={iconColorsTable['blue1']}
            icon={<MaterialCommunityIcons name='hand-pointing-right' color={'white'} size={25} />}
            onActionButtonPress={() => props.dispatch({ type: 'GO_TO_MEETUP_DATE_AND_TIME', payload: '' })}
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
      <AttendeesLimit state={props.state} dispatch={props.dispatch} />
    </View>
  );
};

export default Container;
