import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { iconColorsTable } from '../../../../../utils/colorsTable';
import { iconsTable } from '../../../../../utils/icons';

const ActionButtons = (props) => {
  const { Ionicons, MaterialCommunityIcons } = iconsTable;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
      <TouchableOpacity
        style={{
          paddingRight: 2,
          paddingBottom: 5,
          paddingTop: 5,
          flex: 0.5,
        }}
        // onPress={() => props.navigation.navigate('Attended', { meetupId: meetup._id, launcher: meetup.launcher._id })}
      >
        <View style={{ backgroundColor: iconColorsTable['blue1'], width: '100%', padding: 5, borderRadius: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
            <Ionicons name='camera' size={20} color={'white'} style={{ marginRight: 10 }} />
            <Text style={{ color: 'white' }}>Moments</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingLeft: 2,
          paddingBottom: 5,
          paddingTop: 5,
          flex: 0.5,
        }}
        // onPress={() =>
        //   props.navigation.navigate('Impressions', { meetupId: meetup._id, launcher: meetup.launcher._id })
        // }
      >
        <View style={{ backgroundColor: iconColorsTable['blue1'], borderRadius: 5, width: '100%', padding: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
            <MaterialCommunityIcons name='account-group' size={20} color={'white'} style={{ marginRight: 10 }} />
            <Text style={{ color: 'white' }}>Members</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ActionButtons;
