// main libraries
import React, { useEffect, useState } from 'react';
import lampostAPI from '../../apis/lampost';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

// ac
import { getUpcomingJoinedMeetup } from '../../redux/actionCreators/meetups';

const RNCalendars = (props) => {
  let ScreenHeight = Dimensions.get('window').height;
  // #d9e1e8この色いいかも
  if (props.dates) {
    // return <SafeAreaView>{renderList()}</SafeAreaView>;
    // 個々のdate objectをどうすればいいんだろうか？？
    return (
      <CalendarList
        markedDates={props.dates}
        style={{ height: ScreenHeight }}
        onDayPress={(day) => {
          console.log('selected day', day);
          // tapしたmeetupを別のcomponentで表示する。chat, crew, map, meetup detail等。。。
          props.navigation.navigate('Meetup', { meetupId: props.dates[day.dateString].data._id });
        }}
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
