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
          marginBottom: 15,
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 20,
        }}
      >
        <View
          style={{
            backgroundColor: rnDefaultBackgroundColor,
            width: 50,
            height: 50,
            borderRadius: 15,
            marginRight: 10,
          }}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: backgroundColorsTable[library.color],
              borderRadius: 15,
            }}
          >
            <Ionicons name='ios-library' size={30} color={iconColorsTable[library.color]} />
          </View>
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>{library.name}</Text>
      </View>
    );
  } else {
    return <Text>Now loading...</Text>;
  }
};

export default Header;
