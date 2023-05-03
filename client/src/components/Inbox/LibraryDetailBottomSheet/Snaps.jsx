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
      onPress={() => navigation.navigate('Library snaps', { libraryId: selectedLibrary._id })}
      style={{ padding: 5, borderRadius: 5, marginBottom: 5 }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: backgroundColorsTable['orange1'],
              padding: 5,
              borderRadius: 7,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <MaterialIcons name='camera-roll' size={20} color={iconColorsTable['orange1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>Snaps</Text>
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
