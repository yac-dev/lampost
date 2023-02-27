import React, { useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import CameraContext from '../CameraContext';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
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
      <View style={{ marginBottom: 10 }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            setCameraMode('photo');
            appMenuBottomSheetRef.current.snapToIndex(0);
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
              <Ionicons name='camera' size={20} color={iconColorsTable['red1']} />
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Photo mode</Text>
          </View>
          {cameraMode === 'photo' ? (
            <Ionicons name='checkmark-circle' color={iconColorsTable['green1']} size={25} />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            setCameraMode('video');
            appMenuBottomSheetRef.current.snapToIndex(0);
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 35,
                height: 35,
                backgroundColor: backgroundColorsTable['blue1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginRight: 10,
              }}
            >
              <Ionicons name='videocam' size={20} color={iconColorsTable['blue1']} />
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Video mode</Text>
          </View>
          {cameraMode === 'video' ? (
            <Ionicons name='checkmark-circle' color={iconColorsTable['green1']} size={25} />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          disabled={true}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 35,
                height: 35,
                backgroundColor: backgroundColorsTable['pink1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginRight: 10,
              }}
            >
              <Ionicons name='radio' size={20} color={iconColorsTable['pink1']} />
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Start live</Text>
          </View>
          <Foundation name='prohibited' color={iconColorsTable['red1']} size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          disabled={true}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 35,
                height: 35,
                backgroundColor: backgroundColorsTable['green1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginRight: 10,
              }}
            >
              <Ionicons name='ios-pricetags' size={20} color={iconColorsTable['green1']} />
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Tag people</Text>
          </View>
          <MaterialCommunityIcons name='chevron-down' color={baseTextColor} size={25} />
        </TouchableOpacity>
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
