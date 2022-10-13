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
  };

  return (
    <View style={{ marginBottom: 30 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <View style={{ flex: 7 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 20, fontSize: 25 }}>{props.selectedMeetup.title}</Text>
        </View>
        {renderActionButton()}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 50, height: 50, backgroundColor: 'red', borderRadius: 5, marginRight: 20 }}>
          <Text>Pic</Text>
        </View>
        <View>
          <TouchableOpacity>
            <Text style={{ fontWeight: 'bold' }}>{props.selectedMeetup.launcher.name}</Text>
          </TouchableOpacity>
          <Text>Skills here</Text>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup, auth: state.auth };
};

export default connect(mapStateToProps, { joinMeetup, leaveMeetup })(Header);
