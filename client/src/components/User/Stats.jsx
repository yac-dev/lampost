import React, { useContext } from 'react';
import UserContext from './UserContext';
import { View, ScrollView, Text, TouchableOpacity, Platform } from 'react-native';
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
  const isIpad = Platform.OS === 'ios' && (Platform.isPad || Platform.isTVOS);

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {user.leadership.total ? (
          // leadershipがある人のみにこれをrenderする。
          <>
            <TouchableOpacity
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginRight: isIpad ? 30 : 15,
                backgroundColor: screenSectionBackgroundColor,
                padding: isIpad ? 20 : 10,
                borderRadius: 10,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                {/* <View style={{ backgroundColor: rnDefaultBackgroundColor, borderRadius: 10, marginRight: 10 }}> */}
                {/* <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 5,
                      backgroundColor: iconColorsTable['grey1'],
                      borderRadius: 10,
                    }}
                  > */}
                <MaterialCommunityIcons
                  name='fire'
                  color={'white'}
                  size={isIpad ? 35 : 25}
                  style={{ marginRight: isIpad ? 10 : 5 }}
                />
                {/* </View> */}
                {/* </View> */}
                <Text style={{ color: 'white', fontSize: isIpad ? 30 : 20 }}>{user.leadership.total}</Text>
              </View>
              <Text style={{ color: baseTextColor, fontSize: isIpad ? 30 : 20 }}>Leadership</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginRight: isIpad ? 30 : 15,
                backgroundColor: screenSectionBackgroundColor,
                padding: isIpad ? 20 : 10,
                borderRadius: 10,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                <MaterialIcons
                  name='groups'
                  size={isIpad ? 35 : 25}
                  color={'white'}
                  style={{ marginRight: isIpad ? 10 : 5 }}
                />
                <Text style={{ color: 'white', fontSize: isIpad ? 30 : 20 }}>{user.patrons}</Text>
              </View>
              <Text style={{ color: baseTextColor, fontSize: isIpad ? 30 : 20 }}>Patrons</Text>
            </TouchableOpacity>
          </>
        ) : null}

        <TouchableOpacity
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: isIpad ? 30 : 15,
            backgroundColor: screenSectionBackgroundColor,
            padding: isIpad ? 20 : 10,
            borderRadius: 10,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <MaterialCommunityIcons
              name='camera'
              color={'white'}
              size={isIpad ? 35 : 25}
              style={{ marginRight: isIpad ? 10 : 5 }}
            />
            <Text style={{ color: 'white', fontSize: isIpad ? 30 : 20 }}>{user.assets}</Text>
          </View>
          <Text style={{ color: baseTextColor, fontSize: isIpad ? 30 : 20 }}>Assets</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: isIpad ? 30 : 15,
            backgroundColor: screenSectionBackgroundColor,
            padding: isIpad ? 20 : 10,
            borderRadius: 10,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <MaterialCommunityIcons
              name='history'
              color={'white'}
              size={isIpad ? 35 : 25}
              style={{ marginRight: isIpad ? 10 : 5 }}
            />
            <Text style={{ color: 'white', fontSize: isIpad ? 30 : 20 }}>{user.logs}</Text>
          </View>
          <Text style={{ color: baseTextColor, fontSize: isIpad ? 30 : 20 }}>Logs</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Stats;
