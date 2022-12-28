import React, { useContext } from 'react';
import UserContext from './UserContext';
import { View, Text, Image } from 'react-native';

const SelectedProfileImage = () => {
  const { isMyPage, selectedProfileImage } = useContext(UserContext);

  if (selectedProfileImage) {
    return (
      <View>
        <Image source={{ uri: selectedProfileImage }} style={{ width: 45, height: 45 }} />
        <Text style={{ color: 'red' }}>Hello</Text>
      </View>
    );
  } else {
    return null;
  }
};

export default SelectedProfileImage;
