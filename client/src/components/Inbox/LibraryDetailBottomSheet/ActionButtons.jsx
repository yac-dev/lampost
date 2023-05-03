import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { iconColorsTable } from '../../../utils/colorsTable';
import { iconsTable } from '../../../utils/icons';
const { MaterialCommunityIcons, MaterialIcons } = iconsTable;

const ActionButtons = () => {
  return (
    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
      <View style={{ flex: 0.5, paddingRight: 5 }}>
        <TouchableOpacity
          style={{ width: '100%', backgroundColor: iconColorsTable['blue1'], padding: 7, borderRadius: 5 }}
        >
          <View style={{ alignSelf: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons
                name='human-greeting-variant'
                size={20}
                color={'white'}
                style={{ marginRight: 10 }}
              />
              <Text style={{ color: 'white' }}>Join this library</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 0.5, paddingLeft: 5 }}>
        <TouchableOpacity
          style={{ width: '100%', backgroundColor: iconColorsTable['blue1'], padding: 7, borderRadius: 5 }}
        >
          <View style={{ alignSelf: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name='report-problem' size={20} color={'white'} style={{ marginRight: 10 }} />
              <Text style={{ color: 'white' }}>Report</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ActionButtons;
