import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import MapContext from '../../MeetupContext';
import LaunchMeetupContext from '../LaunchMeetupContrext';
import ActionButton from '../../../Utils/ActionButton';
import Fee from './Fee';
import FeeDetail from './FeeDetail';
import { iconColorsTable } from '../../../../utils/colorsTable';
import { iconsTable } from '../../../../utils/icons';

const Container = () => {
  const { MaterialCommunityIcons, AntDesign } = iconsTable;
  const { setComponent } = useContext(LaunchMeetupContext);
  const { setIsCancelLaunchMeetupConfirmationModalOpen } = useContext(MapContext);

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ActionButton
            label='Back'
            backgroundColor={iconColorsTable['blue1']}
            icon={<MaterialCommunityIcons name='hand-pointing-left' color={'white'} size={25} />}
            onActionButtonPress={() => setComponent('MEETUP_DATE_AND_TIME')}
          />
          <ActionButton
            label='Next'
            backgroundColor={iconColorsTable['blue1']}
            icon={<MaterialCommunityIcons name='hand-pointing-right' color={'white'} size={25} />}
            onActionButtonPress={() => setComponent('MEETUP_DESCRIPTION')}
            // isDisabled={isDisabledNext}
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
      <Fee />
      <FeeDetail />
    </View>
  );
};

export default Container;
