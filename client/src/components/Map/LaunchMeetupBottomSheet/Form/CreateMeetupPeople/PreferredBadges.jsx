import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { baseTextColor, iconColorsTable, backgroundColorsTable } from '../../../../../utils/colorsTable';

import SelectedBadges from './SelectedBadges/Badges';

const PreferredBadges = (props) => {
  // add badgesから帰ってきた時用。
  useEffect(() => {
    if (props.route.params?.preferredBadges) {
      console.log('this is the badge...', props.route.params.preferredBadges);
      props.dispatch({ type: 'SET_MEETUP_PREFERRED_BADGES', payload: props.route.params.preferredBadges });
    }
  }, [props.route.params?.preferredBadges]);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 13, color: baseTextColor, marginBottom: 10 }}>
        Which badges are preffered to have attendees for this meetup?
      </Text>
      {/* <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#9E9E9E', marginBottom: 10 }}>
        まあ、要はそんな人を探しているかってこと。what kind of person are you looking forよ。端的に書くと。
      </Text> */}
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}
        onPress={() =>
          props.navigation.navigate('Add badges', {
            fromComponent: 'Add meetup preferred badges',
            preferredBadges: props.state.preferredBadges,
          })
        }
      >
        <SimpleLineIcons name='magnifier-add' size={20} color={'black'} style={{ marginRight: 5 }} />
        <Text>Add</Text>
      </TouchableOpacity>
      <SelectedBadges preferredBadges={Object.values(props.state.preferredBadges)} />
    </View>
  );
};

export default PreferredBadges;
