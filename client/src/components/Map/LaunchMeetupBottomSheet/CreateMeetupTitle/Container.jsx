import React, { useContext, useState, useEffect } from 'react';
import LaunchMeetupContext from '../LaunchMeetupContrext';
import MapContext from '../../MeetupContext';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import ActionButton from '../../../Utils/ActionButton';
import { iconColorsTable, baseTextColor } from '../../../../utils/colorsTable';
import { AntDesign } from '@expo/vector-icons';
import Title from './Title';
import Badges from './Badges';

// import Badges from '../CreateMeetupBadges/Badges';

const Container = (props) => {
  const { setIsCancelLaunchMeetupConfirmationModalOpen } = useContext(MapContext);
  const { formData, setFormData, setComponent } = useContext(LaunchMeetupContext);
  const [isDisabledNext, setIsDisabledNext] = useState(true);

  useEffect(() => {
    const badgesList = Object.values(formData.badges);
    if (formData.title.length && formData.title.length <= 41 && badgesList.length) {
      setIsDisabledNext(false);
    } else {
      setIsDisabledNext(true);
    }
  }, [formData.title, formData.badges]);

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ActionButton
            label='Next'
            backgroundColor={iconColorsTable['blue1']}
            icon={<MaterialCommunityIcons name='hand-pointing-right' color={'white'} size={25} />}
            onActionButtonPress={() => setComponent('MEETUP_PEOPLE')}
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
      <Title />
      <Badges />
    </View>
  );
};

export default Container;
