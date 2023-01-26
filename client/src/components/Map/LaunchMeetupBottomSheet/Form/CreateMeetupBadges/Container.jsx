import React, { useContext, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import MapContext from '../../../MeetupContext';
import ActionButton from '../../../../Utils/ActionButton';
import { iconColorsTable, baseTextColor } from '../../../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Header from './Header';
import Badges from './Badges';

const CreateMeetupBadgesContainer = (props) => {
  const [isDisabledNext, setIsDisabledNext] = useState(true);
  const { setIsCancelLaunchMeetupConfirmationModalOpen } = useContext(MapContext);

  useEffect(() => {
    const badgesList = Object.values(props.state.badges);
    if (badgesList.length) {
      setIsDisabledNext(false);
    } else if (!badgesList.length) {
      setIsDisabledNext(true);
    }
  }, [props.state.badges]);

  return (
    <View>
      {/* ここ、action buttonsね。*/}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            onActionButtonPress={() => props.dispatch({ type: 'GO_TO_MEETUP_PEOPLE', payload: '' })}
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
      <Badges state={props.state} dispatch={props.dispatch} navigation={props.navigation} route={props.route} />
    </View>
  );
};

export default CreateMeetupBadgesContainer;
