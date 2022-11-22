import React from 'react';
import { View, Text } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { iconColorsTable, backgroundColorsTable } from '../../../../utils/colorsTable';

const RollBadges = (props) => {
  return (
    <View style={{ marginBottom: 15 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
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
        <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 15 }}>Badges</Text>
      </View>
      <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'black', marginBottom: 10 }}>
        What kind of photos are gonna gather in this library
      </Text>
    </View>
  );
};

export default RollBadges;
