import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';

const Badges = (props) => {
  const renderBadges = () => {
    const badgesList = props.selectedMeetup.badges.map((badge, index) => {
      return (
        <View key={index}>
          <Text>{badge.name}</Text>
        </View>
      );
    });
    return <ScrollView>{badgesList}</ScrollView>;
  };

  return (
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>Badges</Text>
      {/* <Text>This meetup has these badges. </Text> */}
      {renderBadges()}
    </View>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup };
};

export default connect(mapStateToProps)(Badges);
