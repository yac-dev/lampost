// main libraries
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import lampostAPI from '../../apis/lampost';
import { View, Text, Image, TouchableOpacity } from 'react-native';

// components
import RNCalendars from './RNCalendars';
import SelectedDate from './SelectedDate';
import { Calendar, CalendarList } from 'react-native-calendars';

// ac

const Container = (props) => {
  const [dates, setDates] = useState(null);
  const [upcomingMeetups, setUpcomingMeetups] = useState([]);

  // const getUpcomingJoinedMeetup = async () => {
  //   const upcomingMeetupIds = [];
  //   for (let i = 0; i < props.auth.data.upcomingMeetups.length; i++) {
  //     upcomingMeetupIds.push(props.auth.data.upcomingMeetups[i].meetup);
  //   }
  //   console.log(upcomingMeetupIds);
  //   const result = await lampostAPI.post('/meetups/upcoming/', { upcomingMeetupIds });
  //   const { meetups } = result.data;
  //   meetups.map((meetup) => {
  //     const dateKey = new Date(meetup.startDateAndTime).toISOString().split('T')[0];
  //     // if(dates[dateKey]){
  //     //   setDates((previous) => {
  //     //     return {
  //     //       ...previous,
  //     //     }
  //     //   })
  //     // } //ここ後でいい。
  //     const time = new Date(meetup.startDateAndTime).toLocaleTimeString('en', { timeStyle: 'short', hour12: false });
  //     const eventObj = {};
  //     eventObj[time] = meetup.title;
  //     const dateValue = {
  //       selected: true,
  //       // marked: true,
  //       dotColor: 'red',
  //       selectedColor: 'rgba(255, 24, 24, 0.3)',
  //       meetups: [],
  //     };
  //     dateValue.meetups.push(eventObj);

  //     setDates((previous) => {
  //       return {
  //         ...previous,
  //         [dateKey]: dateValue,
  //         // 時間とそのdataって具合でobject dataを持たんといかん。
  //       };
  //     });
  //   });
  // };

  // useEffect(() => {
  //   getUpcomingJoinedMeetup();
  // }, []);

  const renderDay = (date) => {
    // Return the photo for the specified date, or null if no photo exists
    return (
      <View style={{ width: 50, height: 50, backgroundColor: 'red' }}>
        <Text>Nice photo</Text>
      </View>
    );
  };

  return (
    <Calendar
      dayComponent={(e) => {
        // console.log(e);
        return (
          <TouchableOpacity
            style={{
              height: 80,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'red',
              width: '100%',
            }}
          >
            <Image
              style={{ width: '100%', height: '100%' }}
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
            />
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default Container;
