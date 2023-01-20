import React, { useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import MapContext from '../MeetupContext';
import { View, Text, ScrollView } from 'react-native';
import AppMenuButton from '../../Utils/AppMenuButton';
import {
  iconColorsTable,
  backgroundColorsTable,
  sectionBackgroundColor,
  baseTextColor,
} from '../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AppMenuButtons = (props) => {
  // 何だろう。。。scrollviewをtopのcomponentにするとなんかバグる。
  const { setIsNotAvailableModalOpen } = useContext(GlobalContext);
  const { appMenuBottomSheetRef, setIsLaunchMeetupConfirmationModalOpen } = useContext(MapContext);
  return (
    <View style={{ padding: 10, borderRadius: 10, backgroundColor: sectionBackgroundColor, marginBottom: 25 }}>
      <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
        <AppMenuButton
          backgroundColor={backgroundColorsTable['red1']}
          icon={<MaterialCommunityIcons name='rocket-launch' size={35} color={iconColorsTable['red1']} />}
          label='Launch meetup'
          onAppMenuButtonPress={() => {
            setIsLaunchMeetupConfirmationModalOpen(true);
            appMenuBottomSheetRef.current.close();
          }}
        />
        {/* <AppMenuButton
          backgroundColor={backgroundColorsTable['green1']}
          icon={<MaterialCommunityIcons name='history' size={35} color={iconColorsTable['green1']} />}
          label='Meetup logs'
          onAppMenuButtonPress={() => console.log('See meetup logs')}
          isDisabled={true}
        /> */}
        <AppMenuButton
          backgroundColor={backgroundColorsTable['blue1']}
          icon={<MaterialCommunityIcons name='map-search-outline' size={35} color={iconColorsTable['blue1']} />}
          label='Search meetup'
          onAppMenuButtonPress={() => setIsNotAvailableModalOpen(true)}
          isDisabled={true}
        />
      </ScrollView>
    </View>
  );
};

export default AppMenuButtons;
