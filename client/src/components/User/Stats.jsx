import React, { useContext } from 'react';
import UserContext from './UserContext';
import { View, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { baseTextColor } from '../../utils/colorsTable';
import Stat from './Stat';

const Stats = () => {
  const { navigation, user } = useContext(UserContext);

  return (
    <View>
      <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
        <Stat
          label='Logs'
          value={15}
          icon={<MaterialCommunityIcons name='history' color={baseTextColor} size={25} style={{ marginRight: 5 }} />}
          onStatPress={() => navigation.navigate('Logs', { userId: user._id })}
        />
        <Stat
          label='Assets'
          value={15}
          icon={<Ionicons name='ios-camera' color={baseTextColor} size={25} style={{ marginRight: 5 }} />}
          onStatPress={() => navigation.navigate('Assets', { userId: user._id })}
        />
        <Stat
          label='Connections'
          value={'-'}
          icon={<Entypo name='network' color={baseTextColor} size={25} style={{ marginRight: 5 }} />}
          onStatPress={() => null}
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
