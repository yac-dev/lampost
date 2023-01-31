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
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {user.leadership.total ? (
          // leadershipがある人のみにこれをrenderする。
          <>
            <TouchableOpacity
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginRight: 20,
                backgroundColor: screenSectionBackgroundColor,
                padding: 20,
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
                <MaterialCommunityIcons name='fire' color={'white'} size={40} style={{ marginRight: 5 }} />
                {/* </View> */}
                {/* </View> */}
                <Text style={{ color: 'white', fontSize: 40 }}>{user.leadership.total}</Text>
              </View>
              <Text style={{ color: baseTextColor, fontSize: 40 }}>Leadership</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginRight: 20,
                backgroundColor: screenSectionBackgroundColor,
                padding: 20,
                borderRadius: 10,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                <MaterialIcons name='groups' size={40} color={'white'} style={{ marginRight: 5 }} />
                <Text style={{ color: 'white', fontSize: 40 }}>{user.patrons}</Text>
              </View>
              <Text style={{ color: baseTextColor, fontSize: 40 }}>Patrons</Text>
            </TouchableOpacity>
          </>
        ) : null}

        <TouchableOpacity
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: 20,
            backgroundColor: screenSectionBackgroundColor,
            padding: 20,
            borderRadius: 10,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <MaterialCommunityIcons name='camera' color={'white'} size={40} style={{ marginRight: 5 }} />
            <Text style={{ color: 'white', fontSize: 40 }}>{user.assets}</Text>
          </View>
          <Text style={{ color: baseTextColor, fontSize: 40 }}>Assets</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: 20,
            backgroundColor: screenSectionBackgroundColor,
            padding: 20,
            borderRadius: 10,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <MaterialCommunityIcons name='history' color={'white'} size={40} style={{ marginRight: 5 }} />
            <Text style={{ color: 'white', fontSize: 40 }}>{user.logs}</Text>
          </View>
          <Text style={{ color: baseTextColor, fontSize: 40 }}>Logs</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Stats;
