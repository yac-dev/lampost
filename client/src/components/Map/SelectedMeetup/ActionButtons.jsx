// main libraries
import React, { useContext, useState } from 'react';
import lampostAPI from '../../../apis/lampost';
import GlobalContext from '../../../GlobalContext';
import MapContext from '../MeetupContext';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { backgroundColorsTable, baseTextColor, iconColorsTable } from '../../../utils/colorsTable';
import ActionButton from '../../Utils/ActionButton';

// ac
import { joinMeetup } from '../../../redux/actionCreators/meetups';
import { leaveMeetup } from '../../../redux/actionCreators/meetups';

const ActionButtons = (props) => {
  const { auth, setAuth } = useContext(GlobalContext);
  const { selectedMeetup, setSelectedMeetup, navigation } = useContext(MapContext);
  const [joinOrLeaveButtonPressed, setJoinOrLeaveButtonPressed] = useState(false);

  const joinMeetup = async () => {
    setJoinOrLeaveButtonPressed(true);
    const result = await lampostAPI.patch(`/meetups/${selectedMeetup._id}/join`, { userId: auth.data._id });
    const { meetupObject, totalAttendees } = result.data;
    setAuth((previous) => {
      return {
        ...previous,
        data: {
          ...previous.data,
          upcomingMeetups: [...previous.data.upcomingMeetups, meetupObject],
        },
      };
    });
    setSelectedMeetup((previous) => {
      return {
        ...previous,
        totalAttendees,
      };
    });
    setJoinOrLeaveButtonPressed(false);
  };

  const leaveMeetup = async () => {
    const result = await lampostAPI.patch(`/meetups/${selectedMeetup._id}/leave`, { userId: auth.data._id });
    const { meetupId, totalAttendees } = result.data; // filteringするだけよ。
    setAuth((previous) => {
      return {
        ...previous,
        data: {
          ...previous.data,
          upcomingMeetups: [...previous.data.upcomingMeetups].filter(
            (upcomingMeetupObject) => upcomingMeetupObject.meetup._id !== meetupId
          ),
        },
      };
    });
    setSelectedMeetup((previous) => {
      return {
        ...previous,
        totalAttendees,
      };
    });
  };

  const renderApp = () => {
    // authがあればaction buttonsをrenderして、ない場合はlogin or signupを促すようにする。
    if (auth.data) {
      for (let i = 0; i < auth.data.upcomingMeetups.length; i++) {
        // everyか？someかな。
        if (auth.data.upcomingMeetups[i].meetup._id === selectedMeetup._id) {
          return (
            <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
              {selectedMeetup.launcher._id === auth.data._id ? (
                <ActionButton
                  label='Edit my meetup'
                  icon={<MaterialCommunityIcons name='file-document-edit-outline' size={20} color={'white'} />}
                  backgroundColor={iconColorsTable['blue1']}
                  onActionButtonPress={() => console.log('edit  my meetup')}
                />
              ) : (
                <ActionButton
                  label='Leave this meetup'
                  icon={<MaterialCommunityIcons name='exit-run' size={25} color={'white'} />}
                  backgroundColor={iconColorsTable['red1']}
                  onActionButtonPress={() => leaveMeetup()}
                />
              )}
              <ActionButton
                label='Go to lounge'
                icon={<MaterialCommunityIcons name='comment-text-multiple' size={25} color={'white'} />}
                backgroundColor={iconColorsTable['blue1']}
                onActionButtonPress={() => navigation.navigate('Lounge', { meetupId: selectedMeetup._id })}
              />
              <ActionButton
                label='Launch camera'
                icon={<MaterialCommunityIcons name='camera' size={25} color={'white'} />}
                backgroundColor={iconColorsTable['blue1']}
                onActionButtonPress={() => console.log('pressing')}
              />
              <ActionButton
                label='Invite people'
                icon={<MaterialCommunityIcons name='plus' size={25} color={'white'} />}
                backgroundColor={iconColorsTable['blue1']}
                onActionButtonPress={() => console.log('pressing')}
              />
            </View>
          );
        }
      }
      return (
        <View style={{}}>
          <ActionButton
            label='Join this meetup'
            icon={<MaterialCommunityIcons name='human-greeting-variant' size={25} color={'white'} />}
            backgroundColor={iconColorsTable['blue1']}
            onActionButtonPress={() => joinMeetup(selectedMeetup._id)}
          />
        </View>
      );
    } else {
      return (
        <ActionButton
          label='Please login or signup from "Profile" to join'
          icon={<Ionicons name='ios-enter' size={25} color={'white'} />}
          backgroundColor={iconColorsTable['blue1']}
          onActionButtonPress={() => console.log('pressing')}
        />
      );
    }
  };

  return (
    <ScrollView horizontal={true} style={{ marginBottom: 25 }}>
      {renderApp()}
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { joinMeetup, leaveMeetup })(ActionButtons);
