import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { iconColorsTable } from '../../../../../utils/colorsTable';

import SelectedBadges from './SelectedBadges/Badges';

const WelcomeBadges = (props) => {
  useEffect(() => {
    if (props.route.params?.requiredBadges) {
      console.log('this is the badge...', props.route.params.requiredBadges);
      props.dispatch({ type: 'SET_MEETUP_REQUIRED_BADGES', payload: props.route.params.requiredBadges });
    }
  }, [props.route.params?.requiredBadges]);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#9E9E9E', flexShrink: 1 }}>
        What kind of people would be a good fit your meetup? Please select the badges which are related to this meetup.
      </Text>
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
      {/* <SelectedBadges /> */}
    </View>
  );
};

export default WelcomeBadges;
