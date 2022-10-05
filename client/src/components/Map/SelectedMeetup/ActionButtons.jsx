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
      }
      // else {
      //   for (let i = 0; i < props.auth.data.upcomingMeetups.length; i++) {
      //     if (props.selectedMeetup._id === props.auth.data.upcomingMeetups[i]) {
      //       return (
      //         <Button
      //           mode='outlined'
      //           icon={'exit-run'}
      //           onPress={() => props.leaveMeetup(props.selectedMeetup._id)}
      //           style={{ marginRight: 10 }}
      //         >
      //           Get off
      //         </Button>
      //       );
      //     }
      //   }
      //   return (
      //     <Button
      //       mode='outlined'
      //       icon={'rocket'}
      //       onPress={() => props.joinMeetup(props.selectedMeetup._id)}
      //       style={{ marginRight: 10 }}
      //     >
      //       I'm in!
      //     </Button>
      //   );
      // }
    }
  };

  return (
    <ScrollView horizontal={true} style={{ flexDirection: 'row', marginBottom: 30 }}>
      <Button
        mode='outlined'
        icon={<FontAwesome5 name='user-astronaut' />}
        onPress={() => props.navigation.navigate('Crew', { meetupId: props.selectedMeetup._id })}
        style={{ marginRight: 10 }}
      >
        {props.selectedMeetup.isAttendeesLimitFree ? (
          <Text style={{ marginRight: 40 }}>{props.selectedMeetup.totalAttendees}/&infin;&nbsp;</Text>
        ) : (
          <Text style={{ marginRight: 40 }}>{props.selectedMeetup.totalAttendees}/limit</Text>
        )}
        &nbsp;Crew
      </Button>
      {/* <Button
        mode='outlined'
        icon={'comment-question'}
        onPress={() => props.navigation.navigate('Q&A', { meetupId: props.selectedMeetup._id })}
        style={{ marginRight: 10 }}
      >
        {props.selectedMeetup.totalComments}&nbsp;Q&A
      </Button> */}
      {renderJoinOrLeave()}
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
