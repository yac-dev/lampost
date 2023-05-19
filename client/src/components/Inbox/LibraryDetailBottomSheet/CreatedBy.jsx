import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GlobalContext from '../../../GlobalContext';
import InboxContext from '../InboxContext';
import {
  baseTextColor,
  backgroundColorsTable,
  iconColorsTable,
  screenSectionBackgroundColor,
} from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
const { MaterialIcons, MaterialCommunityIcons } = iconsTable;

const CreatedBy = () => {
  const { auth } = useContext(GlobalContext);
  const { selectedLibrary, navigation } = useContext(InboxContext);

  return (
    <TouchableOpacity
      onPress={() => {
        if (!auth.data || auth.data._id !== selectedLibrary.launcher._id) {
          navigation.navigate('User', { userId: selectedLibrary.launcher._id });
        }
      }}
      style={{ padding: 5, borderRadius: 5, marginBottom: 5 }}
      disabled={selectedLibrary.launcher ? false : true}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: backgroundColorsTable['red1'],
              padding: 5,
              borderRadius: 7,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <MaterialCommunityIcons name='hammer-wrench' size={25} color={iconColorsTable['red1']} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>Created by</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text numberOfLines={1} style={{ color: baseTextColor, fontSize: 15 }}>
            {selectedLibrary.launcher ? selectedLibrary.launcher.name : 'This account was deleted...'}
          </Text>
          <MaterialCommunityIcons name='chevron-right' color={baseTextColor} size={25} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CreatedBy;
