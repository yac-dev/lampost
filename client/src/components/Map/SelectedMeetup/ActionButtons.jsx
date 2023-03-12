// main libraries
import React, { useContext, useState } from 'react';
import lampostAPI from '../../../apis/lampost';
import GlobalContext from '../../../GlobalContext';
import MapContext from '../MeetupContext';
import { View, Text, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {
  backgroundColorsTable,
  baseTextColor,
  iconColorsTable,
  buttonBackgroundColor,
  sectionBackgroundColor,
} from '../../../utils/colorsTable';
import ActionButton from '../../Utils/ActionButton';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

const ActionButtons = (props) => {
  const {
    auth,
    setAuth,
    setLoading,
    setSnackBar,
    myUpcomingMeetupAndChatsTable,
    setMyUpcomingMeetupAndChatsTable,
    myUpcomingMeetups,
    setMyUpcomingMeetups,
    isIpad,
  } = useContext(GlobalContext);
  const { selectedMeetup, setSelectedMeetup, navigation } = useContext(MapContext);

  const joinMeetup = async () => {
    setLoading(true);
    const result = await lampostAPI.post('/meetupanduserrelationships/join', {
      meetupId: selectedMeetup._id,
      userId: auth.data._id,
    });
    const { meetup } = result.data;
    // setAuth((previous) => {
    //   return {
    //     ...previous,
    //     data: {
    //       ...previous.data,
    //       upcomingMeetups: [...previous.data.upcomingMeetups, meetupObject],
    //     },
    //   };
    // });
    // // launcherが必要か。
    setMyUpcomingMeetups((previous) => {
      return {
        ...previous,
        [selectedMeetup._id]: {
          _id: selectedMeetup._id,
          startDateAndTime: selectedMeetup.startDateAndTime,
          title: selectedMeetup.title,
          launcher: meetup.launcher,
          state: meetup.state,
          unreadChatsTable: {
            general: 0,
            reply: 0,
            question: 0,
            help: 0,
          },
        },
      };
    });
    // auth.socket.emit('JOIN_A_LOUNGE', { meetupId: selectedMeetup._id });
    // setSelectedMeetup((previous) => {
    //   return {
    //     ...previous,
    //     totalAttendees,
    //   };
    // });
    setLoading(false);
    setSnackBar({ isVisible: true, message: 'Joined a meetup.', barType: 'success', duration: 5000 });
  };

  const leaveMeetup = async () => {
    setLoading(true);
    const result = await lampostAPI.post('/meetupanduserrelationships/leave', {
      meetupId: selectedMeetup._id,
      userId: auth.data._id,
    });
    const { meetupId } = result.data; // filteringするだけよ。
    // setAuth((previous) => {
    //   return {
    //     ...previous,
    //     data: {
    //       ...previous.data,
    //       upcomingMeetups: [...previous.data.upcomingMeetups].filter(
    //         (upcomingMeetupObject) => upcomingMeetupObject.meetup._id !== meetupId
    //       ),
    //     },
    //   };
    // });
    setMyUpcomingMeetups((previous) => {
      const updating = { ...previous };
      delete updating[selectedMeetup._id];
      return updating;
    });
    // socketのgroupから抜ける。
    // auth.socket.emit('LEAVE_A_LOUNGE', { meetupId: selectedMeetup._id });
    // setSelectedMeetup((previous) => {
    //   return {
    //     ...previous,
    //     totalAttendees,
    //   };
    // });
    setLoading(false);
    setSnackBar({ isVisible: true, message: 'Left a meetup.', barType: 'success', duration: 5000 });
  };

  // joinしたらmeetupのid使ってroomに入るようにするんだが、、、reloadしたらsocket切れるよな。切れたら、upcomingのmeetupid使って再度roomに入るようにする感じか。
  const renderApp = () => {
    // まず、authの確認。login状態なら、action buttonsをrenderする。
    if (auth.data) {
      // selectedMmeetupをlaunchした人が自分だった場合のmenu
      if (myUpcomingMeetups[selectedMeetup._id]?.launcher === auth.data._id) {
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* <ActionButton
              label='Start meetup now'
              icon={<Feather name='power' size={20} color={'white'} />}
              backgroundColor={iconColorsTable['blue1']}
              onActionButtonPress={() => console.log('start meetup now', selectedMeetup._id)}
            /> */}
            <ActionButton
              label='Go to lounge'
              icon={<Ionicons name='ios-chatbubbles' size={25} color={'white'} />}
              backgroundColor={iconColorsTable['blue1']}
              onActionButtonPress={() => navigation.navigate('Lounge', { meetupId: selectedMeetup._id })}
              // 'rgb(55, 55, 55)'
            />
          </View>
        );
      } else {
        // それ以外。
        if (myUpcomingMeetups[selectedMeetup._id]) {
          return (
            <View style={{ flexDirection: 'row' }}>
              <ActionButton
                label='Leave this meetup'
                icon={<MaterialCommunityIcons name='exit-run' size={25} color={'white'} />}
                backgroundColor={iconColorsTable['red1']}
                onActionButtonPress={() => leaveMeetup()}
              />
              <ActionButton
                label='Go to lounge'
                icon={<Ionicons name='ios-chatbubbles' size={25} color={'white'} />}
                backgroundColor={iconColorsTable['blue1']}
                onActionButtonPress={() => navigation.navigate('Lounge', { meetupId: selectedMeetup._id })}
              />
              <ActionButton
                label='Report this meetup'
                icon={<MaterialIcons name='report-problem' size={25} color={'white'} />}
                backgroundColor={iconColorsTable['blue1']}
                onActionButtonPress={() =>
                  navigation.navigate('Report meetup', { title: selectedMeetup.title, id: selectedMeetup._id })
                }
              />
            </View>
          );
        } else {
          return (
            <View style={{ flexDirection: 'row' }}>
              <ActionButton
                label='Join this meetup'
                icon={<MaterialCommunityIcons name='human-greeting-variant' size={25} color={'white'} />}
                backgroundColor={iconColorsTable['blue1']}
                onActionButtonPress={() => joinMeetup(selectedMeetup._id)}
              />
              <ActionButton
                label='Report this meetup'
                icon={<MaterialIcons name='report-problem' size={25} color={'white'} />}
                backgroundColor={iconColorsTable['blue1']}
                onActionButtonPress={() =>
                  navigation.navigate('Report meetup', { title: selectedMeetup.title, id: selectedMeetup._id })
                }
              />
            </View>
          );
        }
      }
    } else {
      // loginしていない場合はlogin or signupをさせるようにする。
      return <Text style={{ color: baseTextColor }}>It is required to login or signup to join the meetup.</Text>;
    }
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {renderApp()}
      </ScrollView>
    </View>
  );
};

export default ActionButtons;
