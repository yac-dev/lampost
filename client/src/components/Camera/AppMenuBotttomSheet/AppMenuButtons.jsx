import React, { useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import CameraContext from '../CameraContext';
import { View, Text, ScrollView } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {
  iconColorsTable,
  backgroundColorsTable,
  sectionBackgroundColor,
  baseTextColor,
} from '../../../utils/colorsTable';
import AppMenuButton from '../../Utils/AppMenuButton';

const AppMenuButtons = (props) => {
  const { auth } = useContext(GlobalContext);
  const { appMenuBottomSheetRef, setCameraMode, cameraMode } = useContext(CameraContext);

  if (auth.data) {
    return (
      <View style={{ padding: 10, borderRadius: 10, backgroundColor: sectionBackgroundColor, marginBottom: 25 }}>
        <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
          <View>
            <AppMenuButton
              backgroundColor={backgroundColorsTable['red1']}
              icon={<Ionicons name='camera' size={35} color={iconColorsTable['red1']} />}
              label='Camera mode'
              onAppMenuButtonPress={() => {
                setCameraMode('photo');
                appMenuBottomSheetRef.current.snapToIndex(0);
              }}
            />
            {cameraMode === 'photo' ? (
              <View
                style={{
                  top: 5,
                  right: 5,
                  position: 'absolute',
                }}
              >
                <Ionicons name='checkmark-circle' size={20} color='#49CF13' />
              </View>
            ) : null}
          </View>
          <View>
            <AppMenuButton
              backgroundColor={backgroundColorsTable['blue1']}
              icon={<Ionicons name='videocam' size={35} color={iconColorsTable['blue1']} />}
              label='Video mode'
              onAppMenuButtonPress={() => {
                setCameraMode('video');
                appMenuBottomSheetRef.current.snapToIndex(0);
              }}
              isDisabled={true}
            />
            {cameraMode === 'video' ? (
              <View
                style={{
                  top: 5,
                  right: 5,
                  position: 'absolute',
                }}
              >
                <Ionicons name='checkmark-circle' size={20} color='#49CF13' />
              </View>
            ) : null}
          </View>
          <AppMenuButton
            backgroundColor={backgroundColorsTable['pink1']}
            icon={<Ionicons name='radio' size={35} color={iconColorsTable['pink1']} />}
            label='Start live'
            onAppMenuButtonPress={() => {
              setCameraMode('live');
              appMenuBottomSheetRef.current.snapToIndex(0);
            }}
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

export default AppMenuButtons;
