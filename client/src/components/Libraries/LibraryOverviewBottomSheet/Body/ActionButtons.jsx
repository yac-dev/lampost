import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LibrariesContext from '../../LibrariesContext';

const ActionButtons = () => {
  const { selectedLibrary } = useContext(LibrariesContext);

  return (
    <TouchableOpacity
      style={{ padding: 15, marginBottom: 15 }}
      onPress={() => console.log('joining', selectedLibrary._id)}
    >
      <Text style={{ textAlign: 'center' }}>Join this library</Text>
    </TouchableOpacity>
  );
};

export default ActionButtons;
