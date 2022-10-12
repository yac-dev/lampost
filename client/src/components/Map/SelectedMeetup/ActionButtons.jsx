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
  const renderJoinOrLeave = () => {
    if (!props.auth.data.upcomingMeetups.length) {
      return (
        <Button
          mode='outlined'
          icon={'rocket'}
          onPress={() => props.joinMeetup(props.selectedMeetup._id)}
          style={{ marginRight: 10 }}
        >
          I'm in!
        </Button>
      );
    } else {
      for (let i = 0; i < props.auth.data.upcomingMeetups.length; i++) {
        if (props.auth.data.upcomingMeetups[i].launched) {
          return (
            <Button
              mode='outlined'
              icon={'plus'}
              onPress={() => props.leaveMeetup(props.selectedMeetup._id)}
              style={{ marginRight: 10 }}
            >
              Recruit
            </Button>
          );
        } else {
          for (let i = 0; i < props.auth.data.upcomingMeetups.length; i++) {
            if (props.selectedMeetup._id === props.auth.data.upcomingMeetups[i].meetup) {
              return (
                <View style={{ flexDirection: 'row' }}>
                  <Button
                    mode='outlined'
                    icon={'exit-run'}
                    onPress={() => props.leaveMeetup(props.selectedMeetup._id)}
                    style={{ marginRight: 10 }}
                  >
                    Leave
                  </Button>
                  <Button
                    mode='outlined'
                    icon={'exit-run'}
                    onPress={() => props.leaveMeetup(props.selectedMeetup._id)}
                    style={{ marginRight: 10 }}
                  >
                    Invite
                  </Button>
                </View>
              );
            } else {
              return (
                <Button
                  mode='outlined'
                  icon={'rocket'}
                  onPress={() => props.joinMeetup(props.selectedMeetup._id)}
                  style={{ marginRight: 10 }}
                >
                  I'm in!
                </Button>
              );
            }
          }
        }
      }
    }
  };

  const renderApp = () => {
    for (let i = 0; i < props.auth.data.upcomingMeetups.length; i++) {
      if (props.auth.data.upcomingMeetups[i].meetup === props.selectedMeetup._id) {
        // if (props.auth.data.upcomingMeetups[i].launched) {
        //   return (
        //     <View style={{ flexDirection: 'row' }}>
        //       <Button mode='outlined' icon={'plus'} onPress={() => console.log('edit')} style={{ marginRight: 10 }}>
        //         Edit
        //       </Button>
        //       <Button mode='outlined' icon={'plus'} onPress={() => console.log('edit')} style={{ marginRight: 10 }}>
        //         Scout!
        //       </Button>
        //     </View>
        //   );
        // } else {
        //   return (
        //     <Button mode='outlined' icon={'plus'} onPress={() => console.log('leave')} style={{ marginBottom: 10 }}>
        //       Leave
        //     </Button>
        //   );
        // }
        return (
          <View style={{ flexDirection: 'row' }}>
            <Button mode='outlined' icon={'chat'} onPress={() => console.log('edit')} style={{ marginRight: 10 }}>
              Crew room
            </Button>
            <Button mode='outlined' icon={'camera'} onPress={() => console.log('edit')} style={{ marginRight: 10 }}>
              Camera
            </Button>
            <Button mode='outlined' icon={'map'} onPress={() => console.log('edit')} style={{ marginRight: 10 }}>
              Map comm
            </Button>
            <Button mode='outlined' icon={'map'} onPress={() => console.log('edit')} style={{ marginRight: 10 }}>
              Location detail
            </Button>
          </View>
        );
      }
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
      {/* <Button mode='outlined' icon={'more'} onPress={() => console.log('Pressed')} style={{ marginRight: 10 }}>
        More
      </Button> */}
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup, auth: state.auth };
};

export default connect(mapStateToProps, { joinMeetup, leaveMeetup })(ActionButtons);
