import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import lampostAPI from '../../../apis/lampost';

const Container = (props) => {
  // const [meetup, setMeetup] = useState(null);
  const [crew, setCrew] = useState([]);

  // const getMeetup = async () => {
  //   const result = await lampostAPI.get(`/meetups/${props.route.params.meetupId}`);
  //   const { meetup } = result.data;
  //   console.log(meetup);
  //   setMeetup(meetup);
  //   setCrew((previous) => [...previous, ...meetup.attendees]); // ここで、attendeesを取ってくるようにする。
  // };
  const renderAttendees = () => {
    const attendeesList = props.route.params.meetup.attendees.map((user, index) => {
      return (
        <View key={index}>
          <Text>{user.name.firstName}</Text>
        </View>
      );
    });

    return <View>{attendeesList}</View>;
  };

  useEffect(() => {
    // getMeetup()
  }, []);
  return (
    <View>
      <Text>Crew component</Text>
      <Text>{props.route.params.meetup._id}</Text>
      {renderAttendees()}
    </View>
  );
};

export default Container;
