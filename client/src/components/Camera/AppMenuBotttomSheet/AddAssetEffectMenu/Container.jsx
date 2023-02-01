import React, { useContext } from 'react';
import CameraContext from '../../CameraContext';
import { View, Text } from 'react-native';
import AddPhotoEffectMenu from './AddPhotoEffectMenu';
import AddVideoEffectMenu from './AddVideoEffectMenu';

const AddAssetEffectContainer = () => {
  const { cameraMode } = useContext(CameraContext);

  const switchEffectMenu = () => {
    switch (cameraMode) {
      case 'photo':
        return <AddPhotoEffectMenu />;
      case 'video':
        return <AddVideoEffectMenu />;
    }
  };

  return (
    <View>
      <Text
        style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}
      >{`Add ${cameraMode} effect`}</Text>
      {switchEffectMenu()}
    </View>
  );
};

export default AddAssetEffectContainer;
