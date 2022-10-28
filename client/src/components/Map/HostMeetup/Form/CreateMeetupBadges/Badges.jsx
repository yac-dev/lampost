import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { Foundation } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import SelectedBadges from './SelectedBadges/Badges';

const Badges = (props) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <View
          style={{
            backgroundColor: 'rgba(45, 209, 40, 0.85)',
            padding: 5,
            borderRadius: 7,
            width: 35,
            height: 35,
            alignItems: 'center',
          }}
        >
          <Foundation name='sheriff-badge' size={25} color='white' />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginLeft: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Badges</Text>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30 }}
                onPress={() => props.navigation.navigate('Add badges', { fromComponent: 'Add meetup badges' })}
              >
                <SimpleLineIcons name='magnifier-add' size={20} color={'black'} style={{ marginRight: 5 }} />
                <Text>Add</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#9E9E9E' }}>
              What kind of meetup you'll launch?
            </Text>
          </View>
        </View>
      </View>
      <SelectedBadges />
    </View>
  );
};

export default Badges;
