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
  backgroundColorsTable,
} from '../../utils/colorsTable';
import Stat from './Stat';

const Stats = () => {
  const { navigation, user } = useContext(UserContext);

  return (
    <ScrollView horizontal={true}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {user.leadership.total ? (
          // leadershipがある人のみにこれをrenderする。
          <>
            <TouchableOpacity
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginRight: 15,
                backgroundColor: screenSectionBackgroundColor,
                padding: 7,
                borderRadius: 10,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                <View style={{ backgroundColor: rnDefaultBackgroundColor, borderRadius: 10, marginRight: 10 }}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 5,
                      backgroundColor: iconColorsTable['red1'],
                      borderRadius: 10,
                    }}
                  >
                    <MaterialCommunityIcons name='fire' color={'white'} size={25} />
                  </View>
                </View>
                <Text style={{ color: 'white', fontSize: 20 }}>{user.leadership.total}</Text>
              </View>
              <Text style={{ color: baseTextColor, fontSize: 17 }}>Leadership</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginRight: 15,
                backgroundColor: screenSectionBackgroundColor,
                padding: 7,
                borderRadius: 10,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                <View style={{ backgroundColor: rnDefaultBackgroundColor, borderRadius: 10, marginRight: 10 }}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 5,
                      backgroundColor: iconColorsTable['orange1'],
                      borderRadius: 10,
                    }}
                  >
                    <MaterialIcons name='groups' size={25} color={'white'} />
                  </View>
                </View>
                <Text style={{ color: 'white', fontSize: 20 }}>{user.patrons}</Text>
              </View>
              <Text style={{ color: baseTextColor, fontSize: 17 }}>Patrons</Text>
            </TouchableOpacity>
          </>
        ) : null}

        <TouchableOpacity
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: 15,
            backgroundColor: screenSectionBackgroundColor,
            padding: 7,
            borderRadius: 10,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <View style={{ backgroundColor: rnDefaultBackgroundColor, borderRadius: 10, marginRight: 10 }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 5,
                  backgroundColor: iconColorsTable['grey1'],
                  borderRadius: 10,
                }}
              >
                <MaterialCommunityIcons name='camera' color={'white'} size={25} />
              </View>
            </View>
            <Text style={{ color: 'white', fontSize: 20 }}>{user.assets}</Text>
          </View>
          <Text style={{ color: baseTextColor, fontSize: 17 }}>Assets</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: 15,
            backgroundColor: screenSectionBackgroundColor,
            padding: 7,
            borderRadius: 10,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <View style={{ backgroundColor: rnDefaultBackgroundColor, borderRadius: 10, marginRight: 10 }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 5,
                  backgroundColor: iconColorsTable['blue1'],
                  borderRadius: 10,
                }}
              >
                <MaterialCommunityIcons name='history' color={'white'} size={25} />
              </View>
            </View>
            <Text style={{ color: 'white', fontSize: 20 }}>{user.logs}</Text>
          </View>
          <Text style={{ color: baseTextColor, fontSize: 17 }}>Logs</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Stats;
