import React, { useContext } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import LaunchedMeetupContext from './LaunchedMeetup';
import {
  iconColorsTable,
  baseTextColor,
  screenSectionBackgroundColor,
  inputBackgroundColor,
} from '../../../../utils/colorsTable';
import { FontAwesome5 } from '@expo/vector-icons';

const Crew = () => {
  const { attendees } = useContext(LaunchedMeetupContext);

  const renderCrew = () => {
    if (attendees.length) {
      const crewList = attendees.map((user, index) => {
        return (
          <View
            key={index}
            style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
            // onPress={() => {
            //   if (!auth.data || auth.data._id !== user._id) {
            //     navigation.navigate('User', { userId: user._id });
            //   }
            // }}
          >
            {user.photo ? (
              <Image source={{ uri: user.photo }} style={{ width: 50, height: 50 }} />
            ) : (
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                  marginRight: 20,
                  backgroundColor: iconColorsTable['blue1'],
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FontAwesome5 name='user-astronaut' size={25} color='white' />
              </View>
            )}
            <View>
              <Text style={{ color: baseTextColor }}>{user.name}</Text>
            </View>
          </View>
        );
      });

      return (
        <View style={{}}>
          <View style={{ backgroundColor: inputBackgroundColor, borderRadius: 10 }}>{crewList}</View>
        </View>
      );
    } else if (!attendees.length) {
      return <Text style={{ color: 'white' }}>Nobody attends this meetup yet.</Text>;
    } else {
      return <Text style={{ color: 'white' }}>Now loading...</Text>;
    }
  };

  return (
    <View>
      <ScrollView contentContainerStyle={{ paddingBottom: 300 }}>{renderCrew()}</ScrollView>
    </View>
  );
};

export default Crew;
