import React, { useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import MapContext from '../MeetupContext';
import { View, Text, ScrollView } from 'react-native';
import AppButton from '../../Utils/AppMenuButton';
import {
  iconColorsTable,
  backgroundColorsTable,
  sectionBackgroundColor,
  baseTextColor,
} from '../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AppButtons = (props) => {
  // 何だろう。。。scrollviewをtopのcomponentにするとなんかバグる。
  const { appMenuBottomSheetRef, setIsLaunchMeetupConfirmationModalOpen } = useContext(MapContext);
  return (
    <View style={{ padding: 10, borderRadius: 10, backgroundColor: sectionBackgroundColor, marginBottom: 25 }}>
      <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
        <AppButton
          backgroundColor={backgroundColorsTable['red1']}
          icon={<MaterialCommunityIcons name='rocket-launch' size={35} color={iconColorsTable['red1']} />}
          label='Launch meetup'
          onAppMenuButtonPress={() => {
            setIsLaunchMeetupConfirmationModalOpen(true);
            appMenuBottomSheetRef.current.close();
          }}
        />
        <AppButton
          backgroundColor={backgroundColorsTable['grey1']}
          icon={<MaterialCommunityIcons name='camera' size={35} color={iconColorsTable['grey1']} />}
          label='Start camera'
          onAppMenuButtonPress={() => console.log('Start camera')}
        />
        <AppButton
          backgroundColor={backgroundColorsTable['green1']}
          icon={<MaterialCommunityIcons name='fire' size={35} color={iconColorsTable['green1']} />}
          label='Start live'
          onAppMenuButtonPress={() => console.log('Start live')}
        />

        <AppButton
          backgroundColor={backgroundColorsTable['violet1']}
          icon={<MaterialCommunityIcons name='history' size={35} color={iconColorsTable['violet1']} />}
          label='Meetup logs'
          onAppMenuButtonPress={() => console.log('See meetup logs')}
        />
        <AppButton
          backgroundColor={backgroundColorsTable['pink1']}
          icon={<MaterialCommunityIcons name='map-search-outline' size={35} color={iconColorsTable['pink1']} />}
          label='Search meetup'
          onAppMenuButtonPress={() => console.log('Search for meetup')}
        />
      </ScrollView>
    </View>
  );
};

export default AppButtons;
