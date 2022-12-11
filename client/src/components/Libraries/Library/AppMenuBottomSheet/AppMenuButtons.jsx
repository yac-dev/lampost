import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import LibraryContext from '../LibraryContext';
import {
  baseBackgroundColor,
  backgroundColorsTable,
  iconColorsTable,
  sectionBackgroundColor,
} from '../../../../utils/colorsTable';
import AppMenuButton from '../../../Utils/AppMenuButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AppMenuButtons = () => {
  const { appMenuBottomSheetRef, navigation } = useContext(LibraryContext);
  return (
    <View style={{ padding: 10, borderRadius: 10, backgroundColor: sectionBackgroundColor, marginBottom: 25 }}>
      <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
        <AppMenuButton
          backgroundColor={backgroundColorsTable['red1']}
          icon={<MaterialCommunityIcons name='image-plus' size={35} color={iconColorsTable['red1']} />}
          label='Post my assets'
          onAppMenuButtonPress={() => {
            navigation.navigate('Add assets');
            appMenuBottomSheetRef.current.snapToIndex(0);
          }}
        />
      </ScrollView>
    </View>
  );
};

export default AppMenuButtons;
