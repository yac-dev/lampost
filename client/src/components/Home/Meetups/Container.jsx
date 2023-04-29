import React, { useContext } from 'react';
import GlobalContext from '../../../GlobalContext';
import { View, Text } from 'react-native';
import { screenSectionBackgroundColor } from '../../../utils/colorsTable';

const Container = () => {
  const { auth } = useContext(GlobalContext);
  return (
    <View style={{ padding: 10, marginBottom: 25 }}>
      <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>My upcoming meetups</Text>
      <View style={{ backgroundColor: screenSectionBackgroundColor, borderRadius: 10, padding: 15 }}>
        <Text style={{ textAlign: 'center', color: 'white' }}>
          You'll see all the meetups you've launched or joined.
        </Text>
      </View>
    </View>
  );
};

export default Container;
