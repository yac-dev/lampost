// main libraries
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import lampostAPI from '../../apis/lampost';
import { View, Text } from 'react-native';

// components
import RNCalendars from './RNCalendars';
import SelectedDate from './SelectedDate';

// ac

const Container = (props) => {
  const [dates, setDates] = useState(null);
  const [upcomingMeetups, setUpcomingMeetups] = useState([]);

  const getUpcomingJoinedMeetup = async () => {
    const upcomingMeetupIds = [];
    for (let i = 0; i < props.auth.data.upcomingMeetups.length; i++) {
      upcomingMeetupIds.push(props.auth.data.upcomingMeetups[i].meetup);
    }
    console.log(upcomingMeetupIds);
    const result = await lampostAPI.post('/meetups/upcoming/', { upcomingMeetupIds });
    const { meetups } = result.data;
    meetups.map((meetup) => {
      const dateKey = new Date(meetup.startDateAndTime).toISOString().split('T')[0];
      setDates((previous) => {
        return {
          ...previous,
          [dateKey]: { selected: true, marked: true, dotColor: 'white', selectedColor: 'red', data: meetup },
        };
      });
    });
  };

  useEffect(() => {
    getUpcomingJoinedMeetup();
  }, []);

  return (
    <View>
      <RNCalendars dates={dates} navigation={props.navigation} />
      <SelectedDate navigation={props.navigation} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, {})(Container);
