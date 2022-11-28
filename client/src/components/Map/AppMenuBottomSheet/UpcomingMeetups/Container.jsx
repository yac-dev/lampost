import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { sectionBackgroundColor } from '../../../../utils/colorsTable';

const Container = (props) => {
  // ここのconditional renderingまじ重要ね。
  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const dateTable = { ...d.split(' ') };
    return (
      <View
        style={{
          width: 50,
          height: 50,
          padding: 10,
          borderRadius: 10,
          borderWidth: 0.3,
          marginRight: 10,
          backgroundColor: '#EFEFEF',
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>{dateTable['0']}</Text>
        <Text style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center' }}>{dateTable['1']}</Text>
        {/* <Text style={{ textAlign: 'center' }}>{dateTable['2']}</Text> */}
      </View>
    );
  };

  const renderTime = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const dateTable = { ...d.split(' ') };
    return (
      <Text style={{ color: 'white' }}>
        Starts at&nbsp;{dateTable[1]}
        {dateTable[2]}
      </Text>
    );
  };

  const renderUpcomingMeetups = () => {
    if (props.auth.data) {
      const upcomingMeetupsList = props.auth.data.upcomingMeetups.map((meetup, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 10,
              paddingBottom: 10,
              borderBottomWidth: 0.3,
              borderBottomColor: '#EFEFEF',
            }}
          >
            {renderDate(meetup.meetup.startDateAndTime)}
            <View style={{}}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>{meetup.meetup.title}</Text>
              {renderTime(meetup.meetup.startDateAndTime)}
            </View>
          </TouchableOpacity>
        );
      });

      return <View>{upcomingMeetupsList}</View>;
    } else {
      return null;
    }
  };
  return (
    <View>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>My upcoming meetups</Text>
      <View style={{ padding: 10, backgroundColor: sectionBackgroundColor, borderRadius: 10 }}>
        {renderUpcomingMeetups()}
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, {})(Container);
