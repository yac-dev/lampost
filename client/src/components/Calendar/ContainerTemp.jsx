// main libraries
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import lampostAPI from '../../apis/lampost';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

// ac
import { getUpcomingJoinedMeetup } from '../../redux/actionCreators/meetups';

const ContainerTemp = (props) => {
  const [dates, setDates] = useState({});
  const [upcomingMeetups, setUpcomingMeetups] = useState([]);

  const getMeetups = async () => {
    const result = await lampostAPI.post('/meetups/upcoming/joined', {
      upcomingJoinedMeetupIds: props.auth.data.upcomingJoinedMeetups,
    });
    const { upcomingJoinedMeetups } = result.data;
    console.log(upcomingJoinedMeetups);
    setUpcomingMeetups((previous) => {
      return [...previous, ...upcomingJoinedMeetups];
    });
    // upcomingJoinedMeetups.map((meetup) => {
    //   const dateKey = new Date(meetup.startDateAndTime).toISOString().split('T')[0];
    //   setDates((previous) => {
    //     return { ...previous, [dateKey]: { selected: true, marked: true, dotColor: 'white', selectedColor: 'red' } };
    //   });
    // });
  };

  useEffect(() => {
    getMeetups();
  }, []);

  const renderList = () => {
    const list = upcomingMeetups.map((meetup, index) => {
      return (
        <TouchableOpacity key={index} onPress={() => props.navigation.navigate('Meetup', { meetupId: meetup._id })}>
          <Text>{meetup.startDateAndTime}</Text>
        </TouchableOpacity>
      );
    });

    return <View>{list}</View>;
  };

  // #d9e1e8この色いいかも
  if (upcomingMeetups.length) {
    // return <SafeAreaView>{renderList()}</SafeAreaView>;
    return (
      <View>
        <Calendar
          markedDates={dates}
          style={{ height: 400, padding: 30 }}
          theme={{
            calendarBackground: '#07175E',
            textSectionTitleColor: 'white',
            textSectionTitleDisabledColor: '#d9e1e8',
            // selectedDayBackgroundColor: '#00adf5',
            // selectedDayTextColor: '#ffffff',
            todayTextColor: '#5272FF',
            dayTextColor: 'white',
            textDisabledColor: '#545454',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'white',
            monthTextColor: 'white',
            indicatorColor: 'white',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
        />
        <View>
          <Text>Hello</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { getUpcomingJoinedMeetup })(ContainerTemp);
