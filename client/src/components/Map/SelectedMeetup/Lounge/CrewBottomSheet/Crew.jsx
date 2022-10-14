import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const Crew = (props) => {
  // props.navigation.navigate('User', {userId: '11111'})
  const renderCrew = () => {
    const crewList = props.meetup.attendees.map((user, index) => {
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
          onPress={() => props.navigation.navigate('User', { userId: user._id })}
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

  if (props.meetup) {
    return <>{renderCrew()}</>;
  } else {
    return (
      <View>
        <Text>Loading....</Text>
      </View>
    );
  }
};

export default Crew;
