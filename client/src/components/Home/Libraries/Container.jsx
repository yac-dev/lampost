import React from 'react';
import { View, Text } from 'react-native';
import { screenSectionBackgroundColor } from '../../../utils/colorsTable';

const Container = () => {
  return (
    <View style={{ padding: 10, marginBottom: 25 }}>
      <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>My Libraries</Text>
      <View style={{ backgroundColor: screenSectionBackgroundColor, borderRadius: 10, padding: 15 }}>
        <Text style={{ textAlign: 'center', color: 'white' }}>
          You'll see all libraries you've created or joined.{'\n'}
        </Text>
      </View>
    </View>
  );
};

export default Container;
