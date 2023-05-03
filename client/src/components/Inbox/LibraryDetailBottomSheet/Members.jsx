import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import InboxContext from '../InboxContext';
import {
  baseTextColor,
  backgroundColorsTable,
  iconColorsTable,
  screenSectionBackgroundColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
const { MaterialIcons, MaterialCommunityIcons } = iconsTable;

const Members = () => {
  const { selectedLibrary, navigation } = useContext(InboxContext);

  return (
    <TouchableOpacity
      style={{ padding: 5, borderRadius: 5, marginBottom: 5 }}
      onPress={() => navigation.navigate('Library members', { libraryId: selectedLibrary._id })}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: backgroundColorsTable['blue1'],
              padding: 5,
              borderRadius: 7,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <MaterialIcons name='groups' size={20} color={iconColorsTable['blue1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>Members</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => console.log('ko')}>
            <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Members;
