// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

// ac
import { joinMeetup } from '../../../redux/actionCreators/meetups';
import { leaveMeetup } from '../../../redux/actionCreators/meetups';

const Header = (props) => {
  // titleとuser情報の間に、meetupのbadgeが入ることになる。
  const renderActionButton = () => {
    // まず、自分のupcomingMeetupsの中に、selecedMeetupのidがあるかどうか確認する。そして、それが自分がlaunchしたものであるかを確認する。launchしたものならedit buttonを、launchしていないものであるならleave buttonを表示する。
    if (props.auth.isAuthenticated) {
      for (let i = 0; i < props.auth.data.upcomingMeetups.length; i++) {
        if (props.auth.data.upcomingMeetups[i].meetup === props.selectedMeetup._id) {
          if (props.auth.data.upcomingMeetups[i].launched) {
            return (
              <View style={{ flex: 3 }}>
                <Button
                  mode='outlined'
                  icon={'application-edit-outline'}
                  onPress={() => console.log('edit')}
                  style={{ marginBottom: 10 }}
                >
                  Edit
                </Button>
                <Button mode='outlined' icon={'plus'} onPress={() => console.log('edit')}>
                  Scout
                </Button>
              </View>
            );
          } else {
            return (
              <View style={{ flex: 3 }}>
                <Button
                  mode='outlined'
                  icon={'plus'}
                  onPress={() => props.leaveMeetup(props.selectedMeetup._id)}
                  style={{ marginBottom: 10 }}
                >
                  Leave
                </Button>
              </View>
            );
          }
        }
      }
      // upcomingMeetupsが全くない場合、ただjoinするかを聞くだけ。
      return (
        <View style={{ flex: 3 }}>
          <Button
            mode='outlined'
            icon={'plus'}
            onPress={() => props.joinMeetup(props.selectedMeetup._id)}
            style={{ alignItems: 'center' }}
          >
            I'm in!
          </Button>
        </View>
      );
    } else {
      return null;
    }
  };

  const renderDate = (date) => {
    if (date) {
      return (
        <Text>{`${new Date(date).toLocaleString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}`}</Text>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5 }}>{props.selectedMeetup.title}</Text>
      <Text style={{ alignSelf: 'flex-end' }}>{`Starts at ${renderDate(props.selectedMeetup.startDateAndTime)}`}</Text>
      <Text style={{ flexShrink: 1 }}>{props.selectedMeetup.description}</Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup, auth: state.auth };
};

export default connect(mapStateToProps, { joinMeetup, leaveMeetup })(Header);
