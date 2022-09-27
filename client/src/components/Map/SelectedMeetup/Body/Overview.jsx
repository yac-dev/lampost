// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { List } from 'react-native-paper';
import { Octicons } from '@expo/vector-icons';

// id-badge

const Overview = (props) => {
  const renderBadges = () => {
    const badgesList = props.selectedMeetup.badges.map((badge, index) => {
      return (
        <View key={index}>
          <Text>{badge.label}</Text>
        </View>
      );
    });

    return <>{badgesList}</>;
  };

  return (
    <View>
      <View>
        <Text>{props.selectedMeetup.title}</Text>
        {/* {renderBadges()} */}
        <Text>{props.selectedMeetup.isFeeFree ? 'Free' : ''}</Text>
        <Text>{props.selectedMeetup.isAttendeesLimitFree ? props.selectedMeetup.totalAttendees : ''}</Text>
        <Text>{props.selectedMeetup.startDateAndTime}</Text>
        <Text>{props.selectedMeetup.endDateAndTime}</Text>
        <Text>{props.selectedMeetup.launcher.name}</Text>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup };
};

export default connect(mapStateToProps)(Overview);
