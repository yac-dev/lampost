import React, { useEffect, useState, useContext } from 'react';
import GlobalContext from '../../../../GlobalContext';
import MapContext from '../../MeetupContext';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import lampostAPI from '../../../../apis/lampost';
import { FontAwesome5 } from '@expo/vector-icons';
import { baseTextColor, sectionBackgroundColor, iconColorsTable } from '../../../../utils/colorsTable';
import Members from '../../../Libraries/InfoDetailBottomSheet/Members';

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
            style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
            onPress={() => {
              if (!auth.data || auth.data._id !== user._id) {
                navigation.navigate('User', { userId: user._id });
              }
            }}
          >
            <View
              style={{
                backgroundColor: iconColorsTable['blue1'],
                marginRight: 20,
                padding: 5,
                borderRadius: 7,
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FontAwesome5 name='user-astronaut' color='white' size={30} />
            </View>
            <View>
              <Text style={{ color: 'rgb(160,160,160)' }}>{user.name}</Text>
            </View>
          </TouchableOpacity>
        );
      });

      return (
        <View style={{}}>
          <Text style={{ color: baseTextColor, marginBottom: 10 }}>
            These people attend this meetup. Feel free to join!
          </Text>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 50,
            }}
            style={{ backgroundColor: sectionBackgroundColor, borderRadius: 10 }}
          >
            {crewList}
          </ScrollView>
        </View>
      );
    } else if (!crew.length) {
      return <Text style={{ color: 'white' }}>Nobody attends this meetup yet.</Text>;
    } else {
      return <Text style={{ color: 'white' }}>Now loading...</Text>;
    }
  };

  return (
    <View>
      <View style={{ marginBottom: 25 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10, color: 'white' }}>Crew</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        {renderCrew()}
      </ScrollView>
    </View>
  );
};

export default Crew;
