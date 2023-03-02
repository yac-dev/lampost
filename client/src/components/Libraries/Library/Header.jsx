import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import LibraryContext from './LibraryContext';
import { Ionicons } from '@expo/vector-icons';
import { rnDefaultBackgroundColor, backgroundColorsTable, iconColorsTable } from '../../../utils/colorsTable';

const Header = () => {
  const { library } = useContext(LibraryContext);

  if (library) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 5,
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>{library.name}</Text>
      </View>
    );
  } else {
    return <Text>Now loading...</Text>;
  }
};

export default Header;
