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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesome name='money' size={25} style={{ marginRight: 40 }} />
          {props.selectedMeetup.isFeeFree ? (
            <Text style={{ fontWeight: 'bold' }}>Free</Text>
          ) : (
            <Text style={{ fontWeight: 'bold' }}>Not free...</Text>
          )}
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <MaterialCommunityIcons name='office-building-marker' size={20} style={{ marginRight: 40 }} />
        <Text style={{ fontWeight: 'bold' }}>We work office south 3f</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <MaterialCommunityIcons name='chat-question' size={20} style={{ marginRight: 40 }} />
        <TouchableOpacity>
          <Text style={{ fontWeight: 'bold' }}>{props.selectedMeetup.comments.length} comment</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <MaterialCommunityIcons name='account-group' size={20} style={{ marginRight: 40 }} />
        <TouchableOpacity>
          {props.selectedMeetup.isAttendeesLimitFree ? (
            <Text style={{ marginRight: 40 }}>{props.selectedMeetup.totalAttendees}/&infin;&nbsp;people</Text>
          ) : (
            <Text style={{ marginRight: 40 }}>{props.selectedMeetup.totalAttendees}/limit people</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <MaterialCommunityIcons name={'file-document-edit'} size={20} style={{ marginRight: 40 }} />
        <Text style={{ flex: 1, flexWrap: 'wrap', fontWeight: 'bold' }}>{props.selectedMeetup.description}</Text>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup };
};

export default connect(mapStateToProps)(About);
