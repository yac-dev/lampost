import React, { useContext } from 'react';
import UserContext from './UserContext';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {
  baseTextColor,
  iconColorsTable,
  sectionBackgroundColor,
  screenSectionBackgroundColor,
  rnDefaultBackgroundColor,
} from '../../utils/colorsTable';
import Stat from './Stat';

const Stats = () => {
  const { navigation, user } = useContext(UserContext);

  return (
    <View style={{ flexDirection: 'column' }}>
      {user.leadership.total ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: screenSectionBackgroundColor,
            marginBottom: 10,
            padding: 5,
            borderRadius: 10,
          }}
        >
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontSize: 17 }}>Leadership</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name='fire' color={baseTextColor} size={20} style={{ marginRight: 5 }} />
                <Text style={{ color: baseTextColor, fontSize: 20 }}>256</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontSize: 17 }}>Patrons</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name='groups' size={20} color={baseTextColor} style={{ marginRight: 5 }} />
                <Text style={{ color: baseTextColor, fontSize: 20 }}>453</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: screenSectionBackgroundColor,
          padding: 5,
          borderRadius: 10,
        }}
      >
        <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: 15 }}>
          <TouchableOpacity
            style={{
              backgroundColor: rnDefaultBackgroundColor,
              borderRadius: 10,
              marginBottom: 5,
            }}
            onPress={() => null}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: iconColorsTable['blue1'],
                borderRadius: 10,
                padding: 10,
              }}
            >
              <MaterialCommunityIcons name='history' color={'white'} size={25} />
            </View>
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 12 }}>Logs</Text>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: 15 }}>
          <TouchableOpacity
            style={{
              backgroundColor: rnDefaultBackgroundColor,
              borderRadius: 10,
              marginBottom: 5,
            }}
            onPress={() => null}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: iconColorsTable['grey1'],
                borderRadius: 10,
                padding: 10,
              }}
            >
              <MaterialCommunityIcons name='camera' color={'white'} size={25} />
            </View>
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 12 }}>Assets</Text>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: 15 }}>
          <TouchableOpacity
            style={{
              backgroundColor: rnDefaultBackgroundColor,
              borderRadius: 10,
              marginBottom: 5,
            }}
            onPress={() => null}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: iconColorsTable['pink1'],
                borderRadius: 10,
                padding: 10,
              }}
            >
              <MaterialCommunityIcons name='human-greeting-variant' color={'white'} size={25} />
            </View>
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 12 }}>Friends</Text>
        </View>
      </View>
    </View>
    // <ScrollView
    //   horizontal={true}
    //   contentContainerStyle={{ paddingRight: 100 }}
    //   style={{ paddingTop: 20, paddingBottom: 20 }}
    // >
    //   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //     {user.statsOverview.totalLaunched ? (
    //       <Stat
    //         icon={<MaterialCommunityIcons name='rocket-launch' color={'white'} size={25} style={{ marginRight: 10 }} />}
    //         backgroundColor={iconColorsTable['red1']}
    //         onStatPress={() => navigation.navigate('Launched', { user: { _id: user._id } })}
    //         total={user.statsOverview.totalLaunched}
    //         type='Launched'
    //       />
    //     ) : null}
    //     {user.statsOverview.totalLaunched ? (
    //       <Stat
    //         icon={<MaterialCommunityIcons name='fire' color={'white'} size={25} style={{ marginRight: 10 }} />}
    //         backgroundColor={iconColorsTable['orange1']}
    //         onStatPress={() =>
    //           navigation.navigate('Patrons', { user: { _id: user._id, name: user.name, photo: user.photo } })
    //         }
    //         total={user.statsOverview.totalPatrons}
    //         type='Patrons'
    //       />
    //     ) : null}
    //     {user.statsOverview.totalAssets ? (
    //       <Stat
    //         icon={<Ionicons name='ios-camera' color={'white'} size={25} style={{ marginRight: 10 }} />}
    //         backgroundColor={iconColorsTable['grey1']}
    //         onStatPress={() => navigation.navigate('Assets', { userId: user._id })}
    //         total={user.statsOverview.totalAssets}
    //         type='Assets'
    //       />
    //     ) : null}
    //     <Stat
    //       icon={<MaterialCommunityIcons name='history' color={'white'} size={25} style={{ marginRight: 10 }} />}
    //       backgroundColor={iconColorsTable['blue1']}
    //       onStatPress={() => null}
    //       total={user.statsOverview.totalFriends}
    //       type='Logs'
    //     />
    //   </View>
    // </ScrollView>
  );
};

export default Stats;
