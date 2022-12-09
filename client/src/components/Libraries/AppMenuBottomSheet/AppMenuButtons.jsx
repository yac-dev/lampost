import React, { useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import LibrariesContext from '../LibrariesContext';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  iconColorsTable,
  backgroundColorsTable,
  sectionBackgroundColor,
  baseTextColor,
} from '../../../utils/colorsTable';
import AppButton from '../../Utils/AppMenuButton';

const AppButtons = (props) => {
  const { auth } = useContext(GlobalContext);
  const { appMenuBottomSheetRef, createLibraryBottomSheetRef } = useContext(LibrariesContext);

  if (auth.data) {
    return (
      <View style={{ padding: 10, borderRadius: 10, backgroundColor: sectionBackgroundColor, marginBottom: 15 }}>
        <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
          <AppButton
            backgroundColor={backgroundColorsTable['red1']}
            icon={<MaterialCommunityIcons name='rocket-launch' size={35} color={iconColorsTable['red1']} />}
            label='Launch library'
            onPress={() => {
              appMenuBottomSheetRef.current.snapToIndex(0);
              createLibraryBottomSheetRef.current.snapToIndex(0);
            }}
          />
          <AppButton
            backgroundColor={backgroundColorsTable['grey1']}
            icon={<MaterialCommunityIcons name='camera' size={35} color={iconColorsTable['grey1']} />}
            label='Start camera'
            onPress={() => console.log('launch camera')}
          />
          <AppButton
            backgroundColor={backgroundColorsTable['pink1']}
            icon={<MaterialCommunityIcons name='map-search-outline' size={35} color={iconColorsTable['pink1']} />}
            label='Search library'
          />
        </ScrollView>
      </View>
    );
  } else {
    return (
      <Text style={{ color: baseTextColor, fontWeight: 'bold', fontSize: 20 }}>
        Please login or signup to take some actions
      </Text>
    );
  }
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(AppButtons);
