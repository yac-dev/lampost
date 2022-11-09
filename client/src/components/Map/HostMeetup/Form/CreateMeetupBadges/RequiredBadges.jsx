import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { Foundation } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { iconColorsTable } from '../../../../../utils/colorsTable';

import SelectedBadges from './SelectedBadges/Badges';

const Badges = (props) => {
  useEffect(() => {
    if (props.route.params?.requiredBadges) {
      console.log('this is the badge...', props.route.params.requiredBadges);
      props.dispatch({ type: 'SET_MEETUP_REQUIRED_BADGES', payload: props.route.params.requiredBadges });
    }
  }, [props.route.params?.requiredBadges]);

  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <View
          style={{
            backgroundColor: iconColorsTable['lightGreen1'],
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
              <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Required badges (optional)</Text>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30 }}
                onPress={() => props.navigation.navigate('Add badges', { fromComponent: 'Add meetup required badges' })}
              >
                <SimpleLineIcons name='magnifier-add' size={20} color={'black'} style={{ marginRight: 5 }} />
                <Text>Add</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#9E9E9E' }}>
              Which badges should attendees have?
            </Text>
          </View>
        </View>
      </View>
      <SelectedBadges requiredBadges={Object.values(props.state.requiredBadges)} />
    </View>
  );
};

export default Badges;
