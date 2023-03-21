import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import ActionButton from '../../../../Utils/ActionButton';
import { iconColorsTable, baseTextColor } from '../../../../../utils/colorsTable';
import MapContext from '../../../MeetupContext';
import { AntDesign } from '@expo/vector-icons';
import Header from './Header';
import Title from './Title';

// import Badges from '../CreateMeetupBadges/Badges';

const Container = (props) => {
  const [isDisabledNext, setIsDisabledNext] = useState(true);
  const { setIsCancelLaunchMeetupConfirmationModalOpen } = useContext(MapContext);

  useEffect(() => {
    if (props.state.title.length) {
      if (props.state.title.length <= 41) {
        setIsDisabledNext(false);
      } else {
        setIsDisabledNext(true);
      }
    } else if (!props.state.title.length) {
      setIsDisabledNext(true);
    }
  }, [props.state.title]);

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ActionButton
            label='Next'
            backgroundColor={iconColorsTable['blue1']}
            icon={<MaterialCommunityIcons name='hand-pointing-right' color={'white'} size={25} />}
            onActionButtonPress={() => props.dispatch({ type: 'GO_TO_MEETUP_BADGES', payload: '' })}
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
      <Title state={props.state} dispatch={props.dispatch} />
      {/* <Badges state={props.state} dispatch={props.dispatch} navigation={props.navigation} route={props.route} /> */}
    </View>
  );
};

export default Container;
