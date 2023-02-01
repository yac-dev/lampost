import React, { useContext } from 'react';
import CameraContext from '../../CameraContext';
import { View, Text, ScrollView } from 'react-native';
import AppMenuButton from '../../../Utils/AppMenuButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { backgroundColorsTable, iconColorsTable, sectionBackgroundColor } from '../../../../utils/colorsTable';

const AddPhotoEffectMenu = () => {
  const { setPhotoEffect } = useContext(CameraContext);

  return (
    <View style={{ padding: 10, borderRadius: 10, backgroundColor: sectionBackgroundColor, marginBottom: 25 }}>
      <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
        <AppMenuButton
          backgroundColor={backgroundColorsTable['red1']}
          icon={<Ionicons name='camera' size={35} color={iconColorsTable['red1']} />}
          label='Normal'
          onAppMenuButtonPress={() => {
            setPhotoEffect('auto');
          }}
        />
        <AppMenuButton
          backgroundColor={backgroundColorsTable['blue1']}
          icon={<Ionicons name='cloudy-night-sharp' size={35} color={iconColorsTable['blue1']} />}
          label='Cloudy'
          onAppMenuButtonPress={() => {
            setPhotoEffect('cloudy');
          }}
        />
        <AppMenuButton
          backgroundColor={backgroundColorsTable['green1']}
          icon={
            <MaterialCommunityIcons name='lightbulb-fluorescent-tube' size={35} color={iconColorsTable['green1']} />
          }
          label='Fluorescent'
          onAppMenuButtonPress={() => {
            setPhotoEffect('fluorescent');
          }}
        />
        <AppMenuButton
          backgroundColor={backgroundColorsTable['yellow1']}
          icon={<MaterialCommunityIcons name='lightbulb-multiple' size={35} color={iconColorsTable['yellow1']} />}
          label='Incandescent'
          onAppMenuButtonPress={() => {
            setPhotoEffect('incandescent');
          }}
        />
        <AppMenuButton
          backgroundColor={backgroundColorsTable['black1']}
          icon={<MaterialCommunityIcons name='ghost' size={35} color={iconColorsTable['black1']} />}
          label='Shadow'
          onAppMenuButtonPress={() => {
            setPhotoEffect('shadow');
          }}
        />
        <AppMenuButton
          backgroundColor={backgroundColorsTable['orange1']}
          icon={<Ionicons name='sunny' size={35} color={iconColorsTable['orange1']} />}
          label='Sunny'
          onAppMenuButtonPress={() => {
            setPhotoEffect('sunny');
          }}
        />
      </ScrollView>
    </View>
  );
};

export default AddPhotoEffectMenu;
