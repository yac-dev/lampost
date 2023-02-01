import React, { useContext } from 'react';
import CameraContext from '../../CameraContext';
import { View, Text } from 'react-native';
import AddPhotoEffectMenu from './AddPhotoEffectMenu';
import AddVideoEffectMenu from './AddVideoEffectMenu';

const AddAssetEffectContainer = () => {
  const { cameraMode } = useContext(CameraContext);

  switch (cameraMode) {
    case 'photo':
      return <AddPhotoEffectMenu />;
    case 'video':
      return <AddVideoEffectMenu />;
  }
};

export default AddAssetEffectContainer;
