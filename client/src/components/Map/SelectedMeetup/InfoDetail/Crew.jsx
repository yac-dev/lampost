import React, { useEffect, useState, useContext } from 'react';
import GlobalContext from '../../../../GlobalContext';
import MapContext from '../../MeetupContext';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import lampostAPI from '../../../../apis/lampost';
import { FontAwesome5 } from '@expo/vector-icons';
import { baseTextColor, sectionBackgroundColor } from '../../../../utils/colorsTable';

const Crew = (props) => {
  const { auth } = useContext(GlobalContext);
  const { selectedMeetup, selectedMeetupDetailComponent, navigation } = useContext(MapContext);
  const [crew, setCrew] = useState([]);

  const getAttendees = async () => {
    const result = await lampostAPI.get(`/meetups/${selectedMeetup._id}/crew`);
    const { attendees } = result.data;
    // console.log(attendees);
    setCrew((prev) => [...prev, ...attendees]);
  };

  useEffect(() => {
    if (selectedMeetupDetailComponent === 'Crew') {
      getAttendees();
    }
  }, [selectedMeetupDetailComponent]);

  const renderCrew = () => {
    if (crew.length) {
      const crewList = crew.map((user, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              borderBottomWidth: 0.3,
              borderBottomColor: '#ABABAB',
            }}
            onPress={() => {
              if (!auth.data || auth.data._id !== user._id) {
                navigation.navigate('User', { userId: user._id });
              }
            }}
          >
            <View
              style={{
                backgroundColor: 'blue',
                marginRight: 20,
                padding: 5,
                borderRadius: 7,
                width: 35,
                height: 35,
                alignItems: 'center',
              }}
            >
              <FontAwesome5 name='user-astronaut' color='white' size={20} />
            </View>
            <View>
              <Text style={{ color: 'rgb(160,160,160)' }}>{user.name}</Text>
            </View>
          </TouchableOpacity>
        );
      });

      return <View>{crewList}</View>;
    } else {
      return <Text style={{ color: 'white' }}>Now loading...</Text>;
    }
  };

  return (
    <View>
      <View style={{ marginBottom: 25 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10, color: 'white' }}>Crew</Text>
        <Text style={{ color: baseTextColor }}>These people attend this meetup. Feel free to join!</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
          backgroundColor: sectionBackgroundColor,
          padding: 5,
          borderRadius: 10,
        }}
      >
        {renderCrew()}
      </ScrollView>
    </View>
  );
};

export default Crew;
