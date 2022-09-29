// main libraries
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

// ac
import { getUpcomingJoinedMeetup } from '../../redux/actionCreators/meetups';

const RNCalendars = (props) => {
  // #d9e1e8この色いいかも
  if (props.dates) {
    // return <SafeAreaView>{renderList()}</SafeAreaView>;
    return (
      <Calendar
        markedDates={props.dates}
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

export default connect(mapStateToProps, { getUpcomingJoinedMeetup })(RNCalendars);
