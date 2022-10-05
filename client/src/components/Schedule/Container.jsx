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
    const result = await lampostAPI.post('/meetups/upcoming/joined', {
      upcomingJoinedMeetupIds: props.auth.data.upcomingJoinedMeetups,
    });
    const { upcomingJoinedMeetups } = result.data;
    setUpcomingMeetups((previous) => {
      return [...previous, ...upcomingJoinedMeetups];
    });
    upcomingJoinedMeetups.map((meetup) => {
      const dateKey = new Date(meetup.startDateAndTime).toISOString().split('T')[0];
      setDates((previous) => {
        return { ...previous, [dateKey]: { selected: true, marked: true, dotColor: 'white', selectedColor: 'red' } };
      });
    });
  };

  useEffect(() => {
    getUpcomingJoinedMeetup();
  }, []);

  return (
    <View>
      <RNCalendars dates={dates} />
      <SelectedDate />
    </View>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, {})(Container);
