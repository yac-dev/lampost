import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import CameraContext from './CameraContext';
import { appBottomSheetBackgroundColor } from '../../utils/colorsTable';
import { iconsTable } from '../../utils/icons';
const { MaterialIcons } = iconsTable;

const Timer = () => {
  const { cameraMode, duration, videoLength } = useContext(CameraContext);
  if (cameraMode === 'video') {
    const rest = videoLength - duration;
    return (
      <View
        style={{
          backgroundColor: appBottomSheetBackgroundColor,
          position: 'absolute',
          top: 20,
          alignSelf: 'center',
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 10,
        }}
      >
        <MaterialIcons name='hourglass-top' size={25} color='white' />
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{rest}</Text>
      </View>
    );
  } else {
    return null;
  }
};

export default Timer;
