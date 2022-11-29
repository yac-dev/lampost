import React, { useContext } from 'react';
import MapContext from '../../MeetupContext';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { sectionBackgroundColor, baseTextColor } from '../../../../utils/colorsTable';
import { Entypo } from '@expo/vector-icons';

const Container = (props) => {
  const { appMenuBottomSheetRef } = useContext(MapContext);
  // ここのconditional renderingまじ重要ね。
  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    const dateElements = d.split(',').join('').split(' ');
    return (
      <View
        style={{
          padding: 10,
          borderRadius: 10,
          borderWidth: 0.3,
          marginRight: 15,
          borderColor: baseTextColor,
        }}
      >
        <Text style={{ fontSize: 13, textAlign: 'center', color: baseTextColor }}>{dateElements[0]}</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: baseTextColor }}>
          {dateElements[1]}&nbsp;{dateElements[2]}
        </Text>
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

  const onUpcomingMeetupPress = (meetupId) => {
    appMenuBottomSheetRef.current.snapToIndex(0);
    console.log('selected meetup', meetupId);
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
              justifyContent: 'space-between',
              paddingTop: 10,
              paddingBottom: 10,
              borderBottomWidth: 0.3,
              borderBottomColor: '#EFEFEF',
            }}
            onPress={() => onUpcomingMeetupPress(meetup.meetup._id)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {renderDate(meetup.meetup.startDateAndTime)}
              <View style={{}}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>{meetup.meetup.title}</Text>
                {renderTime(meetup.meetup.startDateAndTime)}
              </View>
            </View>
            <Entypo size={25} name='chat' color={baseTextColor} onPress={() => console.log('opening chat')} />
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
