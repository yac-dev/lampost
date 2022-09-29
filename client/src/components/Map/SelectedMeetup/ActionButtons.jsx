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
    for (let i = 0; i < props.auth.data.upcomingJoinedMeetups.length; i++) {
      if (props.selectedMeetup._id === props.auth.data.upcomingJoinedMeetups[i]) {
        return (
          <Button
            mode='outlined'
            icon={'exit-to-app'}
            onPress={() => props.leaveMeetup(props.selectedMeetup._id)}
            style={{ marginRight: 10 }}
          >
            Leave
          </Button>
        );
      }
    }
    return (
      <Button
        mode='outlined'
        icon={'rocket'}
        onPress={() => props.joinMeetup(props.selectedMeetup._id)}
        style={{ marginRight: 10 }}
      >
        Join!
      </Button>
    );
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
      <Button
        mode='outlined'
        icon={'comment-question'}
        onPress={() => console.log('pressed qa')}
        style={{ marginRight: 10 }}
      >
        {props.selectedMeetup.totalQuestions}&nbsp;Q&A
      </Button>
      {renderJoinOrLeave()}
      {/* <Button mode='outlined' icon={'more'} onPress={() => console.log('Pressed')} style={{ marginRight: 10 }}>
        More
      </Button> */}
    </ScrollView>
  );
};

// 自分の、selectedなmeetupに対してどんな状態か、そのためにもselectedmeetupで、fieldが足りないと思う。meetupのtitleとfeeとだけでは足りない。あと、その場で,renderの状態を変えるようにしなきゃだよね。meetup作ったらすぐmapに反映させて、そしてcalendarに反映させたり、joinしたらすぐbuttonがcancel(leaveかな)に変わって、かつ参加者の人数も+1されてuiに反映させる。これらがないと、userは困るよね。
//、、、、そこを見直そう。あと、bottomsheetがだめだ。手動で閉じるとバグる。それを直そおう。

const mapStateToProps = (state) => {
  return { selectedMeetup: state.selectedItem.meetup, auth: state.auth };
};

export default connect(mapStateToProps, { joinMeetup, leaveMeetup })(ActionButtons);
