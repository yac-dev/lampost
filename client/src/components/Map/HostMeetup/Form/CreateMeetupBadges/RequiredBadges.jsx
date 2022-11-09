import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { Foundation } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { iconColorsTable } from '../../../../../utils/colorsTable';

import SelectedBadges from './SelectedBadges/Badges';

const RequiredBadges = (props) => {
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
          <View style={{ marginLeft: 15, flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 17, marginRight: 5 }}>Required badges</Text>
              <Text style={{ fontSize: 13, color: '#9E9E9E' }}>(optional)</Text>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}
                onPress={() =>
                  props.navigation.navigate('Add badges', {
                    fromComponent: 'Add meetup required badges',
                    badges: props.state.requiredBadges,
                  })
                }
              >
                <SimpleLineIcons name='magnifier-add' size={20} color={'black'} style={{ marginRight: 5 }} />
                <Text>Add</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#9E9E9E', flexShrink: 1 }}>
              Which badges should attendees have?
            </Text>
          </View>
        </View>
      </View>

      <SelectedBadges requiredBadges={Object.values(props.state.requiredBadges)} />
    </View>
  );
};

export default RequiredBadges;
