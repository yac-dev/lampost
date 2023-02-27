import React, { useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import LibrariesContext from '../LibrariesContext';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
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
      <View style={{ marginBottom: 20 }}>
        {/* <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
          <AppButton
            backgroundColor={backgroundColorsTable['blue1']}
            icon={<MaterialIcons name='create-new-folder' size={35} color={iconColorsTable['blue1']} />}
            label='Create a library'
            onAppMenuButtonPress={() => {
              appMenuBottomSheetRef.current.close();
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
        </ScrollView> */}
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            appMenuBottomSheetRef.current.close();
            createLibraryBottomSheetRef.current.snapToIndex(0);
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 35,
                height: 35,
                backgroundColor: backgroundColorsTable['lightGreen1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginRight: 10,
              }}
            >
              <MaterialCommunityIcons name='plus' color={iconColorsTable['lightGreen1']} size={20} />
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Launch library</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          onPress={() => {
            return null;
          }}
          disabled={true}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 35,
                height: 35,
                backgroundColor: backgroundColorsTable['lightBlue1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginRight: 10,
              }}
            >
              <MaterialCommunityIcons name='map-search-outline' color={iconColorsTable['lightBlue1']} size={20} />
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>
              Search for library
            </Text>
          </View>
          <Foundation name='prohibited' color={iconColorsTable['red1']} size={25} />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <Text style={{ color: baseTextColor }}>
        Please login or signup if you want to post assets or create a library.
      </Text>
    );
  }
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(AppButtons);
