import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import lampostAPI from '../../../../apis/lampost';
import { FontAwesome5 } from '@expo/vector-icons';

const Crew = (props) => {
  const [crew, setCrew] = useState([]);

  const getAttendees = async () => {
    const result = await lampostAPI.get(`/meetups/${props.selectedMeetup._id}/crew`);
    const { attendees } = result.data;
    console.log(attendees);
    setCrew((prev) => [...prev, ...attendees]);
  };

  useEffect(() => {
    if (props.bottomSheet.selectedItem.infoDetail.component === 'Crew') {
      getAttendees();
    }
  }, [props.bottomSheet.selectedItem.infoDetail.component]); // bottomSheetのopenが変わるたびにね。

  const renderCrew = () => {
    if (crew.length) {
      const crewList = crew.map((user, index) => {
        return (
          // <View key={index}>
          //   <Text>{user.name}</Text>
          // </View>
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
    } else {
      return <Text>Now loading...</Text>;
    }
  };

  return (
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 11 }}>Crew</Text>
      {renderCrew()}
    </View>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup, bottomSheet: state.bottomSheet };
};

export default connect(mapStateToProps)(Crew);
