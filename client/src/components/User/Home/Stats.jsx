import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  baseTextColor,
  rnDefaultBackgroundColor,
  iconColorsTable,
  backgroundColorsTable,
  sectionBackgroundColor,
} from '../../../utils/colorsTable';
import Stat from './Stat';

const Stats = () => {
  return (
    <View>
      <ScrollView
        horizontal={true}
        style={{
          flexDirection: 'row',
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 10,
          paddingBottom: 10,
          // backgroundColor: 'red',
          marginBottom: 25,
        }}
      >
        <Stat
          label='Logs'
          value={15}
          icon={<MaterialCommunityIcons name='history' color={baseTextColor} size={25} style={{ marginRight: 10 }} />}
          onStatPress={() => console.log('opening logs page')}
        />
        <Stat
          label='Assets'
          value={15}
          icon={<MaterialCommunityIcons name='history' color={baseTextColor} size={25} style={{ marginRight: 10 }} />}
          onStatPress={() => console.log('opening logs page')}
        />
        <Stat
          label='Subs'
          value={15}
          icon={<SimpleLineIcons name='user-follow' color={baseTextColor} size={25} style={{ marginRight: 10 }} />}
          onStatPress={() => console.log('opening logs page')}
        />
        <Stat
          label='Libraries'
          value={15}
          icon={<Ionicons name='ios-library' color={baseTextColor} size={25} style={{ marginRight: 10 }} />}
          onStatPress={() => console.log('opening logs page')}
        />
      </ScrollView>
    </View>
  );
};

export default Stats;
