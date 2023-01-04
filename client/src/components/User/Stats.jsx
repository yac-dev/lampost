import React, { useContext } from 'react';
import UserContext from './UserContext';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { baseTextColor, iconColorsTable, sectionBackgroundColor } from '../../utils/colorsTable';
import Stat from './Stat';

const Stats = () => {
  const { navigation, user } = useContext(UserContext);

  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={{ paddingRight: 100 }}
      style={{ paddingTop: 20, paddingBottom: 20 }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {user.statsOverview.totalLaunched ? (
          <Stat
            icon={<MaterialCommunityIcons name='rocket-launch' color={'white'} size={25} style={{ marginRight: 10 }} />}
            backgroundColor={iconColorsTable['red1']}
            onStatPress={() => navigation.navigate('Launched')}
            total={user.statsOverview.totalLaunched}
            type='Launched'
          />
        ) : null}
        {user.statsOverview.totalLaunched ? (
          <Stat
            icon={<MaterialCommunityIcons name='fire' color={'white'} size={25} style={{ marginRight: 10 }} />}
            backgroundColor={iconColorsTable['orange1']}
            onStatPress={() =>
              navigation.navigate('Patrons', { user: { _id: user._id, name: user.name, photo: user.photo } })
            }
            total={user.statsOverview.totalPatrons}
            type='Patrons'
          />
        ) : null}
        {user.statsOverview.totalAssets ? (
          <Stat
            icon={<MaterialIcons name='camera-roll' color={'white'} size={25} style={{ marginRight: 10 }} />}
            backgroundColor={iconColorsTable['violet1']}
            onStatPress={() => navigation.navigate('Assets', { userId: user._id })}
            total={user.statsOverview.totalAssets}
            type='Assets'
          />
        ) : null}
        <Stat
          icon={<MaterialCommunityIcons name='history' color={'white'} size={25} style={{ marginRight: 10 }} />}
          backgroundColor={iconColorsTable['blue1']}
          onStatPress={() => null}
          total={user.statsOverview.totalFriends}
          type='Logs'
        />
        {/* <Stat
          icon={
            <MaterialCommunityIcons
              name='human-greeting-variant'
              color={'white'}
              size={25}
              style={{ marginRight: 10 }}
            />
          }
          backgroundColor={iconColorsTable['blue1']}
          onStatPress={() => null}
          total={user.statsOverview.totalFriends}
          type='Friends'
        /> */}
        {/* <Stat
        icon={<MaterialCommunityIcons name='history' color={'white'} size={20} />}
        backgroundColor={iconColorsTable['blue1']}
        onStatPress={() => null}
        total={user.statsOverview.totalLogs}
        type={'logs'}
      /> */}
        {/* <ScrollView horizontal={true} style={{ flexDirection: 'row' }}> */}
        {/* <Stat
          label='Launched'
          value={15}
          icon={
            <MaterialCommunityIcons name='rocket-launch' color={baseTextColor} size={25} style={{ marginRight: 5 }} />
          }
          onStatPress={() => null}
        />
        <Stat
          label='Assets'
          value={15}
          icon={<MaterialIcons name='camera-roll' color={baseTextColor} size={25} style={{ marginRight: 5 }} />}
          onStatPress={() => navigation.navigate('Assets', { userId: user._id })}
        /> */}
        {/* <Stat
          label='Logs'
          value={'15'}
          icon={<MaterialCommunityIcons name='history' color={baseTextColor} size={25} style={{ marginRight: 5 }} />}
          onStatPress={() => navigation.navigate('Logs', { userId: user._id })}
        /> */}
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
        {/* </ScrollView> */}

        {/* <TouchableOpacity
        style={{
          flexDirection: 'column',
          backgroundColor: 'rgb(57, 59, 64)',
          alignItems: 'center',
          padding: 10,
          marginRight: 10,
          borderRadius: 10,
        }}
      >
        <MaterialCommunityIcons name='rocket-launch' color={baseTextColor} size={20} style={{ marginBottom: 5 }} />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: 15 }}>
            <Text style={{ color: baseTextColor, fontWeight: 'bold' }}>Launched</Text>
            <Text style={{ color: baseTextColor }}>15</Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{ color: baseTextColor, fontWeight: 'bold' }}>Patrons</Text>
            <Text style={{ color: baseTextColor }}>150</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: 'column',
          backgroundColor: 'rgb(57, 59, 64)',
          alignItems: 'center',
          padding: 10,
          borderRadius: 10,
        }}
      >
        <MaterialIcons name='camera-roll' color={baseTextColor} size={20} style={{ marginBottom: 5 }} />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: 15 }}>
            <Text style={{ color: baseTextColor, fontWeight: 'bold' }}>Assets</Text>
            <Text style={{ color: baseTextColor }}>15</Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{ color: baseTextColor, fontWeight: 'bold' }}>Rewards</Text>
            <Text style={{ color: baseTextColor }}>150</Text>
          </View>
        </View>
      </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
};

export default Stats;
