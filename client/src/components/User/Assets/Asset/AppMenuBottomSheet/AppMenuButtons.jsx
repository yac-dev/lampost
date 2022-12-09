import React, { useContext } from 'react';
import GlobalContext from '../../../../../GlobalContext';
import { View, Text, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {
  iconColorsTable,
  backgroundColorsTable,
  sectionBackgroundColor,
  baseTextColor,
} from '../../../../../utils/colorsTable';
import AppMenuButton from '../../../../Utils/AppMenuButton';

const AppMenuButtons = () => {
  const { auth } = useContext(GlobalContext);
  return (
    <View style={{ padding: 10, borderRadius: 10, backgroundColor: sectionBackgroundColor, marginBottom: 15 }}>
      <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
        <AppMenuButton
          backgroundColor={backgroundColorsTable['blue1']}
          icon={<MaterialIcons name='people' size={35} color={iconColorsTable['blue1']} />}
          label='Tag more people'
          onPress={() => console.log('yes')}
        />
        <AppMenuButton
          backgroundColor={backgroundColorsTable['grey1']}
          icon={<MaterialCommunityIcons name='movie-edit' size={35} color={iconColorsTable['grey1']} />}
          label='Edit this asset'
          onPress={() => console.log('launch camera')}
        />
        <AppMenuButton
          backgroundColor={backgroundColorsTable['red1']}
          icon={<MaterialCommunityIcons name='delete' size={35} color={iconColorsTable['red1']} />}
          label='Delete this asset'
        />
      </ScrollView>
    </View>
  );
};

export default AppMenuButtons;
