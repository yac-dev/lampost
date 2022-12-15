import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import LibraryContext from './LibraryContext';
import { baseTextColor } from '../../../utils/colorsTable';

const Description = () => {
  const { library } = useContext(LibraryContext);
  if (library) {
    return (
      <View style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 25 }}>
        <Text style={{ color: baseTextColor, marginBottom: 10 }}>{library.description}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
          <View style={{ width: 40, height: 40, backgroundColor: 'red', marginRight: 10, borderRadius: 10 }}></View>
          <Text style={{ color: baseTextColor }}>{library.launcher.name}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
};

export default Description;
