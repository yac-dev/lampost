import React, { useContext } from 'react';
import LoungeContext from '../LoungeContext';
import { View, Text, ScrollView } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { iconColorsTable, backgroundColorsTable, sectionBackgroundColor } from '../../../../../utils/colorsTable';
import AppButton from '../../../../Utils/AppMenuButton';

const AppButtons = () => {
  const { appMenuBottomSheetRef, sendChatBottomSheetRef, crewBottomSheetRef, textInputRef } = useContext(LoungeContext);
  return (
    <View style={{ padding: 10, borderRadius: 10, backgroundColor: sectionBackgroundColor, marginBottom: 15 }}>
      <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
        <AppButton
          backgroundColor={backgroundColorsTable['blue1']}
          icon={<MaterialCommunityIcons name='send' size={35} color={iconColorsTable['blue1']} />}
          label='Send a chat'
          onAppMenuButtonPress={() => {
            appMenuBottomSheetRef.current.snapToIndex(0);
            sendChatBottomSheetRef.current.snapToIndex(0);
            textInputRef.current.focus();
          }}
        />
        <AppButton
          backgroundColor={backgroundColorsTable['violet1']}
          icon={<FontAwesome5 name='user-astronaut' size={30} color={iconColorsTable['violet1']} />}
          label='Members'
          onAppMenuButtonPress={() => {
            appMenuBottomSheetRef.current.snapToIndex(0);
            crewBottomSheetRef.current.snapToIndex(0);
          }}
        />
        {/* <AppButton これ、後でいい。
          backgroundColor={backgroundColorsTable['black1']}
          icon={<Foundation name='skull' size={35} color={iconColorsTable['black1']} />}
          label='Blacklist'
          onAppMenuButtonPress={() => {
            appMenuBottomSheetRef.current.snapToIndex(0);
            crewBottomSheetRef.current.snapToIndex(0);
          }}
        /> */}
      </ScrollView>
    </View>
  );
};

export default AppButtons;
