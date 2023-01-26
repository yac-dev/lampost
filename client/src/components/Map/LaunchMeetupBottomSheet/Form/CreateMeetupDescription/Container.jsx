import React, { useContext, useState, useEffect } from 'react';
import MapContext from '../../../MeetupContext';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ActionButton from '../../../../Utils/ActionButton';
import { iconColorsTable } from '../../../../../utils/colorsTable';

// components
import HeaderDescription from './HeaderDescription';
import Description from './Description';

const Container = (props) => {
  const { setIsCancelLaunchMeetupConfirmationModalOpen } = useContext(MapContext);
  const [isDisabledNext, setIsDisabledNext] = useState(true);

  useEffect(() => {
    if (props.state.description.length) {
      if (props.state.description.length <= 501) {
        setIsDisabledNext(false);
      } else {
        setIsDisabledNext(true);
      }
    } else if (!props.state.description.length) {
      setIsDisabledNext(true);
    }
  }, [props.state.description]);

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
      <HeaderDescription />
      <Description state={props.state} dispatch={props.dispatch} />
      {/* <HeaderLink /> */}
      {/* <Reference state={props.state} dispatch={props.dispatch} /> */}
      {/* <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
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
      <View></View> */}
    </View>
  );
};

export default Container;
