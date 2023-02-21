import React, { useEffect, useState, useContext } from 'react';
import GlobalContext from '../../../../GlobalContext';
import MapContext from '../../MeetupContext';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import lampostAPI from '../../../../apis/lampost';
import { FontAwesome5 } from '@expo/vector-icons';
import { baseTextColor, sectionBackgroundColor, iconColorsTable } from '../../../../utils/colorsTable';
import UserInfo from '../../../Utils/UserInfo';

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

  const onUserNamePress = (user) => {
    // if (!auth.data || auth.data._id !== user._id) {
    //   navigation.navigate('User', { userId: user._id });
    // }
    if (!auth.data) {
      setSnackBar({
        isVisible: true,
        barType: 'error',
        message: 'You are required to login or signup',
        duration: 2000,
      });
    } else {
      if (auth.data._id !== user._id) {
        navigation.navigate('User', { userId: user._id });
      } else {
        console.log('Not gonna navigate to my page');
      }
    }
  };

  const renderCrew = () => {
    if (crew.length) {
      const crewList = crew.map((user, index) => {
        return (
          // <TouchableOpacity
          //   key={index}
          //   style={{ flexDirection: 'row', alignItems: 'center' }}
          //   onPress={() => {
          //     if (!auth.data || auth.data._id !== user._id) {
          //       navigation.navigate('User', { userId: user._id });
          //     }
          //   }}
          // >
          <UserInfo key={index} user={user} onUserNamePress={onUserNamePress} />
          // </TouchableOpacity>
        );
      });

      return (
        <View style={{}}>
          <Text style={{ color: baseTextColor, marginBottom: 10 }}>
            These people are attending this meetup. Feel free to join!.
          </Text>
          <View>{crewList}</View>
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
      <View style={{ marginBottom: 0 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10, color: 'white' }}>Members</Text>
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
