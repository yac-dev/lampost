// main libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

// ac
import { joinMeetup } from '../../../redux/actionCreators/meetups';
import { leaveMeetup } from '../../../redux/actionCreators/meetups';

const ActionButtons = (props) => {
  const renderApp = () => {
    if (props.auth.isAuthenticated) {
      for (let i = 0; i < props.auth.data.upcomingMeetups.length; i++) {
        if (props.auth.data.upcomingMeetups[i].meetup === props.selectedMeetup._id) {
          return (
            <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
              {props.selectedMeetup.launcher._id === props.auth.data._id ? (
                <Button mode='outlined' icon={'plus'} style={{ marginRight: 10 }} onPress={() => console.log('edit')}>
                  Scout
                </Button>
              ) : (
                <Button
                  mode='outlined'
                  icon={'exit-run'}
                  onPress={() => props.leaveMeetup(props.selectedMeetup._id)}
                  style={{ marginRight: 10 }}
                >
                  Leave
                </Button>
              )}
              <Button
                mode='outlined'
                icon={'comment-text-multiple'}
                onPress={() => props.navigation.navigate('Lounge', { meetupId: props.selectedMeetup._id })}
                style={{ marginRight: 10 }}
              >
                Lounge
              </Button>
              <Button mode='outlined' icon={'camera'} onPress={() => console.log('edit')} style={{ marginRight: 10 }}>
                Camera
              </Button>
              {/* <Button mode='outlined' icon={'web'} onPress={() => console.log('edit')} style={{ marginRight: 10 }}>
                Location detail
              </Button> */}
              <Button mode='outlined' icon={'map'} onPress={() => console.log('edit')} style={{ marginRight: 10 }}>
                Map chat
              </Button>
            </View>
          );
        }
      }
    } else {
      return null;
    }
  };

  return (
    <ScrollView horizontal={true} style={{ flexDirection: 'row', marginBottom: 30 }}>
      {/* <Button
        mode='outlined'
        icon={<FontAwesome5 name='user-astronaut' />}
        onPress={() => props.navigation.navigate('Crew', { meetupId: props.selectedMeetup._id })}
        style={{ marginRight: 10 }}
      >
        Crew&nbsp;
        {props.selectedMeetup.isAttendeesLimitFree ? (
          <Text style={{ marginRight: 40 }}>{props.selectedMeetup.totalAttendees}/&infin;&nbsp;</Text>
        ) : (
          <Text style={{ marginRight: 40 }}>{props.selectedMeetup.totalAttendees}/limit</Text>
        )}
      </Button> */}
      {renderApp()}
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup, auth: state.auth };
};

export default connect(mapStateToProps, { joinMeetup, leaveMeetup })(ActionButtons);
