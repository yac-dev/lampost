import React, { useState, useEffect, useContext } from 'react';
import MapContext from '../../MeetupContext';
import LaunchMeetupContext from '../LaunchMeetupContrext';
import { View, Text, TouchableOpacity } from 'react-native';
import ActionButton from '../../../Utils/ActionButton';
import { iconsTable } from '../../../../utils/icons';
import { iconColorsTable } from '../../../../utils/colorsTable';
import AttendeesLimit from './AttendeesLimit';
import MeetupPointDetail from './MeetupPointDetail';

const Container = (props) => {
  const { AntDesign, MaterialIcons, MaterialCommunityIcons } = iconsTable;
  const { setIsCancelLaunchMeetupConfirmationModalOpen } = useContext(MapContext);
  const { formData, setFormData, setComponent } = useContext(LaunchMeetupContext);
  const [isDisabledNext, setIsDisabledNext] = useState(false);

  useEffect(() => {
    if (formData.meetupPointDetail) {
      if (formData.isAttendeesLimitFree) {
        setIsDisabledNext(false);
      } else {
        if (formData.attendeesLimit) {
          setIsDisabledNext(false);
        } else {
          setIsDisabledNext(true);
        }
      }
    } else {
      setIsDisabledNext(true);
    }
  }, [formData.isAttendeesLimitFree, formData.attendeesLimit, formData.meetupPointDetail]);

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ActionButton
            label='Back'
            backgroundColor={iconColorsTable['blue1']}
            icon={<MaterialCommunityIcons name='hand-pointing-left' color={'white'} size={25} />}
            onActionButtonPress={() => setComponent('MEETUP_TITLE')}
          />
          <ActionButton
            label='Next'
            backgroundColor={iconColorsTable['blue1']}
            icon={<MaterialCommunityIcons name='hand-pointing-right' color={'white'} size={25} />}
            onActionButtonPress={() => setComponent('MEETUP_DATE_AND_TIME')}
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
      <AttendeesLimit />
      <MeetupPointDetail />
    </View>
  );
};

export default Container;
