// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const About = (props) => {
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
  // rocket-launch
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
      <View style={{ marginBottom: 15 }}>
        <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Title</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Octicons name='id-badge' size={25} style={{ marginRight: 40 }} />
          <Text style={{ fontWeight: 'bold' }}>{props.selectedMeetup.title}</Text>
        </View>
      </View>
      {/* {renderBadges()} */}

      <View style={{ marginBottom: 15 }}>
        <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Date</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name='clock' size={25} style={{ marginRight: 40, fontWeight: 'bold' }} />
          <View>
            <Text style={{ fontWeight: 'bold' }}>
              {new Date(props.selectedMeetup.startDateAndTime).toLocaleString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </Text>
            <Text style={{ fontWeight: 'bold' }}>
              -&nbsp;{' '}
              {new Date(props.selectedMeetup.endDateAndTime).toLocaleString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ marginBottom: 15 }}>
        <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Fee</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesome name='money' size={25} style={{ marginRight: 40 }} />
          {props.selectedMeetup.isFeeFree ? (
            <Text style={{ fontWeight: 'bold' }}>Free</Text>
          ) : (
            <Text style={{ fontWeight: 'bold' }}>Not free...</Text>
          )}
        </View>
      </View>

      {/* <View style={{ marginBottom: 15 }}>
        <Text style={{ marginBottom: 5 }}>Crew</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name='account-group' size={25} style={{ marginRight: 40 }} />
          {props.selectedMeetup.isAttendeesLimitFree ? (
            <Text style={{ marginRight: 40 }}>{props.selectedMeetup.totalAttendees}/infi</Text>
          ) : (
            <Text style={{ marginRight: 40 }}>{props.selectedMeetup.totalAttendees}/limit</Text>
          )}
          <TouchableOpacity>
            <Text>See detail</Text>
          </TouchableOpacity>
        </View>
      </View> */}

      <View>
        <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Launcher</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name='rocket-launch' size={25} style={{ marginRight: 35 }} />
          <TouchableOpacity>
            <Text style={{ fontWeight: 'bold' }}>{props.selectedMeetup.launcher.name}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup };
};

export default connect(mapStateToProps)(About);
