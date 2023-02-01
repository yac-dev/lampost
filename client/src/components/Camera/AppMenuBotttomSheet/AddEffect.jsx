import React, { useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import CameraContext from '../CameraContext';
import { View, Text, ScrollView } from 'react-native';
import AppMenuButton from '../../Utils/AppMenuButton';
import {
  iconColorsTable,
  backgroundColorsTable,
  sectionBackgroundColor,
  baseTextColor,
} from '../../../utils/colorsTable';
import { Ionicons } from '@expo/vector-icons';

const AddEffect = () => {
  const { auth } = useContext(GlobalContext);
  const { appMenuBottomSheetRef, photoEffect, setPhotoEffect } = useContext(CameraContext);

  if (auth.data) {
    return (
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', marginBottom: 20 }}>Photo effect</Text>
        <View style={{ padding: 10, borderRadius: 10, backgroundColor: sectionBackgroundColor, marginBottom: 25 }}>
          <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
            <AppMenuButton
              backgroundColor={backgroundColorsTable['red1']}
              icon={<Ionicons name='videocam' size={35} color={iconColorsTable['red1']} />}
              label='Normal'
              onAppMenuButtonPress={() => {
                null;
              }}
            />
            <AppMenuButton
              backgroundColor={backgroundColorsTable['red1']}
              icon={<Ionicons name='videocam' size={35} color={iconColorsTable['red1']} />}
              label="1970's vintage"
              onAppMenuButtonPress={() => {
                null;
              }}
            />
            <AppMenuButton
              backgroundColor={backgroundColorsTable['blue1']}
              icon={<Ionicons name='videocam' size={35} color={iconColorsTable['blue1']} />}
              label="1980's vintage"
              onAppMenuButtonPress={() => {
                setCameraMode('video');
                appMenuBottomSheetRef.current.snapToIndex(0);
              }}
              isDisabled={true}
            />
            <AppMenuButton
              backgroundColor={backgroundColorsTable['pink1']}
              icon={<Ionicons name='videocam' size={35} color={iconColorsTable['pink1']} />}
              label="1990's vintage"
              onAppMenuButtonPress={() => {
                setCameraMode('live');
                appMenuBottomSheetRef.current.snapToIndex(0);
              }}
              isDisabled={true}
            />
          </ScrollView>
        </View>
      </View>
    );
  } else {
    return null;
  }
};

export default AddEffect;
