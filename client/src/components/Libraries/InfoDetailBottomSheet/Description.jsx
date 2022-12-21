import React, { useContext } from 'react';
import LibrariesContext from '../LibrariesContext';
import { View, Text } from 'react-native';
import { baseTextColor } from '../../../utils/colorsTable';

const Description = () => {
  const { selectedLibrary } = useContext(LibrariesContext);
  return (
    <View>
      <View style={{ marginBottom: 25 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10, color: 'white' }}>Description</Text>
        <Text style={{ color: baseTextColor }}>{selectedLibrary.description}</Text>
      </View>
    </View>
  );
};

export default Description;
