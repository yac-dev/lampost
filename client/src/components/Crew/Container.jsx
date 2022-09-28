// main libraries
import React, { useEffect, useState } from 'react';
import lampostAPI from '../../apis/lampost';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const Container = (props) => {
  const [crew, setCrew] = useState([]);
  // props.route.params.meetupId

  const getMeetupCrew = async () => {
    const result = await lampostAPI.get(`/meetups/${props.route.params.meetupId}/crew`);
    const { meetup } = result.data;
    setCrew((previous) => [...previous, ...meetup.attendees]);
  };

  useEffect(() => {
    getMeetupCrew();
  }, []);

  const renderCrew = () => {
    const crewList = crew.map((user, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={{
            flexDirection: 'row',
            paddingLeft: 20,
            paddingTop: 10,
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: 'red',
          }}
          onPress={() => console.log('go to user page')}
          // props.navigation.navigate('User', { userId: '1111' })
        >
          <View style={{ width: 50, height: 50, backgroundColor: 'blue', marginRight: 20, borderRadius: 5 }}></View>
          <View>
            <Text>{user.name}</Text>
            <Text>{user.bio}</Text>
            <Text>Badges</Text>
          </View>
        </TouchableOpacity>
      );
    });

    return <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>{crewList}</ScrollView>;
  };

  if (crew.length) {
    return <>{renderCrew()}</>;
  } else {
    return (
      <View>
        <Text>Loading....</Text>
      </View>
    );
  }
};

export default Container;
