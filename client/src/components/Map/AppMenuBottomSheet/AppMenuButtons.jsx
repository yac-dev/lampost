import React, { useContext } from 'react';
import MapContext from '../MeetupContext';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import AppButton from '../../Utils/AppMenuButton';
import {
  iconColorsTable,
  backgroundColorsTable,
  sectionBackgroundColor,
  baseTextColor,
} from '../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { setIsConfirmHostMeetupModalOpen } from '../../../redux/actionCreators/modal';
import { setIsPostBottomSheetOpen } from '../../../redux/actionCreators/bottomSheet';

const AppButtons = (props) => {
  // 何だろう。。。scrollviewをtopのcomponentにするとなんかバグる。
  const { appMenuBottomSheetRef, setIsLaunchMeetupConfirmationModalOpen } = useContext(MapContext);
  if (props.auth.isAuthenticated) {
    return (
      <View style={{ padding: 10, borderRadius: 10, backgroundColor: sectionBackgroundColor, marginBottom: 15 }}>
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
  } else {
    return (
      <Text style={{ color: baseTextColor, fontWeight: 'bold', fontSize: 20 }}>
        Please login or signup to take some actions.
      </Text>
    );
  }
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { setIsConfirmHostMeetupModalOpen })(AppButtons);
