import React, { useContext } from 'react';
import LoungeContext from '../LoungeContext';
import { View, Text, ScrollView } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { iconColorsTable, backgroundColorsTable, sectionBackgroundColor } from '../../../../../utils/colorsTable';
import AppButton from '../../../../Map/AppMenuBottomSheet/AppButtons/AppButton';

const AppButtons = () => {
  const { appMenuBottomSheetRef, sendChatBottomSheetRef, crewBottomSheetRef, textInputRef } = useContext(LoungeContext);
  return (
    <View style={{ paddingTop: 10, marginBottom: 15, backgroundColor: sectionBackgroundColor }}>
      <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
        <AppButton
          backgroundColor={backgroundColorsTable['blue1']}
          icon={<MaterialCommunityIcons name='rocket-launch' size={35} color={iconColorsTable['blue1']} />}
          label='Chat'
          onActionButtonPress={() => {
            appMenuBottomSheetRef.current.snapToIndex(0);
            sendChatBottomSheetRef.current.snapToIndex(0);
            textInputRef.current.focus();
          }}
          // onPress={() => console.log('yes')}
        />
        <AppButton
          backgroundColor={backgroundColorsTable['grey1']}
          icon={<MaterialCommunityIcons name='camera' size={35} color={iconColorsTable['grey1']} />}
          label='Crew'
          onActionButtonPress={() => {
            appMenuBottomSheetRef.current.snapToIndex(0);
            crewBottomSheetRef.current.snapToIndex(0);
          }}
          // onPress={() => console.log('launch camera')}
        />
      </ScrollView>
    </View>
  );
};

export default AppButtons;
