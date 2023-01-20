import React, { useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import LibrariesContext from '../LibrariesContext';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {
  iconColorsTable,
  backgroundColorsTable,
  sectionBackgroundColor,
  baseTextColor,
} from '../../../utils/colorsTable';
import AppButton from '../../Utils/AppMenuButton';

const AppButtons = (props) => {
  const { auth, setIsNotAvailableModalOpen } = useContext(GlobalContext);
  const { appMenuBottomSheetRef, createLibraryBottomSheetRef } = useContext(LibrariesContext);

  if (auth.data) {
    return (
      <View style={{ padding: 10, borderRadius: 10, backgroundColor: sectionBackgroundColor, marginBottom: 15 }}>
        <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
          <AppButton
            backgroundColor={backgroundColorsTable['red1']}
            icon={<MaterialIcons name='create-new-folder' size={35} color={iconColorsTable['red1']} />}
            label='Create a library'
            onAppMenuButtonPress={() => {
              appMenuBottomSheetRef.current.snapToIndex(0);
              createLibraryBottomSheetRef.current.snapToIndex(0);
            }}
          />
          <AppButton
            backgroundColor={backgroundColorsTable['pink1']}
            icon={<MaterialCommunityIcons name='map-search-outline' size={35} color={iconColorsTable['pink1']} />}
            label='Search library'
            onAppMenuButtonPress={() => setIsNotAvailableModalOpen(true)}
            isDisabled={true}
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
