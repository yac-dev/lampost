import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { iconColorsTable, backgroundColorsTable } from '../../../utils/colorsTable';
import AppButton from '../../Map/AppMenuBottomSheet/AppButtons/AppButton';

const AppButtons = () => {
  return (
    <View style={{ paddingTop: 10, marginBottom: 15 }}>
      <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
        <AppButton
          backgroundColor={backgroundColorsTable['red1']}
          icon={<MaterialCommunityIcons name='rocket-launch' size={35} color={iconColorsTable['red1']} />}
          label='Launch'
          onPress={() => console.log('yes')}
        />
        <AppButton
          backgroundColor={backgroundColorsTable['grey1']}
          icon={<MaterialCommunityIcons name='camera' size={35} color={iconColorsTable['grey1']} />}
          label='Camera'
          onPress={() => console.log('launch camera')}
        />
        <AppButton
          backgroundColor={backgroundColorsTable['pink1']}
          icon={<MaterialCommunityIcons name='map-search-outline' size={35} color={iconColorsTable['pink1']} />}
          label='Search'
        />
      </ScrollView>
    </View>
  );
};

export default AppButtons;
