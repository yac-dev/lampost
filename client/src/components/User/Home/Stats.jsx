import React, { useContext } from 'react';
import UserContext from '../Context';
import { View, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { baseTextColor } from '../../../utils/colorsTable';
import Stat from './Stat';

const Stats = () => {
  const { navigation, user } = useContext(UserContext);

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
          marginBottom: 25,
        }}
      >
        <Stat
          label='Log'
          value={15}
          icon={<MaterialCommunityIcons name='history' color={baseTextColor} size={25} style={{ marginRight: 10 }} />}
          onStatPress={() => navigation.navigate('Log', { userId: user._id })}
        />
        <Stat
          label='Assets'
          value={15}
          icon={
            <MaterialCommunityIcons name='treasure-chest' color={baseTextColor} size={25} style={{ marginRight: 10 }} />
          }
          onStatPress={() => navigation.navigate('Assets', { userId: user._id })}
        />
        <Stat
          label='Connections'
          value={15}
          icon={<Entypo name='network' color={baseTextColor} size={25} style={{ marginRight: 10 }} />}
          onStatPress={() => console.log('opening logs page')}
        />
        {/* <Stat
          label='Supports'
          value={15}
          icon={<MaterialCommunityIcons name='fire' color={baseTextColor} size={25} style={{ marginRight: 10 }} />}
          onStatPress={() => console.log('opening logs page')}
        />
        <Stat
          label='Libraries'
          value={15}
          icon={<Ionicons name='ios-library' color={baseTextColor} size={25} style={{ marginRight: 10 }} />}
          onStatPress={() => console.log('opening logs page')}
        /> */}
      </ScrollView>
    </View>
  );
};

export default Stats;
