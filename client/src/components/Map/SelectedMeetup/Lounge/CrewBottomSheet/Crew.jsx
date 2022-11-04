import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const Crew = (props) => {
  // props.navigation.navigate('User', {userId: '11111'})
  const renderCrew = () => {
    const crewList = props.meetup.attendees.map((user, index) => {
      return (
        // <TouchableOpacity
        //   key={index}
        //   style={{
        //     flexDirection: 'row',
        //     paddingLeft: 20,
        //     paddingTop: 10,
        //     paddingBottom: 10,
        //     borderBottomWidth: 0.3,
        //     borderBottomColor: '#ABABAB',
        //   }}
        //   onPress={() => props.navigation.navigate('User', { userId: user._id })}
        // >
        //   <View style={{ width: 50, height: 50, backgroundColor: 'blue', marginRight: 20, borderRadius: 5 }}></View>
        //   <View>
        //     <Text>{user.name}</Text>
        //     <Text>Badges</Text>
        //   </View>
        // </TouchableOpacity>
        <TouchableOpacity
          key={index}
          style={{
            flexDirection: 'row',
            paddingLeft: 20,
            paddingTop: 10,
            paddingBottom: 10,
            borderBottomWidth: 0.3,
            borderBottomColor: '#ABABAB',
          }}
          onPress={() => props.navigation.navigate('User', { userId: user._id })}
        >
          <View
            style={{
              backgroundColor: 'blue',
              marginRight: 20,
              padding: 5,
              borderRadius: 7,
              width: 50,
              height: 50,
              alignItems: 'center',
            }}
          >
            <FontAwesome5 name='user-astronaut' color='white' size={35} />
          </View>
          <View>
            <Text style={{ color: 'rgb(160,160,160)' }}>{user.name}</Text>
            <Text>Badges</Text>
          </View>
        </TouchableOpacity>
      );
    });

    return <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>{crewList}</ScrollView>;
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
