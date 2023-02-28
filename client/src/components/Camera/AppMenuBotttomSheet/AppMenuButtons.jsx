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
  const {
    appMenuBottomSheetRef,
    setCameraMode,
    cameraMode,
    cameraType,
    CameraType,
    cameraModeBottomSheetRef,
    timeMachineBottomSheetRef,
    flipBottomSheetRef,
  } = useContext(CameraContext);

  const renderCameraMode = () => {
    if (cameraMode === 'photo') {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: baseTextColor }}>Photo</Text>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
        </View>
      );
    } else if (cameraMode === 'video') {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: baseTextColor }}>Video</Text>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
        </View>
      );
    }
  };
  // cameraType
  const renderFlipType = () => {
    if (CameraType.back) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: baseTextColor }}>Normal</Text>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
        </View>
      );
    } else if (CameraType.front) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: baseTextColor }}>Selfie</Text>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
        </View>
      );
    }
  };

  if (auth.data) {
    return (
      <View style={{ marginBottom: 10 }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            cameraModeBottomSheetRef.current.snapToIndex(0);
            appMenuBottomSheetRef.current.close();
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 35,
                height: 35,
                backgroundColor: backgroundColorsTable['yellow1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginRight: 10,
              }}
            >
              <Ionicons name='videocam' size={20} color={iconColorsTable['yellow1']} />
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Camera mode</Text>
          </View>
          {renderCameraMode()}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            setCameraMode('photo');
            flipBottomSheetRef.current.snapToIndex(0);
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 35,
                height: 35,
                backgroundColor: backgroundColorsTable['grey1'],
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginRight: 10,
              }}
            >
              <MaterialCommunityIcons name='camera-flip' size={20} color={iconColorsTable['grey1']} />
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Flip</Text>
          </View>
          {renderFlipType()}
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
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}
          onPress={() => {
            timeMachineBottomSheetRef.current.snapToIndex(0);
            appMenuBottomSheetRef.current.close();
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
              <MaterialCommunityIcons name='history' size={20} color={iconColorsTable['blue1']} />
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Time machine</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
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
