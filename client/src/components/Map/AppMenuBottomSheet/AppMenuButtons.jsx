import React, { useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import MapContext from '../MeetupContext';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import AppMenuButton from '../../Utils/AppMenuButton';
import {
  iconColorsTable,
  backgroundColorsTable,
  sectionBackgroundColor,
  baseTextColor,
} from '../../../utils/colorsTable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

const AppMenuButtons = (props) => {
  // 何だろう。。。scrollviewをtopのcomponentにするとなんかバグる。
  const { setIsNotAvailableModalOpen } = useContext(GlobalContext);
  const { appMenuBottomSheetRef, setIsLaunchMeetupConfirmationModalOpen } = useContext(MapContext);
  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
        onPress={() => {
          setIsLaunchMeetupConfirmationModalOpen(true);
          appMenuBottomSheetRef.current.close();
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: backgroundColorsTable['red1'],
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginRight: 10,
            }}
          >
            <MaterialCommunityIcons name='rocket-launch' color={iconColorsTable['red1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Launch meetup</Text>
        </View>
        <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
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
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Search for meetup</Text>
        </View>
        <Foundation name='prohibited' color={iconColorsTable['red1']} size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default AppMenuButtons;
